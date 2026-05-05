import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../common/IconBtn";

const MyProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  return (
    <div className="w-full h-full p-6 flex flex-col gap-6">
      <h1 className="text-3xl font-semibold text-richblack-5">My Profile</h1>

      {/* Section1 */}
      <div className="flex items-center justify-between border border-richblack-700 p-4 rounded-lg">
        <div className="flex items-center gap-4">
          <img
            src={user?.image}
            alt={user?.firstName}
            className="h-16 w-16 rounded-full object-cover border border-richblack-600"
          />
          <div className="flex flex-col">
            <p className="text-4xl font-semibold text-richblack-5">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-richblack-300 text-sm "> {user?.email}</p>
          </div>
        </div>
        <IconBtn text="Edit" onclick={() => navigate("/dashboard/settings")} />
      </div>

      {/* Section2 */}
      <div className="border border-2 border-richblack-700 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <p className="text-richblack-5">About</p>
          <IconBtn
            text="Edit"
            onclick={() => navigate("/dashboard/settings")}
          />

          <div className="ml-4 text-richblack-300 text-sm border border-richblack-700 p-4 rounded-lg max-w-lg"> 
            <p className="text-richblack-300 text-sm">
              {user?.additionalDetails.about ||
                "Write something about yourself.."}
            </p>
          </div>
        </div>
      </div>

      {/* Section3 */}
      <div className="border border-2 border-richblack-700 p-4 rounded-lg flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <p className="text-richblack-5">Personal Details</p>
          <IconBtn
            text="Edit"
            onclick={() => navigate("/dashboard/settings")}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-2 text-richblack-300 text-sm border border-richblack-700 p-4 rounded-lg">
            <p className="text-richblack-5 font-semibold">First Name</p>
            <p className="text-richblack-300 text-sm">{user?.firstName}</p>
          </div>
          <div className="flex flex-col gap-2 text-richblack-300 text-sm border border-richblack-700 p-4 rounded-lg">
            <p className="text-richblack-5 font-semibold">Last Name</p>
            <p className="text-richblack-300 text-sm">{user?.lastName}</p>
          </div>
          <div className="flex flex-col gap-2 text-richblack-300 text-sm border border-richblack-700 p-4 rounded-lg">
            <p className="text-richblack-5 font-semibold">Email</p>
            <p className="text-richblack-300 text-sm">{user?.email}</p>
          </div>
          <div className="flex flex-col gap-2 text-richblack-300 text-sm border border-richblack-700 p-4 rounded-lg">
            <p className="text-richblack-5 font-semibold">Phone Number</p>
            <p className="text-richblack-300 text-sm">
              {user?.additionalDetails.phoneNumber || "Not Specified"}
            </p>
          </div>
          <div className="flex flex-col gap-2 text-richblack-300 text-sm border border-richblack-700 p-4 rounded-lg">
            <p className="text-richblack-5 font-semibold">Gender</p>
            <p className="text-richblack-300 text-sm">
              {user?.additionalDetails.gender || "Not Specified"}
            </p>
          </div>
          <div className="flex flex-col gap-2 text-richblack-300 text-sm border border-richblack-700 p-4 rounded-lg">
            <p className="text-richblack-5 font-semibold">Date of Birth</p>
            <p className="text-richblack-300 text-sm">
              {user?.additionalDetails.dateOfBirth || "Not Specified"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
