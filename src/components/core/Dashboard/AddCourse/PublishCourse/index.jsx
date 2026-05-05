import React from 'react';
import { useSelector } from 'react-redux';
import {useDispatch} from "react-redux";
import {useForm} from "react-hook-form"; 
import {useState} from "react";
import IconBtn from '../../../../common/IconBtn';
import {resetCourseState, setStep} from "../../../../../redux/slice/courseSlice"
import { useEffect } from 'react';
import { COURSE_STATUS } from '../../../../../utils/constants';
import {editCourseDetails} from '../../../../../services/operations/courseDetailsAPI'


const PublishCourse = () => {
  const {register,getValues,setValue,formState:{errors}, handleSubmit } = useForm();
  const {course} = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const {token} = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (course?.status === COURSE_STATUS.PUBLISHED) {
      setValue("public", true);
    }
  }, [course?.status, setValue])

  // Handle Form Submission
  const handleCoursePublish = async () => {
    const isAlreadyPublished = course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true;
    const isAlreadyDraft = course?.status === COURSE_STATUS.DRAFT && getValues("public") === false;

    if (isAlreadyPublished || isAlreadyDraft) {
      goToCourses();
      return;
    }
    // If Form is updated
    const formData = new FormData();
    formData.append("courseId", course?._id);
    const courseStatus = getValues("public")
      ? COURSE_STATUS.PUBLISHED
      : COURSE_STATUS.DRAFT;
    formData.append("status", courseStatus);
    // Call API to Publish Course
    setLoading(true);
    const result = await editCourseDetails(formData, token);
    if (result?.course || result?.success) {
      goToCourses();
    }
    setLoading(false);

  }

  const goToCourses = () => {
    dispatch(resetCourseState());
    // Navigate to Course Page
    // Navigate("/dashboard/courses");

  }

  const onSubmit = async(data) => {
    handleCoursePublish();

  }

  // Handle Go Back
  const goBack = () => {
    dispatch(setStep(2));
  }
    
    return (
        <div className = "w-full h-full flex flex-col items-center justify-center gap-5 p-5 border-richblack-600 rounded-lg bg-richblack-800rounded-lg shadow-md border border-gray-700 mt-12">
            <h1 className = "text-2xl font-bold text-gray-800 mb-4 border-b-2 border-gray-300 pb-2 w-full text-center">
               Publish Course
            </h1>
            <form className = "w-full flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                <div className = "w-full flex flex-col gap-2 items-start justify-start">
                    <label htmlFor="confirm" className = "text-gray-700 font-medium text-lg mb-1">
                      
                        <input 
                         type = "checkbox" className = "ml-2 w-4 h-4 text-blue-500 focus:ring-blue-400 border-gray-300 rounded"
                         id = "confirm"
                         {
                          ...register("public", { required: true })
                         }
                        />
                        <span className = "ml-2 text-gray-600 text-md">
                         Are you sure want to publish this course?  
                        </span>
                        {
                          errors.public && <span className = "text-red-500 text-sm mt-1 ml-7">
                            This Field is required
                          </span>
                        }

                    </label>
                    


                </div>

                <div className = "w-full flex justify-end gap-4 mt-4 flex-col md:flex-row ">
                    <button disabled = {loading} type = "button" className = "bg-blue-500 text-white py-2 px-4 rounded hover:bg-richblack-600 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400"
                    onClick = {goBack}
                    >
                        Back 
                </button>
                <IconBtn 
                disabled = {loading}
                type = "submit"
                text = "Publish"
                customStyles = "w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400"
                />
                </div>
                
            </form>
        </div>
    )
}

export default PublishCourse;