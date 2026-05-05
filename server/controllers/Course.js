const Course = require("../models/Course");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUpload");
const Category = require("../models/Category");
const Razorpay = require("razorpay");
const { RatingAndReview } = require("../models/RatingsandReview");

// ==================================================================

// Create Course

exports.createCourse = async (req, res) => {
  try {
    // Get User Id from the object body
    const userId = req.user.id;

    // Fetch Data from request body
    const {
      courseName,
      courseDescription,
      whatyouwilllearn,
      price,
      category,
      tags,
      status,
    } = req.body;

    // Fetch Thumbnail Image from req files
      const thumbnail = req.files?.thumbnailImage || req.files?.thumbnail;

    // Fields Validation
    if (
      !courseName ||
      !courseDescription ||
      !whatyouwilllearn ||
      !price ||
      !category ||
      !thumbnail
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Set default status if not provided
    let courseStatus = status;
    if (!courseStatus || courseStatus === undefined) {
      courseStatus = "Draft";
    }

    // Get Instructor id from req.user
    // Todo check if the user id and instructor id are same
      const instructorDetails = await User.findById(userId);

    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor Details not found",
      });
    }

    // Category Validation
    const categoryDetails = await Category.findById(category);
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Upload thumbnail to cloudinary
    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );
    console.log(thumbnailImage);

    // Create Course in DB
      const newCourse = await Course.create({
        courseName,
        courseDescription,
        whatyouwilllearn: whatyouwilllearn,
        price,
        tags: tags,
        thumbnail: thumbnailImage.secure_url,
        Instructor: instructorDetails._id,
        status: courseStatus,
        category: {
          _id: categoryDetails._id,
          categoryName: categoryDetails.name,
          categoryDescription: categoryDetails.description,
        },
    });

    // Add New Course to User Schema
    await User.findByIdAndUpdate(
      { _id: instructorDetails._id },
      {
        $push: { courses: newCourse._id },
      },
      { new: true }
    );

    // Add Course Entry to Category Schema
    await Category.findByIdAndUpdate(
      { _id: categoryDetails._id },
      {
        $push: { course: newCourse._id },
      },
      { new: true }
    );

    // Response
    return res.status(200).json({
      success: true,
      message: "Course created successfully",
      course: newCourse,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===================================================================

// Get All Courses

exports.getAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find(
      {},
      {
        courseName: true,
        courseDescription: true,
        price: true,
        thumbnail: true,
        Instructor: true,
        RatingAndReview: true,
        studentEnrolled: true,
      }
    )
      .populate("Instructor")
      .exec();
    return res.status(200).json({
      success: true,
      message: "All Courses fetched successfully",
      courses: allCourses,
      i
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===================================================================

// Get ALL Course Details

exports.getCourseDetails = async (req, res) => {
  try {
    // Get Course Id FROM REQ.BODY
    const { courseId } = req.body;

    // Fetch Course Details from DB
    const CourseDetails = await Course.findById(courseId)
      .populate({
        path: "Instructor",
        select: "-password -confirmPassword",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate({
        path: "courseContent",
        populate: {
          path: "subSections",
        },
      })
      .populate("ratingsandReviews")
      .populate("category")
      .exec();

    // Validation -> IF Course Not Found
    if (!CourseDetails) {
      return res.status(404).json({
        success: false,
        message: "Course not Found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Course Details Fetched Successfully",
      data: CourseDetails,
      info: "The 'course' array in category contains IDs of all courses belonging to that category"
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ===================================================================

// Delete a Course

exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.params; 

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course Not Found",
      });
    }

    // Delete sections & subsections
    if (Array.isArray(course.courseContent)) {
      for (const sectionId of course.courseContent) {
        const section = await Section.findById(sectionId);
        if (section && Array.isArray(section.subSections)) {
          for (const subId of section.subSections) {
            await SubSection.findByIdAndDelete(subId);
          }
        }
        await Section.findByIdAndDelete(sectionId);
      }
    }

    // Remove course from category
    await Category.findByIdAndUpdate(
      course.category,
      { $pull: { course: courseId } }
    );

    // Delete course
    await Course.findByIdAndDelete(courseId);

    return res.status(200).json({
      success: true,
      message: "Course Deleted Successfully",
      data: courseId
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ===================================================================
// Edit Course

exports.editCourse = async (req, res) => {
  try {
    const {
      courseId,
      courseName,
      courseDescription,
      whatyouwilllearn,
      price,
      category,
      tags,
      status,
    } = req.body;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Course ID is required",
      });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    if (courseName !== undefined) course.courseName = courseName;
    if (courseDescription !== undefined) course.courseDescription = courseDescription;
    if (whatyouwilllearn !== undefined) course.whatyouwilllearn = whatyouwilllearn;
    if (price !== undefined) course.price = price;
    if (tags !== undefined) course.tags = tags;
    if (status !== undefined) course.status = status;

    if (category !== undefined) {
      const categoryDetails = await Category.findById(category);
      if (!categoryDetails) {
        return res.status(404).json({
          success: false,
          message: "Category not found",
        });
      }
      course.category = {
        _id: categoryDetails._id,
        categoryName: categoryDetails.name,
        categoryDescription: categoryDetails.description,
      };
    }

    const thumbnailFile = req.files?.thumbnailImage || req.files?.thumbnail;
    if (thumbnailFile) {
      const thumbnailImage = await uploadImageToCloudinary(
        thumbnailFile,
        process.env.FOLDER_NAME
      );
      course.thumbnail = thumbnailImage.secure_url;
    }

    await course.save();

    return res.status(200).json({
      success: true,
      message: "Course updated successfully",
      course,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get a list of courses created by an instructor

exports.getInstructorCourses = async (req, res) => {
  try {
    

    if (!req.user?.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized Access",
      });
    }

    const courses = await Course.find({ Instructor: req.user.id })
      .select("courseName price thumbnail status createdAt courseDescription")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      courses,
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};