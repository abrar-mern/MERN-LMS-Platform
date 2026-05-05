import React from 'react';
import {Link} from "react-router-dom";
import {useState, useEffect} from "react";
import { calculateAverageRating } from '../../../utils/avgRating';
import RatingsStar from '../../common/RatingsStar';
import { MdCurrencyRupee } from "react-icons/md";



const CourseGrid = ({course, height}) => {
    console.log("Course course:", course);
    const [avgReviewCount, setAvgReviewCount] = useState(0);
    useEffect(() => {
        const count = calculateAverageRating(course?.ratingsAndReviews);
        setAvgReviewCount(count);
    },[course])
    return (
        <div className = "w-full p-2 rounded-lg shadow-lg bg-richblack-800 hover:shadow-yellow-50/50 transition-all duration-200">
            <Link to = {`/course/${course._id}`}>
                <div className = "flex flex-col gap-y-2">
                    <div className = "h-48 sm:h-52 md:h-60 lg:h-64 xl:h-72 2xl:h-80">
                        <img src = {course?.thumbnail} alt = {course?.title} 
                        className = {`${height? height : 'h-48'} object-cover w-full rounded-lg`}
                        />
                    </div>
                    <div className = "flex flex-col gap-y-1 px-1">
                        <p className = "text-lg font-semibold text-white">{course?.courseName}</p>
                        
                        <p className = "text-sm text-gray-400">{course?.Instructor?.firstName} {course?.Instructor?.lastName}</p>
                        <div className = "flex items-center gap-x-2 text-sm text-gray-400">
                            <span className = "font-semibold text-yellow-500"> {avgReviewCount || 0} </span>
                            <RatingsStar rating={avgReviewCount} /> 
                            <span className = "text-gray-400">({course?.ratingsAndReviews?.length} Ratings)</span>
                        </div>
                        <p className = "flex items-center gap-x-1 text-gray-400 ">
                            <MdCurrencyRupee className = "text-gray-400" />

                            {course?.price}</p>
                    </div>

                </div>
            </Link>
        </div>
    )
}

export default CourseGrid;