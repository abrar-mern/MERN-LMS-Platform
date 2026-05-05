import React, { useState } from "react";
import { sidebarLinks } from "../../../data/dashboard-links";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../common/Spinner";
import SidebarLink from "./SidebarLink";
import { VscSignOut } from "react-icons/vsc";
import ConfirmationModal from "../../common/ConfirmationModal";
import { logout } from "../../../services/operations/authAPI";
import { useNavigate } from "react-router-dom";


const Sidebar = () => {
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile,
  );
  const { loading: authLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [confirmationModal, setConfirmationModal] = useState(null);
  const navigate = useNavigate();

  if (profileLoading || authLoading) {
    return <Spinner />;
  }

  if (!user) return null;

  return (
  <div className="flex h-full w-full flex-col gap-8 border-r border-richblack-700 bg-richblack-900/80 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur">
      <div className="flex flex-col gap-3">
        {sidebarLinks.map((link) => {
          if (link.type && user.accountType !== link.type) {
            return null;
          }
          return <SidebarLink link={link} key={link.id} />;
        })}
      </div>
      <div className="mt-auto w-full border-t border-richblack-700/80 pt-6">
        <div className="flex flex-col gap-3">
          <SidebarLink
            link={{
              name: "Settings",
              path: "/dashboard/settings",
              icon: "VscSettingsGear",
            }}
          />

          <button
             className="w-full rounded-lg px-1 py-2 text-left text-sm text-richblack-100 transition-colors duration-200 hover:bg-richblack-700/80"
            onClick={() =>
              setConfirmationModal({
                text1: `Are you sure ${user.firstName} ?`,
                text2: `You will be logged out of your account`,
                btntxt1: "Logout",
                btntxt2: "Cancel",
                btn1Handler: () => dispatch(logout(navigate)),
                btn2Handler: () => setConfirmationModal(null),
              })
            }
          >
            <div className="flex items-center gap-2">
              <VscSignOut className="text-xl text-richblack-300" />
              <span className="text-richblack-100 text-[16px]">Logout</span>
            </div>
          </button>
        </div>
      </div>
      {confirmationModal && (
        <ConfirmationModal modalData={confirmationModal} />
      )}
    </div>
  );
};

export default Sidebar;