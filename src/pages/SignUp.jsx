import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendOtp } from "../services/operations/authAPI";
import { setSignupData } from "../redux/slice/authSlice";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import signup from "../assets/Images/signup.webp"
import bgsignup from "../assets/Images/frame.png"

const SignUp = () => {
  const [accountType, setAccountType] = useState("Student");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const payload = { ...formData, accountType };
    dispatch(setSignupData(payload));
    dispatch(sendOtp(formData.email, navigate));
  };

  return (
    <div className="w-full grid min-h-[calc(100vh-3.5rem)] place-items-center bg-richblack-900">
      <div className="mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-between gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12">
        {/* Form Section */}
        <div className="mx-auto w-full max-w-[450px] md:mx-0">
          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
            Join the millions learning to code with Codegyaani for free
          </h1>
          <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
            <span className="text-richblack-100">
              Build skills for today, tomorrow, and beyond.{" "}
            </span>
            <span className="font-edu-sa font-bold italic text-blue-100">
              Education to future-proof your career.
            </span>
          </p>

          {/* Student/Instructor Toggle */}
          <div
            className="flex bg-richblack-800 p-1 gap-x-1 my-6 rounded-full max-w-max"
            style={{
              boxShadow: "rgba(255, 255, 255, 0.18) 0px -1px 0px inset",
            }}
          >
            <button
              onClick={() => setAccountType("Student")}
              className={`${
                accountType === "Student"
                  ? "bg-richblack-900 text-richblack-5"
                  : "bg-transparent text-richblack-200"
              } py-2 px-5 rounded-full transition-all duration-200`}
            >
              Student
            </button>
            <button
              onClick={() => setAccountType("Instructor")}
              className={`${
                accountType === "Instructor"
                  ? "bg-richblack-900 text-richblack-5"
                  : "bg-transparent text-richblack-200"
              } py-2 px-5 rounded-full transition-all duration-200`}
            >
              Instructor
            </button>
          </div>

          <form
            onSubmit={handleOnSubmit}
            className="flex w-full flex-col gap-y-4"
          >
            {/* First and Last Name */}
            <div className="flex gap-x-4">
              <label className="w-full">
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                  First Name
                  <sup className="text-pink-200">*</sup>
                </p>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleOnChange}
                  required
                  placeholder="Enter First Name"
                  className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 border-b-[1px] border-richblack-700 focus:outline-none focus:border-yellow-50"
                />
              </label>

              <label className="w-full">
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                  Last Name
                  <sup className="text-pink-200">*</sup>
                </p>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleOnChange}
                  required
                  placeholder="Enter Last Name"
                  className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 border-b-[1px] border-richblack-700 focus:outline-none focus:border-yellow-50"
                />
              </label>
            </div>

            {/* Email */}
            <label className="w-full">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Email Address <sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleOnChange}
                placeholder="Enter email address"
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 border-b-[1px] border-richblack-700 focus:outline-none focus:border-yellow-50"
              />
            </label>

            {/* Password and Confirm Password */}
            <div className="flex gap-x-4">
              <label className="relative w-full">
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                  Create Password <sup className="text-pink-200">*</sup>
                </p>
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleOnChange}
                  placeholder="Enter Password"
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
              </label>

              <label className="relative w-full">
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                  Confirm Password <sup className="text-pink-200">*</sup>
                </p>
                <input
                  required
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleOnChange}
                  placeholder="Confirm Password"
                  className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5 border-b-[1px] border-richblack-700 focus:outline-none focus:border-yellow-50"
                />
                <span
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                >
                  {showConfirmPassword ? (
                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                  ) : (
                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                  )}
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900 hover:bg-yellow-100 transition-all duration-200"
            >
              Create Account
            </button>
          </form>
        </div>

        {/* Image Section */}
        <div className="relative mx-auto w-full max-w-[450px] md:mx-0 flex justify-center">
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
            src={signup}
            alt="Students"
            className="absolute -top-4 right-4 z-10"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
