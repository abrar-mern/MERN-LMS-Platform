const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema(
  {
    courseName: {
      type: String,
      required: true,
      unique: true,
    },
    courseDescription: {
      type: String,
      required: true,
    },
    Instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    whatyouwilllearn: {
      type: String,
    },
    courseContent: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section",
      },
    ],
    ratingsandReviews: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RatingAndReview",
    },
    price: {
      type: Number,
    },
    thumbnail: {
      type: String,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    studentEnrolled: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }],
    instructions : {
      type : [String],
    },
    status : {
      type : String,
      enum : ["Draft", "Published", "Unpublished"],
      default : "Draft"
    }
  },
);

module.exports = mongoose.model("Course", courseSchema);
