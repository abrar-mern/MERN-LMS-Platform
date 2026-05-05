import react from 'react';
import Highlight from './HighlightedText'
import knowYourProgress from '../../../assets/Images/Know_your_progress.png'
import compareWithOthers from '../../../assets/Images/Compare_with_others.png'
import planYourLesson from '../../../assets/Images/Plan_your_lessons.png'
import CTAbutton from './CTAButton'

function LearningLanguageSection() {
    return(
        <div className='mt-[100px] mb-20'>
            <div className='flex flex-col gap-5 items-center'>
                <div className='text-4xl font-semibold text-center'>
                    Your swiss knife for 
                    <Highlight text="learning any language" />
                </div>
                <div className='text-center text-richblack-600 mx-auto text-base mt-3 font-medium w-[70%]'>
                    Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
                </div>
                <div className='flex flex-row items-center justify-center mt-5'>
                    <img src={knowYourProgress} alt="Know Your Progress" className='object-contain -mr-32' />
                    <img src={compareWithOthers} alt="Compare With Others" className='object-contain' />
                    <img src={planYourLesson} alt="Plan Your Lesson" className='object-contain -ml-36' />
                </div>

                <div className='flex flex-start '>
                    <CTAbutton active={true} linkto={"/signup"}>Learn More</CTAbutton>
                </div>
            </div>
        </div>
    )
}

export default LearningLanguageSection;