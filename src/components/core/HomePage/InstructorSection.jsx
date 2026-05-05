import react from "react";
import instructorImage from "../../../assets/Images/Instructor.png";
import Highlighted from "./HighlightedText";
import CTAButton from "./CTAButton";
import { FaArrowRight } from "react-icons/fa6";

function InstructorSection() {
  return (
    <div className="mt-16 w-full">
      <div className="flex flex-row gap-20 items-center">
        {/* Left Section */}
        <div className="w-[50%] relative shadow-white">
          <div className="absolute -bottom-4 right-[1rem] h-[520px] left-[-2rem] top-[-4%] bg-white" />

          <img
            src={instructorImage}
            alt="Instructor Image"
            className="relative z-10 shadow-white"
          />
        </div>
        {/* Right Section */}
        <div className="w-[50%] flex flex-col gap-5">
          <div className="text-4xl font-semibold w-[50%] leading-[160%]">
            Become an
            <Highlighted text={"Instructor"} />
          </div>
          <p className="font-medium text-[16px] w-[80%] text-richblack-300">
            Instructors from around the world teach millions of students on
            Codegyaani. We provide the tools and skills to teach what you love.
          </p>
          <div className="w-fit mt-16">
            <CTAButton active={true} linkto={"/signup"}>
              <div className="flex flex-row gap-2 items-center ">
                Start Teaching Today
                <FaArrowRight />
              </div>
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InstructorSection;
