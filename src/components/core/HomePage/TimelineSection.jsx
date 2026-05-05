import react from 'react';
import TimelineData from './Timelinedata';
import TimelineImage from '../../../assets/Images/TimelineImage.png';

function TimelineSection() {
    return(
        <div className='w-full'>
            <div className='flex flex-row gap-5  mb-20 mt-10'>
                <div className='w-[45%] flex flex-col justify-center gap-5'>
                    {
                        TimelineData.map((element, index) => {
                            return(
                                <div className='flex flex-col' key={index}>
                                    <div className='flex flex-row gap-6 items-center'>
                                        <div className='w-[50px] h-[50px] bg-white flex items-center justify-center rounded-full overflow-hidden'>
                                            <img src = {element.image}
                                            className=''
                                            />
                                        </div>
                                        <div>
                                            <h2 className='font-semibold text-[18px] '>
                                                {element.title}
                                            </h2>
                                            <p className='text-base '>
                                                {element.description}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    {/* Line Connector */}
                                    {index !== TimelineData.length - 1 && (
                                        <div className='w-[2px] h-[50px] border-l-2 border-dashed border-[#AFB2BF] ml-[24px]'></div>
                                    )}
                                </div>
                            )
                        })
                    }
                </div>

               

                {/* Right Side Image */}
                <div className='w-[55%] relative shadow-blue-200 '>
                    <img src={TimelineImage} alt="Timeline Image" 
                    className='shadow-lg object-cover'
                    />
                    <div className='absolute bg-caribbeangreen-700  flex flex-row text-white uppercase py-[3.3rem] px-6 gap-10
                    left-1/2 -translate-x-1/2 bottom-[-12%] rounded-md w-[90%] justify-center items-center
                    '>
                      <div className='flex flex-row gap-5 items-center border-r border-caribbeangreen-300 px-7'>
                        <p className='text-3xl font-bold'>10</p>
                        <p className='text-caribbeangreen-300 text-sm'>Years of Experience</p>
                      </div>
                      <div className='flex gap-5 items-center px-7'>
                         <p className='text-3xl font-bold'>250</p>
                        <p className='text-caribbeangreen-300 text-sm'>Type of Courses</p>
                      </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default TimelineSection;