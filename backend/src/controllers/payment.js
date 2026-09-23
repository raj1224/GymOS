import axios from "axios";
import crypto from "crypto";

let merchant_Id = "PGTESTPAYUAT86";
let salt_key = "96434309-7796-489d-8924-ab56988a6076";

const payment = async (req, res) => {
    try {
        let merchantTransactionId = req.body.transactonId;
        const data = {
            merchantId: merchant_Id,
            merchantTransactionId: merchantTransactionId,
            name: req.body.name,
            amount: req.body.amount * 100,
            // Point redirect URL directly to backend route
            redirectUrl: `http://localhost:3000/payment/status?id=${merchantTransactionId}`,
            redirectMode: "REDIRECT", // Changed from "POST" to "REDIRECT"
            mobileNumber: req.body.number,
            paymentInstrument: {
                type: "PAY_PAGE",
            }
        };

        const payload = JSON.stringify(data);
        const payloadMain = Buffer.from(payload).toString('base64');
        const keyIndex = 1;
        
        const string = payloadMain + "/pg/v1/pay" + salt_key;
        const sha256 = crypto.createHash('sha256').update(string).digest('hex');
        const checksum = sha256 + "###" + keyIndex;

        const prod_url = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";

        const response = await axios.post(
            prod_url,
            { request: payloadMain },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-VERIFY': checksum,
                    'accept': 'application/json'
                }
            }
        );

        return res.status(200).json(response.data);

    } catch (error) {
        console.error("Payment initiation error:", error?.response?.data || error.message);
        return res.status(500).json({
            message: "Failed to initiate payment",
            error: error?.response?.data || error.message
        });
    }
};

const status = async (req, res) => {
    try {
        // Accept transaction ID from query params or body
        const merchantTransactionId = req.query.id || req.body.transactionId || req.body.merchantTransactionId;
        const merchantId = merchant_Id;
        const keyIndex = 1;

        const string = `/pg/v1/status/${merchantId}/${merchantTransactionId}` + salt_key;
        const sha256 = crypto.createHash('sha256').update(string).digest('hex');
        const checksum = sha256 + "###" + keyIndex;

        const options = {
            method: 'GET',
            url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${merchantTransactionId}`,
            headers: {
                'X-VERIFY': checksum,
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'X-MERCHANT-ID': `${merchantId}`
            }
        };

        const response = await axios.request(options);

        if (response.data.success === true && response.data.code === "PAYMENT_SUCCESS") {
            return res.redirect(`http://localhost:5173/success`);
        } else {
            return res.redirect(`http://localhost:5173/failure`);
        }

    } catch (error) {
        console.error("Payment status error:", error?.response?.data || error.message);
        return res.redirect(`http://localhost:5173/failure`);
    }
};

export { payment, status };