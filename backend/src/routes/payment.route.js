import { Router } from "express";
// import { paymentController } from "../controllers/paymentController.js";
import { payment, status } from "../controllers/payment.js";

const router = Router()
// router.route('/create-order').post(payment)
router.route('/').post(payment)
router.route('/status').get(status).post(status)

export default router