import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import Highlighted from "../components/core/HomePage/HighlightedText";
import CTAButton from "../components/core/HomePage/CTAButton";
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import "../App.css";
import TimelineSection from "../components/core/HomePage/TimelineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import ExploreMore from "../components/core/HomePage/ExploreMore";

function Home() {
  return (
    <div>
      {/* Section 1 */}
      <div className="relative mx-auto flex flex-col w-full items-center justify-between text-white group max-w-[1260px] px-4">
        <Link to="/signup">
          <div className="mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 ttransition-transform duration-200 hover:-translate-y-1 transform-gpu will-change-transform w-fit shadow-[0_1px_0_0_rgba(255,255,255,0.18)]">
            <div className="flex flex-row items-center gap-2 rounded-full px-4 py-[5px] group-hover:bg-richblack-900">
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        <div className="text-center text-4xl font-semibold mt-7 ">
          Empower Your Future with
          <Highlighted text="Coding Skills" />
        </div>
        <div className="w-[90%] text-center text-[16px] text-richblack-300 mt-4 leading-7">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>
        <div className="flex flex-row gap-7 mt-8">
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>
          <CTAButton active={false} linkto={"/login"}>
            Book a Demo
          </CTAButton>
        </div>
        {/* Video */}
        <div className="relative mx-3 my-12 isolate">
          {/* White Background */}
          <div className="videobg absolute -bottom-4 -right-4 left-4 top-[8%] bg-white rounded-tl-3xl z-0" />

          {/* Glow - Top Center */}
          <div className="absolute -top-[1] left-1/2 -translate-x-1/2 w-[70vw] max-w-[992px] h-[295px] rounded-full bg-[linear-gradient(117.82deg,#9CECFB_-9.12%,#65C7F7_48.59%,#0052D4_106.3%)] opacity-40 blur-[120px] z-10" />

          {/* Glow - Left Side */}
          <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-[20px] h-[400px] rounded-full bg-[linear-gradient(117.82deg,#9CECFB_-9.12%,#65C7F7_48.59%,#0052D4_106.3%)] opacity-30 blur-[100px] z-10" />

          {/* Video */}
          <video className="relative z-10 block w-full" muted autoPlay loop>
            <source src={Banner} type="video/mp4" />
          </video>
        </div>

        {/* Code Section 1  */}
        <div>
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className="text-4xl font-semibold">
                Unlock Your <Highlighted text={"coding potential"} /> with our
                Online Courses
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              btnText: "Try it Yourself",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              linkto: "/login",
              active: false,
            }}
            backgroundGradient={{
              from: "#8A2BE2",
              via: "#FFA500",
              to: "#F8F8FF",
            }}
            codeblock={`<!DOCTYPE html>
  <html>
  <head>
    <title>Example</title>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <h1><a href="/">Header</a></h1>
    <nav>
      <a href="one/">One</a>
      <a href="two/">Two</a>`}
            codecolor={"text-yellow-300"}
          />
        </div>

        {/* Code Section 2  */}
        <div>
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className="text-4xl font-semibold">
                Start <Highlighted text={"coding"} /> in seconds
              </div>
            }
            subheading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson.."
            }
            ctabtn1={{
              btnText: "Continue Lesson",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              linkto: "/login",
              active: false,
            }}
            backgroundGradient={{
              from: "#1FA2FF",
              via: "#12D8FA",
              to: "#A6FFCB",
            }}
            codeblock={`<!DOCTYPE html>
  <html>
  <head>
    <title>Example</title>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <h1><a href="/">Header</a></h1>
    <nav>
      <a href="one/">One</a>
      <a href="two/">Two</a>`}
            codecolor={"text-yellow-300"}
          />
        </div>

        <ExploreMore />
      </div>

      {/* Section 2 */}
      <section className="bg-pure-greys-5 text-richblack-700 w-screen ">
        <div className="homepage_bg h-[333px]">
          <div className="mx-auto w-11/12 max-w-[1260px] h-full flex flex-col items-center gap-6 px-4">
            <div className="h-[150px]"></div>
            <div className="flex flex-row gap-10 text-white lg:mt-10">
              <CTAButton active={true} linkto={"/courses"}>
                <div className="flex items-center gap-4">
                  Explore Full Catalog
                  <FaArrowRight />
                </div>
              </CTAButton>

              <CTAButton active={false} linkto={"/signup"}>
                Learn More
              </CTAButton>
            </div>
          </div>
        </div>

        <div className="mx-auto w-11/12 max-w-[1260px] h-full flex flex-col items-center justify-between gap-7">
          <div className="flex flex-row gap-5 mb-10 mt-[95px]">
            <div className="text-4xl font-semibold w-[45%] leading-[150%]">
              Get a skill you need for a
              <Highlighted text={"job that is in demand"} />
            </div>
            <div></div>
            <div className="flex flex-col gap-5 w-[40%] items-start">
              <div className="text-[16px] leading-7 mb-8">
                The modern CodeGyaani is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </div>
              <CTAButton active={true} linkto={"/signup"}>
                Learn More
              </CTAButton>
            </div>
          </div>
          <TimelineSection />
          <LearningLanguageSection />
        </div>
      </section>

      {/* Section 3 */}
      <section className="w-11/12 mx-auto max-w-[1260px] flex flex-col items-center justify-betwen gap-7 bg-richblack-900 text-white">
        <InstructorSection />
        <h2 className="text-center text-4xl font-semibold mt-10">
          Review from other learners
        </h2>
      </section>
      {/* Footer */}
    </div>
  );
}

export default Home;
