import React from "react";
import { NavLink } from "react-router-dom";
import * as VscIcons from "react-icons/vsc";
import * as FaIcons from "react-icons/fa";

const SidebarLink = ({ link }) => {
    const Icon = VscIcons[link.icon] || FaIcons[link.icon];

    return (
        <NavLink
            to={link.path}
            className={({ isActive }) =>
                `relative px-1 py-1 flex items-center gap-2 rounded-lg ${
                    isActive ? "bg-richblack-700" : "hover:bg-richblack-700"
                }`
            }
        >
            {({ isActive }) => (
                <>
                    <span
                        className={`absolute left-0 top-0 h-full w-1 bg-yellow-500 rounded-tr-lg rounded-br-lg ${
                            isActive ? "block" : "hidden"
                        }`}
                    />
                    <div className="flex items-center gap-2">
                        {Icon && (
                            <Icon
                                className={`text-xl ${isActive ? "text-yellow-500" : "text-richblack-300"}`}
                            />
                        )}
                        <span className={isActive ? "text-yellow-50" : "text-richblack-100"}>
                            {link.name}
                        </span>
                    </div>
                </>
            )}
        </NavLink>
    );
};

export default SidebarLink;