const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUpload");
// DOTENV Config
require("dotenv").config();

// Create a new SubSection
exports.createSubSection = async (req, res) => {
  try {
    // Fetch Data from Request Body
    const { sectionId, title, description } = req.body;

    // Extract File/Video
    console.log("Request Files:", req.files);
    const video = req.files?.video;

    // Validation
    if (!sectionId || !title || !description) {
      return res.status(400).json({
        success: false,
        message: "Section, title and description are required",
      });
    }

    if (!video) {
      return res.status(400).json({
        success: false,
        message: "Lecture video is required",
      });
    }

    // Upload Video to Cloudinary
    const uploadDetails = await uploadImageToCloudinary(
      video,
      process.env.FOLDER_NAME
    );
    console.log("Video uploaded to Cloudinary:", uploadDetails);

    // Create Subsection in DB
    const subSectionDetails = await SubSection.create({
      title: title,
      description: description,
      timeDuration: `${uploadDetails.duration}`,
      videoUrl: uploadDetails.secure_url,
    });

    // Push SubSection to Section

    const updatedSection = await Section.findByIdAndUpdate(
      { _id: sectionId },
      { $push: { subSections: subSectionDetails._id } },
      { new: true }
    ).populate("subSections");
    console.log(updatedSection);

    // Return Response
    res.status(200).json({
      success: true,
      message: "SubSection created successfully",
      data: subSectionDetails,
      updatedSection,
    });
  } catch (error) {
    console.error("Failed to create SubSection:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create SubSection, Please try again",
      error: error.message,
    });
  }
};

// ===================================================================
// Update SubSection

exports.updateSubSection = async (req, res) => {
  try {
    const { sectionId, subSectionId, title, description } = req.body;
    const subSection = await SubSection.findById(subSectionId);

    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: "SubSection not found",
      });
    }

    if (title !== undefined) {
      subSection.title = title;
    }

    if (description !== undefined) {
      subSection.description = description;
    }
    if (req.files && req.files.video !== undefined) {
      const video = req.files.video;
      const uploadDetails = await uploadImageToCloudinary(
        video,
        process.env.FOLDER_NAME
      );
      subSection.videoUrl = uploadDetails.secure_url;
      subSection.timeDuration = `${uploadDetails.duration}`;
    }

    await subSection.save();

    const updatedSection = await Section.findById(sectionId).populate(
      "subSections"
    );

    return res.json({
      success: true,
      message: "SubSection updated successfully",
      data: subSection,
      updatedSection,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the section",
    });
  }
};

// ===================================================================
// Delete SubSection
exports.deleteSubSection = async (req, res) => {
  try {
    // Fetch Data from request body
    const { sectionId, subSectionId } = req.body;

    // Check Validation
    if (!sectionId || !subSectionId) {
      return res.status(400).json({
        success: false,
        message: "Section and SubSection IDs are required",
      });
    }

    // Delete SubSection from DB
    const deletedSubSection = await SubSection.findByIdAndDelete(subSectionId);

    if (!deletedSubSection) {
      return res.status(404).json({
        success: false,
        message: "SubSection not found",
      });
    }

    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      { $pull: { subSections: subSectionId } },
      { new: true }
    ).populate("subSections");

    // Response
    return res.status(200).json({
      success: true,
      message: "SubSection deleted successfully",
      data: deletedSubSection,
      updatedSection,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
