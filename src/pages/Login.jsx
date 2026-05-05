import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login as loginUser } from "../services/operations/authAPI";
import login from "../assets/Images/login.webp";
import bgsignup from "../assets/Images/frame.png";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password, navigate));
  };

  return (
    <div className="w-full grid min-h-[calc(100vh-3.5rem)] place-items-center bg-richblack-900">
      <div className="mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-between gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12">
        <div className="mx-auto w-full max-w-[450px] md:mx-0">
          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
            Welcome Back
          </h1>
          <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
            <span className="text-richblack-100">
              Build skills for today, tomorrow, and beyond.
            </span>
            <br />
            <span className="font-edu-sa font-bold italic text-blue-100">
              Education to future-proof your career.
            </span>
          </p>
          <form
            onSubmit={handleSubmit}
            className="mt-6 flex w-full flex-col gap-y-4"
          >
            <label htmlFor="email" className="w-full">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Email Address
                <sup className="text-pink-200">*</sup>
              </p>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter Your Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 border-b-[1px] border-richblack-700 focus:outline-none focus:border-yellow-50"
              />
            </label>

            <label htmlFor="password" className="relative">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Password
                <sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5 border-b-[1px] border-richblack-700 focus:outline-none focus:border-yellow-50"
              />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                  ) : (
                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                  )}
                </span>
              
              <div className="flex justify-end mt-1">
                <Link to="/forgot-password">
                  <p className="max-w-max text-xs text-blue-100 hover:underline">
                    Forgot Password
                  </p>
                </Link>
              </div>
            </label>
            <button
              type="submit"
              className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
            >
              Sign In
            </button>
          </form>
        </div>

        <div className="relative mx-auto w-full max-w-[450px] md:mx-0 flex items-center justify-center">
          <img
            width={450}
            height={400}
            loading="lazy"
            src={bgsignup}
            alt="Pattern Background"
            className="object-contain"
          />
          <img
            width={450}
            height={400}
            loading="lazy"
            src={login}
            alt="Students"
            className="absolute -top-4 right-4 z-10 object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
