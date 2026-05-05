// Importing necessary modules and models
// send OTP
const bcrypt = require("bcrypt");
const user = require("../models/User");
const Otp = require("../models/Otp");
const otpGenerator = require("otp-generator");
const sendEmail = require("../utils/mailsender");
const profile = require("../models/Profile");
const jwt = require("jsonwebtoken");
const { passwordUpdated } = require("../mail/templates/passwordUpdate");
require("dotenv").config();

// ===================================================================
// Send OTP for Email Verification

exports.SendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    // Check if the user already exists
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(401).json({
        success: false,
        message: "User already registered with this email",
      });
    }
    // Generate a 6-digit OTP
    const generatedOtp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    console.log(generatedOtp);

    // Check unique OTP is generated
    const result = await Otp.findOne({ otp: generatedOtp });
    console.log("Result is Generate OTP Function");
    console.log("OTP", generatedOtp);
    console.log("Result", result);
    while (result) {
      generatedOtp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      // result = await Otp.findOne({ otp: generatedOtp });
    }

    const otpPayload = { email, otp: generatedOtp };
    // Save the OTP to the database
    const otpBody = await Otp.create(otpPayload);
    console.log("OTP Body", otpBody);
    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      otp: generatedOtp,
    });
    ss;
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Error in sending OTP",
    });
  }
};

// ===================================================================

// Signup

exports.signUp = async (req, res) => {
  try {
    // Destructure fields from Request Body
    const {
      firstName,
      lastName,
      email,
      contactNumber,
      password,
      confirmPassword,
      accountType,
      Image,
      otp,
    } = req.body;
    // Validation Fields is not empty
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(403).json({
        success: false,
        message: "All Fields are required, Please fill all the fields...",
      });
    }
    // Check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address",
      });
    }

    // Check if password and confirm password matches
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Password and Confirm Password do not match, Please try again...",
      });
    }

    // Check if user already exists
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Check if email is same as enterted in OTP Request

    const recentOTPEmail = await Otp.findOne({ email }).sort({ createdAt: -1 });
    if (!recentOTPEmail) {
      return res.status(400).json({
        success: false,
        message:
          "Email does not match with the OTP provided, please try again..",
      });
    }
    // Find most recent OTP for the email

    const recentOtp = await Otp.findOne({ email }).sort({ createdAt: -1 });
    console.log(recentOtp);
    // VALIDATE otp
    if (recentOtp === 0) {
      return res.status(400).json({
        success: false,
        message: "OTP not found, Please try again...",
      });
    }
    // Match the OTP
    else if (recentOtp.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Inavalid OTP, Please try again..",
      });
    }
    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Approval From Admin Required for instructor account

    let approved = "";
    approved === "Instructor" ? (approved = false) : (approved = true);

    // Create Additional Profile Details
    const additionalDetails = await profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });

    const createuser = await user.create({
      firstName,
      lastName,
      email,
      contactNumber,
      password: hashedPassword,
      confirmPassword: hashedPassword,
      approved: approved,
      accountType,
      additionalDetails: additionalDetails._id,
      Image: `https://api.dicebear.com/6.x/initials/svg?seed=${firstName} ${lastName}`,
    });
    console.log(createuser);
    // Return Response
    return res.status(200).json({
      success: true,
      message: "User registered successfully",
      user: createuser,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "User registration failed, Please try again...",
    });
  }
};

// ==================================================================

// Login

exports.logIn = async (req, res) => {
  try {
    //Fetch Data from Request Body
    const { email, password } = req.body;

    // Validate Data
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }
    // Check if user exists
    const existinguser = await user
      .findOne({ email })
      .populate("additionalDetails");

    // If User not found with the provided email
    if (!existinguser) {
      return res.status(401).json({
        success: false,
        message: "User is not Registered with us. Please Sign Up to continue..",
      });
    }
    // Match Password
    if (await bcrypt.compare(password, existinguser.password)) {
      // payload
      const payload = {
        email: existinguser.email,
        id: existinguser._id,
        accountType: existinguser.accountType,
      };
      // generate JWT Token
      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: "24h",
      });
      // Save token to user document in database
      existinguser.token = token;
      existinguser.password = undefined;

      // Store in Cookie for token and return success response
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.cookie("token", token, options).json({
        success: true,
        user: existinguser,
        token,
        message: "User logged in successfully",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid Password, Please try again...",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Error in Login, Please try again...",
    });
  }
};

// ==================================================================

// Change Password

exports.changePassword = async (req, res) => {
  try {
    // Get user data from req.user
    const userDetails = await user.findById(req.user.id);

    // Get old password, new password, and confirm new password from req.body
    const { oldPassword, newPassword, confirmNewPassword } = req.body;

    // Validate old password
    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      userDetails.password
    );
    if (!isPasswordMatch) {
      // If old password does not match, return a 401 (Unauthorized) error
      return res
        .status(401)
        .json({ success: false, message: "The password is incorrect" });
    }

    // Match new password and confirm new password
    if (newPassword !== confirmNewPassword) {
      // If new password and confirm new password do not match, return a 400 (Bad Request) error
      return res.status(400).json({
        success: false,
        message: "The password and confirm password does not match",
      });
    }

    // Update password
    const encryptedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUserDetails = await user.findByIdAndUpdate(
      req.user.id,
      { password: encryptedPassword },
      { new: true }
    );

    // Send notification email
    try {
      const emailResponse = await sendEmail(
        updatedUserDetails.email,
        passwordUpdated(
          updatedUserDetails.email,
          `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
        )
      );
      console.log("Email sent successfully:", emailResponse.response);
    } catch (error) {
      // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
      console.error("Error occurred while sending email:", error);
      return res.status(500).json({
        success: false,
        message: "Error occurred while sending email",
        error: error.message,
      });
    }

    // Return success response
    return res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
    console.error("Error occurred while updating password:", error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating password",
      error: error.message,
    });
  }
};

// ==================================================================

// Forgot Password

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const existingUser = await user.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found with the provided email",
      });
    }

    const resetToken = jwt.sign(
      { id: existingUser._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    try {
      await sendEmail(
        existingUser.email,
        passwordReset(
          existingUser.email,
          `Password reset instructions for ${existingUser.firstName} ${existingUser.lastName}`,
          resetToken
        )
      );
    } catch (emailError) {
      console.error("Email error:", emailError);
      return res.status(500).json({
        success: false,
        message: "Failed to send reset email",
      });
    }

    // ✅ SUCCESS RESPONSE (this was missing)
    return res.status(200).json({
      success: true,
      message: "Password reset email sent successfully",
    });

  } catch (error) {
    console.error("Forgot password error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
