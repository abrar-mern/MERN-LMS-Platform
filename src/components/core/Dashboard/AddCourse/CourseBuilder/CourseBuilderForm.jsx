import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import IconBtn from "../../../../common/IconBtn";
import { IoAddCircleOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import NestedView from "./NestedView"
import { BiRightArrow } from "react-icons/bi";
import {useDispatch} from "react-redux";
import {setCourse, setEditCourse, setStep} from "../../../../../redux/slice/courseSlice"
import {toast} from "react-hot-toast"
import {updateSection, createSection} from "../../../../../services/operations/courseDetailsAPI"

const CourseBuilderForm = () => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();
  const [editSectionId, setEditSectionId] = useState(null);
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  
  const handleEditSectionName = (sectionId, sectionName) => {
  if (editSectionId === sectionId) {
      cancelEdit();
      return;
    }
    setEditSectionId(sectionId);
    setValue("sectionName", sectionName);
  }

  const cancelEdit = () => {
    setEditSectionId(null);
    setValue("sectionName", "");
  }

  const goback =() => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  }
  const gotoNext = () => {  
    if (course?.courseContent?.length === 0) {
      toast.error ("Please add at least one section to proceed to the next step");
      return;
    }
    if (course?.courseContent?.some(section => section.subSections.length === 0)) {
      toast.error ("Please add at least one lecture to each section to proceed to the next step");
      return;
    }
    dispatch(setStep(3));
  }

  const onSubmit = async (data) => {
    if (!course?._id) {
      toast.error("Course not found. Please go back and create a course first.");
      return;
    }
    setLoading(true);
    let result = null;  

    try {
      if (editSectionId) {
        result = await updateSection({
          sectionName: data.sectionName,
          sectionId: editSectionId,
          courseId: course._id,
        }, 
        
        token);
      } else {
        result = await createSection({
          sectionName: data.sectionName,
          courseId: course._id,
        }, token);
       console.log("result after section create:", result);
      }

      if (result) {
        dispatch(setCourse(result));
        console.log("updated course:", result);
        setEditSectionId(null);
        setValue("sectionName", "");
      }
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="w-full px-4 py-6">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6 lg:flex-row lg:gap-8">
        <div className="w-full max-w-[720px] rounded-xl border border-richblack-700 bg-richblack-800 p-6 shadow-sm lg:flex-1 lg:mx-0 mx-auto">
          <h2 className="mb-6 text-center text-3xl font-bold text-richblack-5">
            Course Builder Form
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 text-richblack-5"
          >
            <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-4">
              <label
                htmlFor="sectionName"
                className="text-sm font-medium text-richblack-5 lg:w-1/4"
              >
                Section Name
                <sup className="text-pink-500">*</sup>
              </label>
              <input
                type="text"
                name="sectionName"
                id="sectionName"
                className="w-full rounded-md bg-richblack-800 p-3 text-richblack-5 border border-richblack-700 focus:outline-none focus:border-yellow-50 text-sm"
                {...register("sectionName", { required: true })}
              />
              {errors.sectionName && (
                <span className="text-pink-200 text-sm mt-1">
                  Section Name is required
                </span>
              )}
            </div>
            <div className="flex justify-start mt-4">
              <IconBtn
                text={editSectionId ? "Edit Section Name" : "Add Section"}
                type="submit"
                customStyles="!bg-transparent text-yellow-50 border border-yellow-50 hover:bg-yellow-50 hover:text-richblack-900"
              >
                <IoAddCircleOutline className="text-2xl ml-2" />
              </IconBtn>
              {editSectionId && (
                <button
                  type="button"
                  onClick={() => {
                     cancelEdit();
                  }}
                  className="ml-4 bg-transparent text-pink-200 border border-pink-200 hover:bg-pink-200 hover:text-richblack-900 rounded-md px-4 py-2 text-sm"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
          
          <NestedView handleEditSectionName={handleEditSectionName} />
          <div className = "flex gap-4 mt-6 border-t border-richblack-700 pt-4">
            <button
            className = "bg-yellow-50 text-richblack-900 rounded-md px-4 py-2 text-sm hover:bg-yellow-100 hover:text-richblack-900 w-full lg:w-auto text-center"
            onClick = {goback}
            >
              Back
            </button>
            <button 
            text = "Next"
            className = "flex items-center gap-1 bg-yellow-50 text-richblack-900 rounded-md px-4 py-2 text-sm hover:bg-yellow-100 hover:text-richblack-900 w-full lg:w-auto text-center"
            onClick = {gotoNext}
            >
              Next
                <BiRightArrow />

            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CourseBuilderForm;
