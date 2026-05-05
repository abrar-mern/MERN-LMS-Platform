import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import CTAButton from "./CTAButton";
import { TypeAnimation } from "react-type-animation";

const CodeBlocks = ({
  position,
  heading,
  subheading,
  ctabtn2,
  ctabtn1,
  backgroundGradient,
  codeblock,
  codecolor,
}) => {
  return (
    <div className={`flex ${position} my-20 justify-between gap-10`}>
      {/* Left Section */}
      <div className="flex flex-col w-[50%] gap-8">
        {heading}
        <div className="text-richblack-300 font-bold">{subheading}</div>
        <div className="flex gap-7 mt-7">
          <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
            <div className="flex flex-row gap-2 items-center">
              {ctabtn1.btnText}
              <FaArrowRight />
            </div>
          </CTAButton>

          <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
            {ctabtn2.btnText}
          </CTAButton>
        </div>
      </div>
      {/* Right Section */}
      <div className="relative h-fit flex w-full py-2 lg:w-[500px] isolate">
        {/* Ellipse Glow */}
        <div className="absolute top-[-14] left-[-3] pointer-events-none z-0">
          <div
            className="w-[372.95px] h-[257.05px] blur-[68px] opacity-20 transform-gpu"
            style={{
              background: backgroundGradient
                ? `linear-gradient(
            120deg,
            ${backgroundGradient.from} 0%,
            ${backgroundGradient.via} 55%,
            ${backgroundGradient.to} 100%
          )`
                : `linear-gradient(
            120deg,
            #8A2BE2 0%,
            #FFA500 55%,
            #F8F8FF 100%
          )`,
            }}
          />
        </div>

        {/* Code Container */}
        <div className="relative z-10 flex w-full rounded-lg p-4 border border-richblack-700">
          {/* Line numbers */}
          <div className="w-[10%] font-mono text-[14px] leading-[26px] text-richblack-400 py-2">
            {Array.from({ length: 11 }).map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>

          {/* Code */}
          <div
            className={`w-[90%] font-mono text-[14px] leading-[24px] ${codecolor} py-2`}
          >
            <TypeAnimation
              sequence={[codeblock, 2000, "", 500]}
              repeat={Infinity}
              wrapper="div"
              style={{
                whiteSpace: "pre-wrap",
                margin: 0,
                lineHeight: "26px",
              }}
              omitDeletionAnimation={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};


export default CodeBlocks;