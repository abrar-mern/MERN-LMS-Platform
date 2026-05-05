import React from "react";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {useState, useEffect} from "react";
import RenderSteps from "../AddCourse/RenderSteps";
import Spinner from "../../../common/Spinner"
import { getFullDetailsOfCourse } from "../../../../services/operations/courseDetailsAPI";
import {setCourse, setEditCourse} from "../../../../redux/slice/courseSlice"

const EditCourse = () => {
    const dispatch = useDispatch();
    const {courseId} = useParams();
    const {course} = useSelector((state) => state.course);
    const [loading, setLoading] = useState(false);
    const {token} = useSelector((state) => state.auth);

    useEffect(() => {
        const populateCourseData = async () => {
            setLoading(true);
           const result = await getFullDetailsOfCourse(courseId, token);
if(result) {
    dispatch(setEditCourse(true));
    dispatch(setCourse(result));
}
            setLoading(false);
        }
        populateCourseData();
    }, [courseId, token, dispatch]);
    

    if(loading) {
        return (
            <Spinner />
        )
    }
    return (
        <div className = "grid min-h-calc(100vh-3.5rem) place-items-center">
            <h1 className = "text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
                Edit Course
            </h1>
            <div className = "w-full py-6 px-4 lg:px-8">
                {
                    course?(<RenderSteps />) : (
                        <p className = "my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100 text-center">
                            No Course Found
                        </p>
                    )
                }
            </div>

        </div>
    )
}

export default EditCourse;