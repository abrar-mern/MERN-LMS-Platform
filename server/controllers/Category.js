// Category Controller
const Category = require("../models/Category");
const Course = require("../models/Course");

// Create a new category
exports.createCategory = async (req, res) => {
  try {
    // Fetch category data from request body
    const { name, description } = req.body;

    // Check Validation
    if (!name || !description) {
      return res
        .status(400)
        .json({ message: "Name and Description are required" });
    }

    // check if category already exists
    const existingCategory = await Category.findOne({ name : name});
    if(existingCategory){
      return res.status(400).json({
        message : "Category with this name already exists, please choose a different name"
      })
    }
    

    // Category Entry in Database
    const categoryDetails = await Category.create({
      name: name,
      description: description,
    });

    console.log(categoryDetails);

    
    
    // Response
    return res.status(200).json({
      message: "Category Created Successfully",
      Category: categoryDetails,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// ===============================================
// Get all categories

exports.showAllCategory = async (req, res) => {
  try {
    // Fetch all categories from database
    const allcategory = await Category.find(
      {},
      { name: true, description: true }
    );

    // Response
    res
      .status(200)
      .json({
        success: true,
        message: "Categories Retrieved Successfully",
        data: allcategory,
      });
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error });
  }
};

// ==============================================
// Category Page Details

exports.getCategoryPageDetails = async (req, res) => {
  try {
    // Get Category ID from request Body
    const { categoryId } = req.body;

    // Fetch Courses Based on Category Id
    const selectedCategory = await Category.findById(categoryId)
      .populate({
        path: "course",
        populate: {
          path: "Instructor",
          select: "firstName lastName",
        },
      })
      .exec();

    // Validation
    if (!selectedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category Not Found",
      });
    }

    // Get Courses from different categories
    const differentCategories = await Category.find({
      _id: {
        $ne: categoryId,
      },
    })
      .populate({
        path: "course",
        populate: {
          path: "Instructor",
          select: "firstName lastName",
        },
      })
      .exec();

    // Top Selling Courses
    const topSellingCourses = await Course.find({})
  .populate("Instructor", "firstName lastName")
  .sort({ studentEnrolled: -1 })
  .limit(10)
  .exec();

    // Response
    return res.status(200).json({
      success: true,
      message: "Category Page Details Fetched Successfully",
      data: {
        selectedCategory: selectedCategory,
        differentCategories: differentCategories,
        topSellingCourses: topSellingCourses,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
};
