import React from "react";
import { useSelector } from "react-redux";
import { courseSteps } from "../../../../data/coursesteps";
import { FaCheck } from "react-icons/fa";
import CourseInformationForm from "./CourseInformation/CourseInformationForm";
import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm";
import PublishCourse from "./PublishCourse"

const RenderSteps = () => {
  const { step } = useSelector((state) => state.course);
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {courseSteps.map((item, index) => (
          <React.Fragment key={item.id}>
            <div className="flex flex-col items-center gap-2">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm font-semibold ${
                  item.id === step
                    ? "border-yellow-50 bg-yellow-50 text-richblack-900"
                    : item.id < step
                    ? "border-yellow-50 bg-richblack-900 text-yellow-50"
                    : "border-richblack-600 bg-richblack-800 text-richblack-300"
                }`}
              >
                {item.id < step ? <FaCheck /> : item.id}
              </div>
              <p
                className={`text-center text-xs font-medium ${
                  item.id === step
                    ? "text-yellow-50"
                    : "text-richblack-300"
                }`}
              >
                {item.name}
              </p>
            </div>
            {index < courseSteps.length - 1 && (
              <div
                className={`mx-2 h-px flex-1 border-t ${
                  item.id < step
                    ? "border-yellow-50"
                    : "border-dashed border-richblack-600"
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
        {
            step === 1 && (
                <CourseInformationForm />
            )
            
            }
            {
               step === 2 && (
              <CourseBuilderForm />
            )
           
        }
            {
              step === 3 && (
                <PublishCourse />
              )
            }
     
    </div>
  );
};

export default RenderSteps;
