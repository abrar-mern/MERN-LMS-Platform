const { razorpayInstance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailsender");
const {
  courseEnrollmentEmail,
} = require("../mail/templates/courseEnrollmentEmail");
const mongoose = require("mongoose");
const crypto = require("crypto");
const { default: toast } = require("react-hot-toast");

// ================== CAPTURE PAYMENT ==================
exports.capturePayment = async (req, res) => {
  try {
    const { courses } = req.body;
    const userId = req.user.id;

    if (!courses || courses.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide course IDs",
      });
    }

    let totalAmount = 0;

    for (const courseId of courses) {
      const course = await Course.findById(courseId);

      if (!course) {
        return res.status(404).json({
          success: false,
          message: "Course not found",
        });
      }

      // check if already enrolled
      if (
        course.studentEnrolled.some((id) => id.toString() === userId.toString())
      ) {
        return res.status(400).json({
          success: false,
          message: `Already enrolled in ${course.courseName}`,
        });
      }

      totalAmount += course.price * 100; // convert to paise
    }

    const options = {
      amount: totalAmount,
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
      notes: {
        courses: JSON.stringify(courses),
        userId,
      },
    };

    const paymentResponse = await razorpayInstance.orders.create(options);

    return res.status(200).json({
      success: true,
      orderId: paymentResponse.id,
      currency: paymentResponse.currency,
      amount: paymentResponse.amount,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Could not initiate payment",
    });
  }
};

// ================== VERIFY PAYMENT ==================
exports.verifySignature = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      courses,
      userId,
    } = req.body;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !courses ||
      !userId
    ) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed: missing fields",
      });
    }

    // generate signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Signature verification failed",
      });
    }

    // enroll user

    return res.status(200).json({
      success: true,
      message: "Payment verified & user enrolled",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Payment verification error",
    });
  }
};

// ================== ENROLL STUDENTS ==================
exports.enrollStudents = async (courses, userId) => {
  for (const courseId of courses) {
    try {
      // add user to course
      const course = await Course.findByIdAndUpdate(
        courseId,
        {
          $addToSet: { studentEnrolled: userId }, // prevents duplicates
        },
        { new: true },
      );

      if (!course) {
        throw new Error("Course not found");
      }

      // add course to user
      const user = await User.findByIdAndUpdate(
        userId,
        {
          $addToSet: { courses: courseId },
        },
        { new: true },
      );

      // send email
      await mailSender(
        user.email,
        "Congratulations from CodeGyaani",
        courseEnrollmentEmail(
          course.courseName,
          `${user.firstName} ${user.lastName}`,
        ),
      );

      console.log(`Enrolled in ${course.courseName}`);
    } catch (err) {
      console.error("Enrollment Error:", err.message);
      throw err;
    }
  }
};

//=================== Send Payment Success Email ========
exports.sendPaymentSuccessEmail = async (email, courseNames) => {
  const { orderId, paymentId, amount } = req.body;
  const userId = req.user.id;
  if (!email || !paymentId || !orderId || !amount) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields for sending email",
    });
  }
  try {
    // Find Student
    const enrolledStudent = await User.findById(userId);
    await mailSender(
      enrolledStudent.email,
      `Payment Receieved for ${courseNames.join(", ")}`,
     paymentSuccessEmail(enrolledStudent.firstName, amount / 100, orderId, paymentId)
    )
  } catch (err) {
    console.log("Error in sending payment success email", err);
    toast.error("Error in sending payment success email", {
      toastId: "paymentSuccessEmail",
    });
  }
};
