import React, { useEffect, useState } from "react";

const RequirementField = ({
  name,
  label,
  register,
  setValue,
  getValues,
  errors,
}) => {
  const [requirement, setRequirement] = useState("");
  const [requirementList, setRequirementList] = useState([]);

  useEffect(() => {
    register(name, {
      required: true,
      validate: (value) => value.length > 0,
    });

    const existing = getValues(name);
    if (existing?.length) {
      setRequirementList(existing);
    }
  }, [getValues, name, register]);

  useEffect(() => {
    setValue(name, requirementList, { shouldValidate: false });
  }, [name, requirementList, setValue]);

  const handleAddRequirement = () => {
    if (requirement.trim() !== "") {
      setRequirementList([...requirementList, requirement.trim()]);
      setRequirement("");
    }
  };
  const handleRemoveRequirement = (index) => {
    const updatedList = requirementList.filter((value, i) => i !== index);
    setRequirementList(updatedList);
  };
  

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
      <label
        htmlFor={name}
        className="text-sm font-medium text-richblack-5 md:w-1/4"
      >
        {label}
        <sup className="text-pink-200 ml-1 text-wsm font-medium">*</sup>
      </label>
      <div className="flex w-full flex-col gap-3 md:w-3/4">
        <input type="hidden" name={name} />
        <div className="relative">
          <input
            type="text"
            value={requirement}
            className="rounded-md bg-richblack-800 p-3 text-richblack-5 border border-richblack-700 focus:outline-none focus:border-yellow-50 md:w-3/4 text-sm w-full"
            onChange={(e) => setRequirement(e.target.value)}
            placeholder="Enter Requirement"
          />
          <button
            type="button"
            className="absolute right-2 top-1/2 bg-yellow-50 text-richblack-900 px-3 py-1 rounded-md text-sm font-medium hover:bg-yellow-100 transition-all duration-200"
            onClick={handleAddRequirement}
          >
            Add
          </button>
        </div>
        {requirementList.length > 0 && (
          <ul className="flex flex-col gap-2 rounded-md border border-richblack-700 bg-richblack-900 p-3 text-richblack-5 text-sm">
            {requirementList.map((requirement, index) => (
              <li key={index} className="flex items-center justify-between">
                <span>{requirement}</span>
                <button
                  type="button"
                  className="bg-red-500 text-white px-2 py-1 rounded-md text-xs font-medium hover:bg-red-600 transition-all duration-200"
                  onClick={() => handleRemoveRequirement(index)}
                >
                  Clear
                </button>
              </li>
            ))}
          </ul>
        )}
        {errors?.[name] && (
          <span className="text-pink-200 text-sm">{label} is required</span>
        )}
      </div>
    </div>
  );
};

export default RequirementField;
