import React from "react";
import { Link } from "react-router-dom";

function CTAButton({ children, linkto, active }) {
  return (
    <Link to={linkto}>
      <div
        className={`text-center text-[16px] px-6 py-3 rounded-md font-medium
  ${
    active
      ? "bg-yellow-50 text-black shadow-[2px_2px_0px_0px_rgba(255,214,10,0.98)]"
      : "bg-richblack-800 shadow-[1px_2px_0px_0px_rgba(255,255,255,0.18)]"
  }
  transition-transform duration-200 hover:-translate-y-1
`}
      >
        {children}
      </div>
    </Link>
  );
}

export default CTAButton;
