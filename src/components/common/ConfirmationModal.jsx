import React from "react";
import { createPortal } from "react-dom";
import { VscChromeClose, VscSignOut } from "react-icons/vsc";

const ConfirmationModal = ({ modalData }) => {
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-richblack-900/70 px-4">
      <div className="relative w-full max-w-lg rounded-xl border border-richblack-700 bg-richblack-900 p-6 shadow-xl">
        {/* Close icon */}
        <button
          className="absolute top-4 right-4 rounded-md border border-richblack-700 p-2 text-richblack-300 transition-colors duration-200 hover:text-richblack-100"
          onClick={modalData?.btn2Handler}
        >
          <VscChromeClose />
        </button>
        <p className="text-lg font-semibold text-richblack-5">{modalData.text1}</p>
        <p className="mb-6 text-richblack-300">{modalData.text2}</p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            className="rounded-md bg-red-500 px-4 py-2 text-white transition-colors duration-200 hover:bg-red-600"
            onClick={modalData?.btn1Handler}
          >
            {modalData?.btn1Text || modalData?.btntxt1 || "Confirm"}
          </button>
          <button
            className="flex items-center justify-center gap-2 rounded-md px-4 py-2 font-semibold transition-all duration-200 bg-yellow-50 text-richblack-900 shadow-[2px_2px_0px_0px_rgba(255,214,10,0.98)] hover:scale-[1.01] "
            onClick={modalData?.btn2Handler}
          >
            {modalData?.btn2Text || modalData?.btntxt2 || "Cancel"}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ConfirmationModal;
