import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { fetchCourseCategories, addCourseDetails, editCourseDetails } from "../../../../../services/operations/courseDetailsAPI";
import { MdCurrencyRupee } from "react-icons/md";
import ChipInput from "./ChipInput";
import MediaUpload from "./MediaUpload";
import RequirementField from "./RequirementField";
import { setCourse, setStep } from "../../../../../redux/slice/courseSlice";
import { toast } from "react-hot-toast";

const CourseInformationForm = () => {
  const {token} = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const { course, editCourse } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const [courseCategory, setCourseCategory] = useState([]);

  useEffect(() => {
    const getCategory = async () => {
      try {
        setLoading(true);
        const categories = await fetchCourseCategories();
        if (categories.length > 0) {
          setCourseCategory(categories);
        } else {
          setCourseCategory([]);
        }
        // If in edit mode then set the values of the form to the course details
        if (editCourse && course) {
          setValue("courseTitle", course.courseName);
          setValue("courseDescription", course.courseDescription);
          setValue("courseCategory", course.category?._id ?? course.category);
          setValue("coursePrice", course.price);
          setValue("courseTags", course.tags?.join(" ,"));
          setValue("whatYouWillLearn", course.whatyouwilllearn);
          setValue("instructions", course.instructions?.join(" ,"));
          setValue("benefits", course.benefits?.join(" ,"));
          setValue("requirements", course.requirements ?? []);
          setValue("thumbnail", course.thumbnail);
        }
      } catch (err) {
        console.log(err);
        setCourseCategory([]);
      } finally {
        setLoading(false);
      }
    };
    getCategory();
  }, [course, editCourse, setValue]);


  // Function to check if any form value is updated compared to the course details
  const isFormUpdated = () => {
    const currentValues = getValues();
    const currentRequirements = (currentValues.requirements || []).join(" ,");
    const courseRequirements = (course?.requirements || []).join(" ,");
    if (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseDescription !== course.courseDescription ||
      currentValues.courseCategory !== (course.category?.name ?? course.category) ||
      currentValues.coursePrice !== course.price ||
      currentValues.whatYouWillLearn !== course.whatyouwilllearn ||
      currentValues.instructions !== course.instructions?.join(" ,") ||
      currentValues.benefits !== course.benefits?.join(" ,") ||
      currentRequirements !== courseRequirements ||
      currentValues.thumbnail !== course.thumbnail
    )
      return true;
    else return false;
  };

  // Handles Next button click
  const onSubmit = async (data) => {
    if (editCourse) {
      if (!isFormUpdated()) {
        toast.error("No changes made to the form.");
        return;
      }

      const currentValues = getValues();
      const formData = new FormData();
      formData.append("courseId", course._id);
      if (currentValues.courseTitle !== course.courseName) {
        formData.append("courseName", currentValues.courseTitle);
      }
      if (currentValues.courseDescription !== course.courseDescription) {
        formData.append("courseDescription", currentValues.courseDescription);
      }
      if (currentValues.courseCategory !== (course.category?.name ?? course.category)) {
        formData.append("category", currentValues.courseCategory);
      }
      if (currentValues.coursePrice !== course.price) {
        formData.append("price", currentValues.coursePrice);
      }
      if (currentValues.courseTags !== course.tags?.join(" ,")) {
        formData.append("tags", currentValues.courseTags);
      }
      if (currentValues.whatYouWillLearn !== course.whatyouwilllearn) {
        formData.append("whatyouwilllearn", currentValues.whatYouWillLearn);
      }
      if (currentValues.thumbnail !== course.thumbnail) {
        formData.append("thumbnail", currentValues.thumbnail);
      }
      if (currentValues.instructions !== course.instructions?.join(" ,")) {
        formData.append("instructions", currentValues.instructions);
      }
      if (currentValues.benefits !== course.benefits?.join(" ,")) {
        formData.append("benefits", currentValues.benefits);
      }
      if ((currentValues.requirements || []).join(" ,") !== (course.requirements || []).join(" ,")) {
        formData.append("requirements", currentValues.requirements);
      }

      setLoading(true);
      const result = await editCourseDetails(formData, token);
      setLoading(false);
      if (result?.success) {
        const updatedCourse = result?.course || result?.data?.course || result?.data;
        if (updatedCourse) {
          dispatch(setCourse(updatedCourse));
        }
        dispatch(setStep(2));
        toast.success("Course Updated Sucessfully");
      } else {
        toast.error("Failed to update the course. Please try again.");
      }
      return;
    }

    // Create a new course 
    const formData = new FormData();
    formData.append("courseName", data.courseTitle);
    formData.append("courseDescription", data.courseDescription);
    formData.append("category", data.courseCategory);
    formData.append("price", data.coursePrice);
    formData.append("tags", data.courseTags);
    formData.append("whatyouwilllearn", data.whatYouWillLearn);
    formData.append("thumbnail", data.thumbnail);
    formData.append("instructions", data.instructions);
    formData.append("benefits", data.benefits);
    formData.append("requirements", data.requirements);
    formData.append("status", "Draft");

    setLoading(true);
    const result = await addCourseDetails(formData, token);
    setLoading(false);
    if (result?.success) {
      const createdCourse = result?.course || result?.data?.course || result?.data;
      if (createdCourse) {
        dispatch(setCourse(createdCourse));
      }
      dispatch(setStep(2));
      toast.success("Course Created Sucessfully");
    } else {
      toast.error("Failed to create the course. Please try again.");
    }
  };

  return (
    <div className="flex flex-col gap-6 mt-6 px-6 py-4 border border-richblack-600 rounded-lg bg-richblack-800">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 rounded-lg bg-richblack-800 p-6 "
      >
        {/* Course Title */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6 ">
          <label
            className="text-sm font-medium text-richblack-5 md:w-1/4"
            htmlFor="courseTitle"
          >
            Course Title <sup className="text-pink-200">*</sup>
          </label>
          <div className="relative w-full md:w-3/4">
            <input
              type="text"
              name="courseTitle"
              id="courseTitle"
              placeholder="Enter Course Title"
              className="w-full rounded-md bg-richblack-800 p-3 text-richblack-5 border border-richblack-700 focus:outline-none focus:border-yellow-50 text-sm"
              {...register("courseTitle", { required: "true" })}
            />
            {errors.courseTitle && (
              <span className="text-pink-200 text-sm mt-1">
                Course Title is required
              </span>
            )}
          </div>
        </div>
        {/* Course Description */}
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
          <label
            htmlFor="courseDescription"
            className="text-sm font-medium text-richblack-5 md:w-1/4"
          >
            Course Description
            <sup className="text-pink-200 ml-1 text-sm font-medium ">*</sup>
          </label>
          <div className="relative w-full md:w-3/4">
            <textarea
              name="courseDescription"
              id="courseDescription"
              placeholder="Enter Course Descriptiom"
              className="w-full rounded-md bg-richblack-800 p-3 text-richblack-5 border border-richblack-700 focus:outline-none focus:border-yellow-50 text-sm h-[120px] resize-none"
              {...register("courseDescription", { required: "true" })}
            />
            {errors.courseDescription && (
              <span className="text-pink-200 text-sm mt-1">
                Course Description is required
              </span>
            )}
          </div>
        </div>
        {/* What You Will Learn */}
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
          <label
            htmlFor="whatYouWillLearn"
            className="text-sm font-medium text-richblack-5 md:w-1/4"
          >
            What You Will Learn
            <sup className="text-pink-200 ml-1 text-sm font-medium">*</sup>
          </label>
          <div className="relative w-full md:w-3/4">
            <textarea
              name="whatYouWillLearn"
              id="whatYouWillLearn"
              placeholder="Write what students will learn"
              className="w-full rounded-md bg-richblack-800 p-3 text-richblack-5 border border-richblack-700 focus:outline-none focus:border-yellow-50 text-sm h-[120px] resize-none"
              {...register("whatYouWillLearn", { required: "true" })}
            />
            {errors.whatYouWillLearn && (
              <span className="text-pink-200 text-sm mt-1">
                This field is required
              </span>
            )}
          </div>
        </div>
        {/* Course Price */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
          <label
            htmlFor="coursePrice"
            className="text-sm font-medium text-richblack-5 md:w-1/4"
          >
            Course Price
            <sup className="text-pink-200 ml-1 text-sm font-medium">*</sup>
          </label>
          <div className="relative w-full md:w-3/4">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-richblack-300 pointer-events-none">
              <MdCurrencyRupee className="text-white text-sm" />
            </span>
            <input
              type="number"
              name="coursePrice"
              id="coursePrice"
              placeholder="Enter Course Price"
              className="w-full rounded-md bg-richblack-800 p-3 pl-10 text-richblack-5 border border-richblack-700 focus:outline-none focus:border-yellow-50 text-sm"
              {...register("coursePrice", {
                required: "true",
                min: 10,
                valueAsNumber: true,
              })}
            />

            {errors.coursePrice && (
              <span className="text-pink-200 text-xs text-right">
                Course Price is required
              </span>
            )}
          </div>
        </div>
        {/* Course Category */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
          <label
            htmlFor="courseCategory"
            className="text-sm font-medium text-richblack-5 md:w-1/4"
          >
            Course Category
            <sup className="text-pink-200 ml-1 text-sm font-medium">*</sup>
          </label>

          <div className="relative w-full md:w-3/4">
            <select
              className="w-full rounded-md bg-richblack-800 p-3 text-richblack-5 border border-richblack-700 focus:outline-none focus:border-yellow-50 text-sm"
              name="courseCategory"
              id="courseCategory"
              defaultValue="default"
              {...register("courseCategory", { required: "true" })}
            >
              {errors.courseCategory && (
                <span className="text-pink-200 text-sm mt-1">
                  Course Category is required
                </span>
              )}
              <option value="default" disabled>
                Select Course Category
              </option>

              {!loading &&
                courseCategory.map((category, index) => (
                  <option key={category._id || index} value={category._id}>
                        {category.name}
                      </option>
                ))}
            </select>
          </div>
        </div>
        {/* Create Custom Component for Tags */}
        <ChipInput
          label="Course Tags"
          name="courseTags"
          placeholder="Enter Course Tags"
          register={register}
          errors={errors}
          setValue={setValue}
          getValues={getValues}
        />
        {/* Instructions */}
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
          <label
            htmlFor="instructions"
            className="text-sm font-medium text-richblack-5 md:w-1/4"
          >
            Instructions
            <sup className="text-pink-200 ml-1 text-sm font-medium">*</sup>
          </label>
          <div className="relative w-full md:w-3/4">
            <textarea
              name="instructions"
              id="instructions"
              placeholder="Enter instructions for the course"
              className="w-full rounded-md bg-richblack-800 p-3 text-richblack-5 border border-richblack-700 focus:outline-none focus:border-yellow-50 text-sm h-[120px] resize-none"
              {...register("instructions", { required: "true" })}
            />
            {errors.instructions && (
              <span className="text-pink-200 text-sm mt-1">
                Instructions are required
              </span>
            )}
          </div>
        </div>
        {/* Create a Component for uplaoding and showing preview of media  */}
        <MediaUpload
          label="Course Thumbnail"
          name="thumbnail"
          register={register}
          setValue={setValue}
          getValues={getValues}
          errors={errors}
        />
        {/* Benefits of the Course  */}
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
          <label
            htmlFor="benefits"
            className="text-sm font-medium text-richblack-5 md:w-1/4"
          >
            Benefits of the Course
            <sup className="text-pink-200 ml-1 text-wsm font-medium">*</sup>
          </label>

          <div className="relative w-full md:w-3/4">
            <textarea
              name="benefits"
              id="benefits"
              placeholder="Enter Benefits of the Course"
              className="w-full rounded-md bg-richblack-800 p-3 text-richblack-5 border border-richblack-700 focus:outline-none focus:border-yellow-50 text-sm h-[120px] resize-none"
              {...register("benefits", {
                required: "true",
                validate: (value) =>
                  value.split(", ").length >= 3 ||
                  "Please enter at least 3 benefits seperated by comma and space (, ) ",
              })}
            ></textarea>
            {errors.benefits && (
              <span className="text-pink-200 text-sm mt-1">
                {errors.benefits.type === "required"
                  ? "Benefits of the Course is required"
                  : errors.benefits.message}
              </span>
            )}
          </div>
        </div>
        {/* Requirement Field */}
        <RequirementField
          name="requirements"
          label="Course Requirements"
          register={register}
          setValue={setValue}
          getValues={getValues}
          errors={errors}
        />
        {/*  */}
        <div>
          {editCourse && (
            <button
              onClick={() => dispatch(setStep(2))}
              className="text-sm text-blue-100 hover:underline bg-transparent border-none cursor-pointer"
            >
              Continue without saving
            </button>
          )}
          <button className="ml-4 rounded-md bg-yellow-50 px-4 py-2 text-sm font-medium text-richblack-900 hover:bg-yellow-100 transition-colors duration-300">
            {!editCourse ? "Next" : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseInformationForm;
