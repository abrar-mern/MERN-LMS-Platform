import React from "react";
import HighlightText from "../components/core/HomePage/HighlightedText";
import aboutImage1 from "../assets/Images/aboutus1.webp";
import aboutImage2 from "../assets/Images/aboutus2.webp";
import aboutImage3 from "../assets/Images/aboutus3.webp";
import Quote from "../components/core/About/Quote";
import foundingStory from "../assets/Images/FoundingStory.png";
import LearningGrid from "../components/core/About/LearningGrid"
import ContactFormSection from "../components/core/About/ContactFormSection"

const About = () => {
  return (
    <div className="w-full">
      <section className="bg-richblack-700 ">
        <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-center text-white">
          <header className="mx-auto py-20 text-4xl font-semibold lg:w-[70%]">
            Driving Innovation in Online Education for a <br />
            <HighlightText text={"Brighter Future"} />
            <p className="mx-auto mt-3 text-center font-medium text-richblack-300 lg:w-[95%] text-[16px] leading-6">
              Codegyaani is at the forefront of driving innovation in online
              education. We're passionate about creating a brighter future by
              offering cutting-edge courses, leveraging emerging technologies,
              and nurturing a vibrant learning community.
            </p>
          </header>
          <div className="sm:h-[70px] lg:h-[150px]"></div>
          <div className="absolute bottom-0 left-[50%] grid w-[100%] translate-x-[-50%] translate-y-[30%] grid-cols-3 gap-3 lg:gap-5">
            <img src={aboutImage1} alt="" />
            <img src={aboutImage2} alt="" />
            <img src={aboutImage3} alt="" />
          </div>
        </div>
      </section>
      {/* Section 2 */}
      <section className="mt-24 border-b border-richblack-700">
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500 py-12">
          <div>
            <Quote
              intro={
                "We are passionate about revolutionizing the way we learn. Our innovative platform"
              }
              highlights={[
                {
                  text: "combines technology",
                  gradientClass: "from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]",
                },
                {
                  text: "expertise",
                  gradientClass: "from-[#FF512F] to-[#F09819]",
                },
                {
                  text: "unparalleled educational experience",
                  gradientClass: "from-[#E65C00] to-[#F9D423]",
                },
              ]}
              middle={"and community to create an"}
              outro={"."}
              className={"max-w-4xl"}
            />
          </div>
        </div>
      </section>
      {/* Section 3 */}
      <section>
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500">
          <div className="flex flex-col items-center gap-10 lg:flex-row justify-between">
            <div className="my-24 flex lg:w-[50%] flex-col gap-10">
              <h2 className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">
                Our Founding Story
              </h2>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                Our e-learning platform was born out of a shared vision and
                passion for transforming education. It all began with a group of
                educators, technologists, and lifelong learners who recognized
                the need for accessible, flexible, and high-quality learning
                opportunities in a rapidly evolving digital world.
              </p>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                As experienced educators ourselves, we witnessed firsthand the
                limitations and challenges of traditional education systems. We
                believed that education should not be confined to the walls of a
                classroom or restricted by geographical boundaries. We
                envisioned a platform that could bridge these gaps and empower
                individuals from all walks of life to unlock their full
                potential.
              </p>
            </div>
            <div>
              <img
                src={foundingStory}
                className="shadow-[0_0_20px_0] shadow-[#FC6767]"
                alt=""
              />
            </div>
          </div>

          <div className="flex flex-col items-center lg:gap-10 lg:flex-row justify-between">
            <div className="flex flex-col items-center lg:gap-10 lg:flex-row justify-between">
              <div className="my-24 flex lg:w-[40%] flex-col gap-10">
                <h2 className="bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">
                  Our Vision
                </h2>
                <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                  With this vision in mind, we set out on a journey to create an
                  e-learning platform that would revolutionize the way people
                  learn. Our team of dedicated experts worked tirelessly to
                  develop a robust and intuitive platform that combines
                  cutting-edge technology with engaging content, fostering a
                  dynamic and interactive learning experience.
                </p>
              </div>
              <div className="my-24 flex lg:w-[40%] flex-col gap-10">
                <h2 className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text text-4xl font-semibold lg:w-[70%] ">
                  Our Mission
                </h2>
                <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                  Our mission goes beyond just delivering courses online. We
                  wanted to create a vibrant community of learners, where
                  individuals can connect, collaborate, and learn from one
                  another. We believe that knowledge thrives in an environment
                  of sharing and dialogue, and we foster this spirit of
                  collaboration through forums, live sessions, and networking
                  opportunities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Section 4 */}
      <div className="bg-richblack-700">
        <div className="flex flex-col gap-10 justify-between w-11/12 max-w-maxContent text-white mx-auto ">
          <div className="grid grid-cols-2 md:grid-cols-4 text-center">
            <div className="flex flex-col py-10">
              <h2 className="text-[30px] font-bold text-richblack-5">5K</h2>
              <h2 className="font-semibold text-[16px] text-richblack-500">
                Active Students
              </h2>
            </div>

            <div className="flex flex-col py-10">
              <h2 className="text-[30px] font-bold text-richblack-5">10+</h2>
              <h2 className="font-semibold text-[16px] text-richblack-500">
                Mentors
              </h2>
            </div>

            <div className="flex flex-col py-10">
              <h2 className="text-[30px] font-bold text-richblack-5">200+</h2>
              <h2 className="font-semibold text-[16px] text-richblack-500">
                Courses
              </h2>
            </div>

            <div className="flex flex-col py-10">
              <h2 className="text-[30px] font-bold text-richblack-5">50+</h2>
              <h2 className="font-semibold text-[16px] text-richblack-500">
                Awards
              </h2>
            </div>
          </div>
        </div>
      </div>
      {/* Section 5 */}
      <section className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white">
        <LearningGrid />
        <ContactFormSection />
      </section>
    </div>
  );
};

export default About;
