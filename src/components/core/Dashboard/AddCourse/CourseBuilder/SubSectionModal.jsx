import { React } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {
  createSubSection,
  updateSubSection,
} from "../../../../../services/operations/courseDetailsAPI";
import { setCourse } from "../../../../../redux/slice/courseSlice";
import { toast } from "react-hot-toast";
import { IoIosClose } from "react-icons/io";
import MediaVideo from "../CourseInformation/MediaUpload";
import IconBtn from "../../../../common/IconBtn";

const SubSectionModal = ({
  modalData,
  setModalData,
  add = false,
  view = false,
  edit = false,
}) => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);

  {
    /* We are using setValue to set the values so data will be prefield in case of view and edit mode and in case of add mode the fields will be empty as we are not setting any value to the fields */
  }
  useEffect(() => {
    if (view || edit) {
      setValue("title", modalData.title);
      setValue("description", modalData.description);
      setValue("video", modalData.videoUrl);
    }
  }, []);

  {
    /* This function is used to check if any changes are made in the form or not in case of edit mode and view mode as in add mode we don't need to check for changes as the fields will be empty */
  }
  const isFormUpdated = () => {
    const currentValues = getValues();
    if (
      currentValues.title !== modalData.title ||
      currentValues.description !== modalData.description ||
      currentValues.video !== modalData.videoUrl
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleFormSubmit = async (data) => {
    if (view) {
      return;
    }
    const sectionId = add ? modalData : modalData.sectionId;
    if (edit) {
      if (!isFormUpdated()) {
        toast.error("No changes made to update the lecture");
      } else {
        handleEditSubSection(data);
      }
      return;
    }
    const formData = new FormData();
    formData.append("sectionId", sectionId);
    formData.append("title", data.title);
    formData.append("description", data.description);
    if (data.video) {
      formData.append("video", data.video);
    }
    setLoading(true);
    // Make an API Call for adding the lectures
    const result = await createSubSection(formData, token);
    if (result) {
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === sectionId ? result : section,
      );
      const updatedCourse = {
        ...course,
        courseContent: updatedCourseContent,
      };
      dispatch(setCourse(updatedCourse));
      toast.success("Lecture added successfully");
    }
    setModalData(null);
    setLoading(false);
  };

  const handleEditSubSection = async (data) => {
    const sectionId = modalData.sectionId;
    const currentValues = getValues();
    const formData = new FormData();
    formData.append("sectionId", sectionId);
    formData.append("subSectionId", modalData._id);

    if (currentValues.title !== modalData.title) {
      formData.append("title", currentValues.title);
    }
    if (currentValues.description !== modalData.description) {
      formData.append("description", currentValues.description);
    }
    if (currentValues.video && currentValues.video !== modalData.videoUrl) {
      formData.append("video", currentValues.video);
    }
    setLoading(true);
    // Make an API Call for editing the lectures
    const result = await updateSubSection(formData, token);
    if (result) {
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === sectionId ? result : section,
      );
      const updatedCourse = {
        ...course,
        courseContent: updatedCourseContent,
      };

      dispatch(setCourse(updatedCourse));
      toast.success("Lecture updated successfully");
    }
    setLoading(false);
    setModalData(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm px-6 py-8">
      <div className="relative w-full max-w-lg rounded-lg border border-richblack-700 bg-richblack-900 p-10 shadow-lg flex flex-col gap-6">
        <div className="flex justify-between  gap-2 text-2xl font-semibold text-richblack-5 mb-4">
          <p className="cursor-pointer text-richblack-300 hover:text-richblack-100 transition-colors duration-200">
            {view && "Viewing"} {add && "Add"} {edit && "Editing"} Lecture
          </p>
          <button
            className="rounded-md border border-richblack-700 p-2 text-richblack-300 transition-colors duration-200 hover:text-richblack-100 hover:bg-richblack-800"
            onClick={() => (!loading ? setModalData(null) : {})}
          >
            <IoIosClose />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="flex flex-col gap-8 text-richblack-5"
        >
          {/* Upload Video */}
          <MediaVideo
            name="video"
            label="Upload Lecture Video"
            register={register}
            setValue={setValue}
            errors={errors}
            video={true}
            viewData={view ? modalData.videoUrl : null}
            editData={edit ? modalData.videoUrl : null}
          />

          {/* Lecture Title */}
          <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-4">
            <label
              htmlFor="title"
              className="text-sm font-medium text-richblack-5 lg:w-1/4 flex items-center gap-1"
            >
              Lecture Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              className="w-full rounded-md bg-richblack-800 p-3 text-richblack-5 border border-richblack-700 focus:outline-none focus:border-yellow-50 text-sm disabled:bg-richblack-700 disabled:text-richblack-500 disabled:border-richblack-600 disabled:cursor-not-allowed disabled:hover:bg-richblack-700/80 disabled:hover:text-richblack-500 transition-colors duration-200"
              placeholder="Enter the title of the lecture"
              {...register("title", { required: true })}
            />
            {errors.title && (
              <span className="text-pink-200 text-sm mt-1 lg:col-start-2 lg:col-end-3 lg:row-start-2 lg:row-end-3 lg:self-start lg:justify-self-start lg:mt-1 lg:ml-4 lg:col-span-1 ">
                This field is required
              </span>
            )}
          </div>

          {/* Lecture Description */}
          <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-4">
            <label
              htmlFor="lectureDescription"
              className="text-sm font-medium text-richblack-5 lg:w-1/4 flex items-center gap-1 "
            >
              Lecture Description
            </label>
            <textarea
              name="description"
              id="lectureDescription"
              rows="4"
              colspan="1"
              className="w-full rounded-md bg-richblack-800 p-3 text-richblack-5 border border-richblack-700 focus:outline-none focus:border-yellow-50 text-sm disabled:bg-richblack-700 disabled:text-richblack-500 disabled:border-richblack-600 disabled:cursor-not-allowed disabled:hover:bg-richblack-700/80 disabled:hover:text-richblack-500 transition-colors duration-200"
              placeholder="Enter the description of the lecture"
              {...register("description", { required: true })}
            />

            {errors.description && (
              <span className="text-pink-200 text-sm mt-1 lg:col-start-2 lg:col-end-3 lg:row-start-2 lg:row-end-3 lg:self-start lg:justify-self-start lg:mt-1 lg:ml-4 lg:col-span-1 ">
                This field is required
              </span>
            )}
          </div>

          {/* Submit Button */}
          {!view && (
            <IconBtn
              
              type="submit"
              text={edit ? "Save Changes" : "Add Lecture"}
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default SubSectionModal;
