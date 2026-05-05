const mongoose = require("mongoose");
const otpTemplate = require("../mail/templates/emailVerificationTemplate")
const mailSender = require("../utils/mailsender");
const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300, // 5 minutes
  },
});

// Verification email function before saving in the database
async function sendVerificationEmail(email, otp) {
  try {
    const mailResponse = await mailSender(
      email,
      "Send OTP for Verification",
       otpTemplate(otp),
    );
    console.log("Email Sent Successfully", sendVerificationEmail.mailResponse);
  } catch (err) {
    console.log('Error occured while sending email', err);
    // throw new Error("Mail sending failed");
    throw err;  
  }
}

// Define a post-save hook to send email after the document has been saved
otpSchema.pre("save", async function (next) {
	console.log("New document saved to database");

	// Only send an email when a new document is created
	if (this.isNew) {
		await sendVerificationEmail(this.email, this.otp);
	}
	next();
});


module.exports = mongoose.model("Otp", otpSchema);
