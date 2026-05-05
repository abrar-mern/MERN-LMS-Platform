import React from "react";
import {LearningGridArray} from "../../../data/learninggrid"
import CTAButton from "../HomePage/CTAButton"
import Highlighted from "../HomePage/HighlightedText"

const LearningGrid = () => {
  return(
    <div className="grid mx-auto max-w-[1200px] grid-cols-1 xl:grid-cols-4 mb-12 px-4">
      {
        LearningGridArray.map((card, index) => (
          <div
            key={index}
            className={`${card.order === -1 ? "lg:col-span-2" : ""} ${card.order === 3 ? "lg:col-start-2" : ""} ${card.order % 2 === 1 ? "bg-richblack-700" : "bg-richblack-800"} xl:h-[294px] flex flex-col justify-between text-left p-8 border border-richblack-700 hover:border-yellow-25 rounded-none mb-4 xl:mb-0`}
          >
            {
              card.order < 0 ? (
                <div className="xl:w-[90%]">
                  <h2 className="text-4xl font-semibold text-white">
                    {card.heading} {card.highlightText && <Highlighted text={card.highlightText} />}
                  </h2>
                  <p className="mt-4 text-richblack-300">{card.description}</p>
                  <div className="mt-6">
                    <CTAButton active={true} linkto={card.buttonLink || card.BtnLink}>
                      {card.BtnText || 'Learn More'}
                    </CTAButton>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="text-lg font-semibold text-richblack-5">{card.heading}</h3>
                  <p className="mt-3 text-richblack-300">{card.description}</p>
                </div>
              )
            }
          </div>
        ))
      }
    </div>
  )
}

export default LearningGrid;