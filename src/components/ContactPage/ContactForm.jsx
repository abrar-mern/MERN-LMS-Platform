import React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import countryCode from "../../data/countrycode.json";

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitSuccessful },
  } = useForm({ mode: "onChange" });

  const submitContactForm = async (data) => {
    console.log("Form Data:", data);
    try {
      setLoading(true);
      const response = { status: 200 }; // Mocking a sucessful response
      if (response.status === 200) {
        console.log("Form submitted successfully");
      }
      setLoading(false);
    } catch (err) {
      console.log("Error Submitting Form:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstName: "",
        lastName: "",
        message: "",
      });
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <form onSubmit={handleSubmit(submitContactForm)}>
      <div className="flex flex-col gap-10 mb-4 w-full">
        {/* First Name */}
        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="flex flex-col gap-2 flex-1">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="Enter Your First Name"
            className="rounded-md border border-richblack-700 bg-richblack-800 px-3 py-2 text-richblack-5 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] focus:outline-none focus:ring-2 focus:ring-yellow-50"
            {...register("firstName", { required: "First Name is required" })}
          />
          {errors.firstName && <span>{errors.firstName.message}</span>}
        </div>
        {/* Last Name */}
          <div className="flex flex-col gap-2 flex-1">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Enter Your Last Name"
            className="rounded-md border border-richblack-700 bg-richblack-800 px-3 py-2 text-richblack-5 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] focus:outline-none focus:ring-2 focus:ring-yellow-50"
            {...register("lastName")}
          />
        </div>
        </div>
        {/*Email */}
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter Your Email Address"
            className="rounded-md border border-richblack-700 bg-richblack-800 px-3 py-2 text-richblack-5 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] focus:outline-none focus:ring-2 focus:ring-yellow-50"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        {/* Phone number */}
        <div className="flex flex-col gap-2">
          <label htmlFor="mobile">Phone Number</label>
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Country Code */}
            <select
              id="countryCode"
              className="w-full sm:w-[140px] rounded-md border border-richblack-700 bg-richblack-800 px-3 py-2 text-richblack-5 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] focus:outline-none focus:ring-2 focus:ring-yellow-50"
              {...register("countryCode")}
            >
              {countryCode.map((element, index) => (
                <option key={index} value={element.code} className="text-richblack-900">
                  {element.code} {element.country}
                </option>
              ))}
            </select>
            <input
              type="tel"
              name="mobile"
              id="mobile"
              placeholder="Enter Your Mobile Number"
              className="flex-1 w-full rounded-md border border-richblack-700 bg-richblack-800 px-3 py-2 text-richblack-5 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] focus:outline-none focus:ring-2 focus:ring-yellow-50"
              {...register("mobile", {
                required: "Mobile Number is required",
                maxLength: { value: 10, message: "Mobile Number cannot exceed 10 digits" },
                minLength: { value: 10, message: "Mobile Number should be at least 10 digits" },
              })}
            />
          </div>
          {errors.mobile && <span>{errors.mobile.message}</span>}
        </div>
        {/* Message */}
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="message">Message</label>
          <textarea
            name="message"
            id="message"
            cols="30"
            rows="5"
            placeholder="Enter Your Message here"
            className="rounded-md border border-richblack-700 bg-richblack-800 px-3 py-2 text-richblack-5 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] focus:outline-none focus:ring-2 focus:ring-yellow-50"
            {...register("message", { required: "Message is required" })}
          />
        </div>
        {/*Button */}
        <div className="mt-4">
          <button
            type="submit"
            className="bg-yellow-50 text-richblack-900 px-6 py-3 rounded-md font-semibold shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] hover:shadow-none hover:scale-95 transition-all duration-200"
            disabled={!isValid || loading}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
