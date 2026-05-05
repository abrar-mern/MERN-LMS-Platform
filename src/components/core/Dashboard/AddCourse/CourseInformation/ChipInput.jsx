import React, { useEffect, useState } from "react";

const ChipInput = ({ label, name, register, errors, setValue, getValues }) => {
    const [inputValue, setInputValue] = useState("");
    const [chips, setChips] = useState([]);

    useEffect(() => {
        register(name, { required: "true" });
        const existing = getValues(name);
        if (existing) {
            const list = Array.isArray(existing)
                ? existing
                : String(existing).split(" ,").filter(Boolean);
            setChips(list);
        }
    }, [getValues, name, register]);

    useEffect(() => {
        setValue(name, chips, { shouldValidate: false });
    }, [chips, name, setValue]);

    const handleAddChip = () => {
        const value = inputValue.trim();
        if (!value) return;
        setChips((prev) => [...prev, value]);
        setInputValue("");
    };

    const handleRemoveChip = (index) => {
        setChips((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
            <label
                htmlFor={name}
                className="text-sm font-medium text-richblack-5 md:w-1/4"
            >
                {label}
                <sup className="text-pink-200 ml-1 text-sm font-medium">*</sup>
            </label>
            <div className="flex w-full flex-col gap-3 md:w-3/4">
                <div className="flex flex-col gap-2 sm:flex-row">
  <input
    id={name}
    type="text"
    value={inputValue}
    onChange={(event) => setInputValue(event.target.value)}
    placeholder="Add a tag"
    className="flex-1 rounded-md bg-richblack-800 p-3 text-richblack-5 border border-richblack-700 focus:outline-none focus:border-yellow-50 text-sm"
  />

  <button
    type="button"
    onClick={handleAddChip}
    className="bg-yellow-50 text-richblack-900 px-4 py-2 rounded-md text-sm font-medium hover:bg-yellow-100 transition-all duration-200"
  >
    Add
  </button>
</div>

                {chips.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {chips.map((chip, index) => (
                            <span
                                key={`${chip}-${index}`}
                                className="flex items-center gap-2 rounded-full border border-richblack-600 bg-richblack-700 px-3 py-1 text-xs text-richblack-5"
                            >
                                {chip}
                                <button
                                    type="button"
                                    onClick={() => handleRemoveChip(index)}
                                    className="text-pink-200 hover:text-pink-100"
                                >
                                    ✕
                                </button>
                            </span>
                        ))}
                    </div>
                )}
                {errors?.[name] && (
                    <span className="text-pink-200 text-sm">{label} is required</span>
                )}
            </div>
        </div>
    );
};

export default ChipInput;

