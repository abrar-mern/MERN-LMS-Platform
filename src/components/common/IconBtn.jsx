import React from "react";

const IconBtn = ({
    text,
    onClick,
    children,
    disabled = false,
    outline = false,
    type = "button",
    className = "",
}) => {
    const baseClasses =
        "flex items-center justify-center gap-2 rounded-md px-4 py-2 font-semibold transition-all duration-200";
    const variantClasses = outline
        ? "border border-yellow-50 text-yellow-50 hover:bg-yellow-50/10"
        : "bg-yellow-50 text-richblack-900 shadow-[2px_2px_0px_0px_rgba(255,214,10,0.98)]";
    const stateClasses = disabled
        ? "cursor-not-allowed opacity-60"
        : "hover:scale-[1.01]";

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseClasses} ${variantClasses} ${stateClasses} ${className}`}
        >
            {children && <span className="text-lg">{children}</span>}
            {text && <span>{text}</span>}
        </button>
    );
};

export default IconBtn;