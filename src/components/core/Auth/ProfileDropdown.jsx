import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { VscSignOut } from "react-icons/vsc";
import { logout } from "../../../services/operations/authAPI";

const ProfileDropdown = () => {
    const { user } = useSelector((state) => state.profile);
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (!user) return null;

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className="flex items-center gap-2"
            >
                <img
                    src={user.image}
                    alt={`${user.firstName || "User"} avatar`}
                    className="h-8 w-8 rounded-full object-cover border border-richblack-600"
                />
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-48 rounded-md bg-richblack-800 border border-richblack-700 shadow-lg z-50">
                    <Link
                        to="/dashboard/my-profile"
                        className="block px-4 py-2 text-richblack-25 hover:bg-richblack-700"
                        onClick={() => setOpen(false)}
                    >
                        My Profile
                    </Link>
                    <button
                        type="button"
                        onClick={() => dispatch(logout(navigate))}
                        className="flex w-full items-center gap-2 px-4 py-2 text-richblack-25 hover:bg-richblack-700"
                    >
                        <VscSignOut />
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfileDropdown; 