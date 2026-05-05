const RatingsandReview = require("../models/RatingsandReview");
const Course = require("../models/Course");
const User = require("../models/User");
const { default: mongoose } = require("mongoose");

// Create a new Rating sand Review

exports.createRatingandReview = async (req, res) => {
  try {
    // Get User ID
    const userId = req.user.Id;

    // Fetch Data from the Request Body
    const { ratings, reviews, courseId } = req.body;

    // Check if user has enroll the course or not
    const user = await User.findById(userId);
    if (!user.enrolledCourses.includes(courseId)) {
      return res.status(403).json({
        success: false,
        message: "You are not enrolled in this course",
      });
    }

    // Check if user has already reviewed the course
    const existingReview = await RatingsandReview.findOne({
      user: userId,
      course: courseId,
    });
    if (existingReview) {
      return res.status(403).json({
        success: false,
        message: "You have already reviewed the course",
      });
    }

    // Create a New Rating and Review
    const createRatingandReview = await RatingsandReview.create({
      user: userId,
      course: courseId,
      ratings,
      reviews,
    });

    // Update the Course with the New Rating and Review
    const UpdatedCourseDetails = await Course.findByIdAndUpdate(
      { _id: courseId },
      {
        $push: {
          ratingsandReviews: createRatingandReview._id,
        },
      },
      { new: true }
    );
    console.log("Updated Course Details:", UpdatedCourseDetails);

    return res.status(200).json({
      success: true,
      message: "Rtaing and Review Created Successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ======================================================================

// Get Avg Rating

exports.AvgRatingAndReview = async (req, res) => {
  try {
    // Fetch CourseID from Request Body
    const  courseId  = req.body.courseId;

    // Calculate Avg Rating Using Agrregator Function
    const result = await RatingsandReview.aggregate([
      {
        $match: {
          course: mongoose.Types.ObjectId(courseId),
        },
      },
      {
        $group: {
          _id: null,
          avgRating: {
            $avg: "$ratings",
          },
        },
      },
    ]);

    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        avgRating: result[0].avgRating,
      });
    }

    // If No  Ratings Found

    return res.status(200).json({
      success: true,
      message: "No Ratings Found for this course",
      avgRating: 0,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ======================================================================
// Get All Ratings and Reviews for a Course

exports.getAllRatingsAndReviews = async (req, res) => {
  try {
    // Fetch All Ratings and Reviews from DB
    const allRatingsAndReviews = await RatingsandReview.find({})
      .sort({
        ratings: "desc",
      })
      .populate({
        path: "user",
        select: "firstName lastName email image",
      })
      .populate({
        path: "course",
        select: "coursename",
      })
      .exec();

    return res.status(200).json({
      success: true,
      message: "All Ratings and Reviews fetched successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
