import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getUserEnrolledCourses } from "../../../services/operations/profileapi";
import Spinner from "../../common/Spinner";
import ProgressBar from "@ramonak/react-progress-bar";

const EnrolledCourses = () => {
  
  const authToken = useSelector((state) => state.auth.token);
  const token = authToken || (localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null);

  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEnrolledCourses = async (currentToken) => {
    setLoading(true);
    try {
      const response = await getUserEnrolledCourses(currentToken);
      console.log("Enrolled Courses API Response:", response);
      setEnrolledCourses(response || []);
    } catch (err) {
      console.log("Enrolled Courses Error:", err);
      setEnrolledCourses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    fetchEnrolledCourses(token);
  }, [token]);

  return (
    <div className="text-white">
      <div>Enrolled Courses</div>

      {loading ? (
        <Spinner />
      ) : !enrolledCourses.length ? (
        <div>No Enrolled Courses Found</div>
      ) : (
        <div>
          <div>
            <p>Course Name</p>
            <p>Duration</p>
            <p>Progress</p>
          </div>

          {enrolledCourses.map((course) => (
            <div key={course._id || course.id}>
              <div>
                <img src={course.thumbnail} alt={course.name} />
                <div>
                  <p>{course.name}</p>
                  <p>{course.description}</p>
                </div>
              </div>

              <div>{course?.totalDuration || "—"}</div>

              <div>
                <p>Progress : {course?.progressPercentage || 0}%</p>
                <ProgressBar
                  progress={course?.progressPercentage || 0}
                  height="10px"
                  isLabelVisible={false}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnrolledCourses;
