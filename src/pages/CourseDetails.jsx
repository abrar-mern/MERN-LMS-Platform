import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CourseDetails = () => {
    const {user} = useSelector((state) => state.profile);
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { courseId } = useParams();
   

 const handleBuyCourse = () => {
    if (token) {
        handleBuyCourse(token, courseId, user, navigate, dispatch);
        return;
    }
 }

    return (
        <div className = "w-full flex flex-col items-center gap-5 py-10 px-4 bg-richblack-900 text-richblack-5">
           
                    <button className = "bg-yellow-50 text-richblack-900 font-semibold px-4 py-2 rounded-lg mt-4"
                    onClick = {() => handleBuyCourse()}
                    >
                        Buy Now
                    </button>
                
        </div>
    )
}

export default CourseDetails;