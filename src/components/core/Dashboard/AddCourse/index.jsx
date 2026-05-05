import React from 'react';
import RenderSteps from "./RenderSteps"
import { FaBoltLightning } from "react-icons/fa6";
const AddCourse = () => {
    return (    
    <div className="w-full px-4 py-6">
            <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6 lg:flex-row lg:gap-8">
                <div className="w-full max-w-[720px] rounded-xl border border-richblack-700 bg-richblack-800 p-6 shadow-sm lg:flex-1 lg:mx-0 mx-auto">
                    <h2 className="mb-6 text-center text-3xl font-bold text-richblack-5">
                        Add New Course
                    </h2>
                    <div className="pr-2">
                        <RenderSteps />
                    </div>
                </div>
                <aside className="w-full lg:w-[320px] lg:mt-0 mt-2">
                    <div className="sticky top-24 rounded-xl border border-richblack-700 bg-richblack-800 p-4 text-richblack-100 shadow-sm">
                        <h3 className="flex items-center mb-3 border-b border-richblack-600 pb-2 text-lg font-semibold text-richblack-5">
                            <FaBoltLightning className="mr-2 text-yellow-400 hover:text-yellow-500" />
                            Course Upload Tips
                        </h3>
                        <ul className="list-disc space-y-2 pl-4 text-sm text-richblack-200">
                            <li>Set the course price to zero for free courses, or specify a price for paid courses.</li>
                            <li>Standard size for the course thumbnail is 1024 × 576 px (16:9 ratio).</li>
                            <li>Video sections should be MP4, and each video should not exceed 500MB.</li>
                            <li>Use clear and concise titles and descriptions to attract more students.</li>
                            <li>Ensure your course content is original to avoid legal issues.</li>
                        </ul>
                    </div>
                </aside>
            </div>
        </div>
    )
}

export default AddCourse;