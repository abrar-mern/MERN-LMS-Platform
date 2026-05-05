const razorpay = require('razorpay');
exports.razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret : process.env.RAZORPAY_SECRET
});