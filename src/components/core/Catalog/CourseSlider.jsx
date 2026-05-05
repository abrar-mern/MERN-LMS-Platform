import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import {Autoplay, FreeMode, Pagination} from "swiper/modules";
import Course_Card from "./CourseGrid"

const CourseSlider = ({ Courses }) => {
  return (
    <div className = "w-full h-full flex flex-col gap-6 p-6 bg-richblack-800 rounded-lg">
      {Courses?.length ? (
        <Swiper freeMode = {true} pagination = {{clickable: true}} modules = {[Autoplay, FreeMode, Pagination]} className = "mySwiper" autoplay = {{delay: 3000, disableOnInteraction: false}} breakpoints = {{
            0: {
                slidesPerView: 1,
                spaceBetween: 10,
            },
            480: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 40,
            },
            1024: {
                slidesPerView: 4,
                spaceBetween: 50,
            },
        }}>
            {
                Courses.map((course, index) => (
                    <SwiperSlide  key = {index}>
                        <Course_Card course = {course} Height = {"h-[250px]"}/>

                    </SwiperSlide>
                ))
            }
        </Swiper>
      ) : (
        <p className = "text-center text-richblack-200"> No course found.</p>
      )}
    </div>
  );
};

export default CourseSlider;
