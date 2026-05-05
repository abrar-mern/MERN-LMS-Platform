import React from "react";
import { getInstructorCourses } from "../../../services/operations/courseDetailsAPI";
import { IoAddOutline } from "react-icons/io5";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../common/IconBtn";
import CoursesTable from "./InstructorCourses/CoursesTable";
import { ACCOUNT_TYPE } from "../../../utils/constants";
import {useDispatch} from "react-redux";



const MyCourses = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await getInstructorCourses(token);
      if (result?.success) {
        setCourses(result.courses || result.data || []);
      }
    };
    fetchCourses();
  }, [token]);
  return (
    <div className="w-full h-full flex flex-col gap-6 p-6 bg-richblack-800 rounded-lg">
      <div className="w-full flex items-center justify-between text-richblack-5 font-semibold text-lg ">
        <h1 className="text-2xl font-bold text-richblack-5">My Courses</h1>
        <IconBtn
          text="Create  Course"
          onClick={() => navigate("/dashboard/add-course")}
          customStyles="bg-yellow-50 text-richblack-900 px-4 py-2 rounded-lg"
        >
          <IoAddOutline className="text-lg" />
        </IconBtn>
      </div>
      {
        courses && <CoursesTable courses={courses} setCourses={setCourses} />
      }
    </div>
  );
};

export default MyCourses;
