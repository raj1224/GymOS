import razorpay from "../utils/razorpay.js";
import {MembershipPlan} from "../models/membershipplan.model.js";
import {Membership} from "../models/membership.model.js"
import {Payment} from "../models/payment.model.js";
import {Member} from "../models/member.model.js";
import crypto from 'crypto'

import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";


const createRazorpayOrder = asyncHandler(async (req, res) => {
    const { planId } = req.body;

    if (!planId) {
        throw new ApiError(400, "Plan ID is required");
    }

    // Find member
    const member = await Member.findOne({
        user: req.user._id
    });

    if (!member) {
        throw new ApiError(404, "Member profile not found");
    }

    // Find active plan
    const plan = await MembershipPlan.findOne({
        _id: planId,
        isActive: true
    });

    if (!plan) {
        throw new ApiError(404, "Membership plan not found");
    }

    // Check active membership
    const now = new Date();

    const existingMembership = await Membership.findOne({
        member: member._id,
        startDate: { $lte: now },
        endDate: { $gt: now }
    })
        .populate("plan")
        .sort({ endDate: -1 });

    const paymentType = existingMembership
        ? "renewal"
        : "new";

    // Create Razorpay order
    const options = {
        amount: plan.price * 100,
        currency: "INR",
        receipt: `receipt_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);

    // Create pending payment
    const payment = await Payment.create({
        member: member._id,
        plan: plan._id,
        amount: plan.price,
        status: "pending",
        razorpayOrderId: order.id
    });

    return res.status(201).json(
        new ApiResponse(
            201,
            {
                orderId: order.id,
                amount: order.amount,
                currency: order.currency,
                paymentId: payment._id,
                planId: plan._id,

                paymentType,

                existingMembership: existingMembership
                    ? {
                          membershipId: existingMembership._id,
                          planId: existingMembership.plan._id,
                          planName: existingMembership.plan.name,
                          startDate: existingMembership.startDate,
                          endDate: existingMembership.endDate
                      }
                    : null
            },
            "Razorpay order created successfully"
        )
    );
});

const verifyRazorpayPayment = asyncHandler(async (req, res) => {
    const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
    } = req.body;

    if (
        !razorpay_order_id ||
        !razorpay_payment_id ||
        !razorpay_signature
    ) {
        throw new ApiError(
            400,
            "Payment verification details are required"
        );
    }

    // Find pending payment
    const payment = await Payment.findOne({
        razorpayOrderId: razorpay_order_id
    });

    if (!payment) {
        throw new ApiError(
            404,
            "Payment record not found"
        );
    }

    // Prevent duplicate verification
    if (payment.status === "success") {
        throw new ApiError(
            400,
            "Payment already verified"
        );
    }

    // Generate signature
    const generatedSignature = crypto
        .createHmac(
            "sha256",
            process.env.RAZORPAY_KEY_SECRET
        )
        .update(
            `${razorpay_order_id}|${razorpay_payment_id}`
        )
        .digest("hex");

    // Verify signature
    if (generatedSignature !== razorpay_signature) {
        payment.status = "failed";
        await payment.save();

        throw new ApiError(
            400,
            "Invalid payment signature"
        );
    }

    // Find member
    const member = await Member.findById(
        payment.member
    );

    if (!member) {
        throw new ApiError(
            404,
            "Member profile not found"
        );
    }

    // Find plan
    const plan = await MembershipPlan.findOne({
        _id: payment.plan,
        isActive: true
    });

    if (!plan) {
        throw new ApiError(
            404,
            "Membership plan not found"
        );
    }

    const now = new Date();

    // Find currently active membership
    const existingMembership = await Membership.findOne({
        member: member._id,
        startDate: { $lte: now },
        endDate: { $gt: now }
    }).sort({
        endDate: -1
    });

    // Decide membership start date
    let startDate;

    if (existingMembership) {
        // Renewal
        startDate = existingMembership.endDate;
    } else {
        // New membership / expired membership
        startDate = now;
    }

    // Calculate end date
    const endDate = new Date(startDate);

    endDate.setMonth(
        endDate.getMonth() + plan.duration
    );

    // Create membership
    const membership = await Membership.create({
        member: member._id,
        plan: plan._id,
        startDate,
        endDate
    });

    // Update payment
    payment.status = "success";
    payment.razorpayPaymentId =
        razorpay_payment_id;
    payment.membership = membership._id;

    await payment.save();

    // Populate response
    await payment.populate([
        {
            path: "member",
            populate: {
                path: "user",
                select: "-password -refreshToken"
            }
        },
        {
            path: "plan"
        },
        {
            path: "membership",
            populate: {
                path: "plan"
            }
        }
    ]);

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                payment,
                membership,
                paymentType: existingMembership
                    ? "renewal"
                    : "new"
            },
            "Payment verified and membership created successfully"
        )
    );
});

export {
    createRazorpayOrder,
    verifyRazorpayPayment,
}