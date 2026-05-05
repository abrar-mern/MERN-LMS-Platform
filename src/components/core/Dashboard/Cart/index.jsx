import React from 'react';
import { useSelector } from 'react-redux';
import RenderCartCourses from "./RenderCartCourses"
import RenderTotalAmount from "./RenderTotalAmount"


const Cart = () => {
    const { total, totalItems } = useSelector((state) => state.cart);
    return (
        <div className='w-full p-6 text-white'>
            <h1 className='text-3xl font-semibold mb-4'>
                Your Cart
            </h1>
            <p className= 'text-lg mb-6 text-richblack-300'>
                {totalItems} Courses in your cart
            </p>
            {
                total > 0 ? (
                    <div className='flex flex-col gap-6'>
                        <RenderCartCourses/>
                        <RenderTotalAmount />
                    </div>
                ) : (<p>Your Cart is empty</p>)
            }
        </div>
    )
}

export default Cart;