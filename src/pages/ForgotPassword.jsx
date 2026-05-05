import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getPasswordResetToken } from "../services/operations/authAPI";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [emailSent, setEmailSent] = useState(false);
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getPasswordResetToken(email, setEmailSent));
    };

    return (
        <div className='grid min-h-[calc(100vh-3.5rem)] place-items-center'>
            <div className='max-w-[500px] p-4 lg:p-8'>
                <h1 className='text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5'>
                    {!emailSent ? "Reset Your Password" : "Check Your Email"}
                </h1>
                
                {!emailSent ? (
                    <>
                        <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
                            Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery
                        </p>
                        
                        <form onSubmit={handleSubmit} className="mt-6">
                            <label htmlFor="email" className='w-full'>
                                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                                    Email Address <sup className="text-pink-200">*</sup>
                                </p>
                                <input 
                                    required 
                                    type="email" 
                                    name="email" 
                                    id="email"
                                    placeholder="Enter email address" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 border-b-[1px] border-richblack-700 focus:outline-none focus:border-yellow-50" 
                                />
                            </label>
                            
                            <button 
                                type="submit"
                                className='mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900 hover:bg-yellow-100 transition-all duration-200'
                                disabled={loading}
                            >
                                {loading ? "Sending..." : "Reset Password"}
                            </button>
                        </form>
                    </>
                ) : (
                    <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
                        We have sent the reset email to {email}
                    </p>
                )}
                
                <div className="mt-6 flex items-center justify-between">
                    <a href="/login" className="flex items-center gap-x-2 text-richblack-5 hover:text-richblack-25">
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                            <path fill="none" d="M0 0h24v24H0z"></path>
                            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
                        </svg>
                        Back to Login
                    </a>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword;