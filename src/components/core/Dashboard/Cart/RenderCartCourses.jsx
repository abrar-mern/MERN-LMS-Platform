import React from 'react';
import { useSelector } from 'react-redux';
import ReactStars from 'react-stars';
import {useDispatch} from 'react-redux';
import { removeCart } from "../../../../redux/slice/cartSlice"
import { RiDeleteBin6Line } from 'react-icons/ri';

const RenderCartCourses = () => {
    const {cart} = useSelector((state) => state.cart);
    const dispatch = useDispatch(); 
    return (
        <div className='w-full'>
            {
                cart.map((course, index) => (
                    <div key = {index} className= 'flex flex-row items-center gap-x-4 border border-richblack-700 rounded-lg p-4 mb-4'>
                        <div className='w-24 h-16'>
                            <img src = {course.thumbnail} alt = {course.name} className='w-full h-full object-cover rounded-md'/>
                            <div className='flex flex-col gap-y-1 mt-2'>
                                <h3 className='text-lg font-semibold text-richblack-5'>
                                    {course?.name}
                                </h3>
                                <p className='text-sm text-richblack-300'>
                                    {course?.category?.name}
                                </p>
                                <div className='flex flex-row items-center gap-x-2'>
                                    {/* Get Average Rating */}
                                    <p className= 'text-sm text-yellow-25'>
                                        {course?.averageRating ? course.averageRating.toFixed(1) : "No ratings yet"}
                                    </p>
                                    {/* Stars */}
                                    <div className= 'flex flex-row gap-1'>
                                        <ReactStars
                                            className= 'text-yellow-25'
                                            count={5}
                                            value={course?.averageRating || 0}
                                            size={24}
                                            color2={'#ffd700'}
                                            edit={false}
                                            emptyIcon={<i className="far fa-star"></i>}
                                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                                            fullIcon={<i className="fa fa-star"></i>}
                                        />
                                    </div>
                                    <span className='text-sm text-richblack-300'>
                                        {
                                            course?.ratingsandReviews?.length > 0 ? `(${course.ratingsandReviews.length} ratings)` : "(0 ratings)"
                                        }
                                    </span>

                                </div>

                            </div>
                        </div>
                        <button onClick={() => dispatch(removeCart (course._id))}
                        className= 'flex flex-row items-center gap-x-2 text-red-500 hover:text-red-700 transition-all duration-200'>
                            <RiDeleteBin6Line className="text-red-500" />
                            <span className='text-sm'>
                                Remove
                            </span>
                        </button>
                        <p className='ml-auto'>
                            <span className='text-lg font-semibold text-richblack-5'>
                                ₹{course.price}
                            </span>
                        </p>
                    </div>
                ))
            }
        </div>
    )
}

export default RenderCartCourses;   