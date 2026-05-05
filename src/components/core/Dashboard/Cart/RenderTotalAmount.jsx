import React from 'react';
import { useSelector } from 'react-redux';
import IconBtn from "../../../common/IconBtn"


const RenderTotalAmount = () => {
    const { cart, total } = useSelector((state) => state.cart);
    const handleBuyCourse= () => {
        const courses = cart.map((course) => course._id);
        console.log(courses);
    }
    return (
        <div className='text-lg font-semibold text-richblack-5'>
            <p>
                Total Amount
            </p>
            <p>
                ₹ {total}
            </p>
            <IconBtn 
                text = "Proceed to Pay"
                onclick = {handleBuyCourse}
                className = "bg-yellow-50 text-black shadow-[2px_2px_0px_0px_rgba(255,214,10,0.98)] w-full mt-4"
            />
        </div>
    )
}

export default RenderTotalAmount