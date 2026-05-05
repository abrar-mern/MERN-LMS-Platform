// import React from "react";
// import { useSelector } from "react-redux";

// const MyProfile = () => {
//   const { user } = useSelector((state) => state.profile);

//   if (!user) {
//     return (
//       <div className="w-full min-h-[calc(100vh-3.5rem)] flex items-center justify-center text-richblack-5">
//         <p className="text-richblack-200">No profile data found. Please log in again.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full min-h-[calc(100vh-3.5rem)] bg-richblack-900 text-richblack-5 px-6 py-10">
//       <div className="mx-auto w-full max-w-[900px]">
//         <h1 className="text-3xl font-semibold">My Profile</h1>
//         <div className="mt-6 flex flex-col gap-6 rounded-lg border border-richblack-700 bg-richblack-800 p-6">
//           <div className="flex items-center gap-4">
//             <img
//               src={user.image}
//               alt={`${user.firstName || "User"} avatar`}
//               className="h-16 w-16 rounded-full object-cover border border-richblack-600"
//             />
//             <div>
//               <p className="text-xl font-medium">
//                 {user.firstName} {user.lastName}
//               </p>
//               <p className="text-richblack-300">{user.email}</p>
//               {user.accountType && (
//                 <p className="text-richblack-300">{user.accountType}</p>
//               )}
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="rounded-md border border-richblack-700 p-4">
//               <p className="text-sm text-richblack-400">User ID</p>
//               <p className="text-richblack-5 break-all">{user._id}</p>
//             </div>
//             <div className="rounded-md border border-richblack-700 p-4">
//               <p className="text-sm text-richblack-400">Email</p>
//               <p className="text-richblack-5 break-all">{user.email}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyProfile;

import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Spinner from "../../components/common/Spinner";
import Sidebar from "../../components/core/Dashboard/Sidebar";


const MyProfile = () => {
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { loading: profileLoading, user } = useSelector((state) => state.profile);



  if (authLoading || profileLoading) {
    return <Spinner />;
  }

  if (!user) {
    return (
      <div className="h-[calc(100vh-3.5rem)] bg-richblack-900 flex items-center justify-center">
        <p className="text-richblack-200">No profile data found. Please log in again.</p>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-3.5rem)] bg-richblack-900 text-richblack-5 w-full overflow-hidden">
      <div className="flex h-full w-full gap-6 min-h-0">
        <aside className="h-full w-full max-w-[220px] min-h-0">
          <Sidebar />
        </aside>
        <main className="flex-1 h-full min-h-0 overflow-y-auto overscroll-contain bg-richblack-900">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MyProfile;