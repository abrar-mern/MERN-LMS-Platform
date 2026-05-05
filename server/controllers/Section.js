// Section Controller
const Section = require("../models/Section");
const Course = require("../models/Course");
const SubSection = require("../models/SubSection");

// Create a New Section

exports.createSection = async (req, res) => {
  try {
    const { sectionName, courseId } = req.body;

    // Validate required fields

    if (!sectionName || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Section name and Course ID are required",
      });
    }

    // Create new section
    const newSection = await Section.create({
      sectionName,
    });

    // Push section into course
    await Course.findByIdAndUpdate(
      courseId,
      { $push: { courseContent: newSection._id } },
      { new: true }
    );

    // Fetch fully populated course
    const updatedCourse = await Course.findById(courseId)
      .populate({
        path: "courseContent",
        populate: { path: "subSections" },
      })
      .exec();

    return res.status(200).json({
      success: true,
      message: "Section created successfully",
      updatedCourse,
      course: updatedCourse,
      courseContent: newSection,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to create section",
      error: error.message,
    });
  }
};

// Update a Section

exports.updateSection = async (req, res) => {
  try {
  // Data Fetch from request body
  const { sectionName, sectionId, courseId } = req.body;

    // Check Validation
    if (!sectionName || !sectionId || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Section Name, Section ID and Course ID are required",
      });
    }

    // Update Section in DB
    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      { sectionName },
      { new: true }
    );

    console.log(updatedSection);

    const updatedCourse = await Course.findById(courseId).populate({
      path: "courseContent",
      populate: {
        path: "subSections",
      },
    });

    // Response
    return res.status(200).json({
      success: true,
      message: "Section updated successfully",
      section: updatedSection,
      updatedCourse,
      course: updatedCourse,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to update section, Please try again",
      error: error.message,
    });
  }
};



// ===================================================================

// Delete a Section

exports.deleteSection = async (req, res) => {
  try {
    const { sectionId, courseId } = req.body;

    if (!sectionId || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Section ID and Course ID are required",
      });
    }

    const section = await Section.findById(sectionId);
    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    // delete subsections
    if (section.subSections?.length) {
      await SubSection.deleteMany({ _id: { $in: section.subSections } });
    }

    // remove section reference from course
    await Course.findByIdAndUpdate(courseId, {
      $pull: { courseContent: sectionId },
    });

    // delete section
    await Section.findByIdAndDelete(sectionId);

    // fetch updated course
    const updatedCourse = await Course.findById(courseId).populate({
      path: "courseContent",
      populate: { path: "subSections" },
    });

    return res.status(200).json({
      success: true,
      message: "Section deleted successfully",
      course: updatedCourse,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to delete section, Please try again",
      error: error.message,
    });
  }
};