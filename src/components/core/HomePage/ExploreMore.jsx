import react, { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import Highlighted from "./HighlightedText";
import CourseCard from "./CourseCard";

const tabs = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths",
];

const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(tabs[0]);
  const [coursesData, setCoursesData] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  );

  const setCards = (value) => {
    setCurrentTab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    setCoursesData(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
  };
  
  return (
    <div className="w-full">
      <div className="text-4xl font-sembold text-center">
        Unlock the
        <Highlighted text={"Power of Code"} />
      </div>

      <p className="text-center text-richblack-300 text-sm text-[16px] mt-3">
        Learn to build anything you can imagine with our extensive library of
        coding courses.
      </p>

      <div className="hidden lg:flex gap-5 -mt-5 mx-auto w-max bg-richblack-800 text-richblack-200 p-1 rounded-full font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] mb-5 mt-5">
        {/* Tabs Section */}
        {tabs.map((element, index) => {
          return (
            <div
              className={`text-[16px] flex flex-row items-center gap-2
                    ${
                      currentTab === element
                        ? "bg-richblack-900 text-richblack-5 font-medium"
                        : "text-richblack-200"
                    } px-7 py-[7px] rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5`}
              key={index}
              onClick={() => setCards(element)}
            >
              {element}
            </div>
          );
        })}
      </div>
      <div className="lg:h-[150px]">
        {/* Course Card ka group */}

        <div className="flex flex-row absolute gap-10 justify-between w-full mb-10 ">
          {coursesData.map((element, index) => {
            return (
              <CourseCard   
                key={index}
                cardData={element}
                currentCard={currentCard}
                setCurrentCard={setCurrentCard}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ExploreMore;
