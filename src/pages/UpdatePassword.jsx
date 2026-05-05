import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { resetPassword } from "../services/operations/authAPI";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const UpdatePassword = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState("");
  const dispatch = useDispatch();
  const { token } = useParams();

  const passwordChecks = (password) => {
    return {
      length: password.length >= 8,
      upper: /[A-Z]/.test(password),
      lower: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
  };

  const validate = () => {
    const errs = {};
    const { password, confirmPassword } = formData;

    if (!password) {
      errs.password = "New password is required.";
    } else {
      const checks = passwordChecks(password);
      const failed = Object.entries(checks)
        .filter(([, v]) => !v)
        .map(([k]) => k);
      if (failed.length > 0) {
        errs.password =
          "Password must be at least 8 characters and include uppercase, lowercase, number and special character.";
      }
    }

    if (!confirmPassword) {
      errs.confirmPassword = "Please confirm your password.";
    } else if (password !== confirmPassword) {
      errs.confirmPassword = "Passwords do not match.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess("");
    if (validate()) {
      dispatch(resetPassword(formData.password, formData.confirmPassword, token));
      setSuccess("Password updated successfully.");
      setFormData({ password: "", confirmPassword: "" });
      setErrors({});
    }
  };

  const checks = passwordChecks(formData.password);

  return (
    <div className="flex justify-center items-center min-h-screen bg-richblack-900 p-4">
      <div className="w-full max-w-md p-8 bg-richblack-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-white mb-4">Update Password</h2>
        <p className="text-richblack-300 mb-6">
          Almost done. Enter your new password and you're all set.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-richblack-5">
              New Password <sup className="text-pink-200">*</sup>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter Your Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 rounded-md bg-richblack-900 text-white border border-richblack-700 focus:outline-none focus:border-yellow-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-3 text-richblack-300"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
            </div>
            {errors.password && <p className="text-pink-200 text-sm">{errors.password}</p>}

            <div className="mt-2 grid grid-cols-1 gap-1 text-sm">
              <p className="text-richblack-300">Password must include:</p>
              <div className="ml-2 flex flex-col gap-2">
                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    readOnly
                    checked={!!checks.length}
                    className="w-4 h-4 rounded-sm bg-transparent border border-richblack-700 text-green-400"
                    aria-checked={!!checks.length}
                  />
                  <span className={checks.length ? "text-richblack-400" : "text-richblack-300"}>At least 8 characters</span>
                </label>

                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    readOnly
                    checked={!!checks.upper}
                    className="w-4 h-4 rounded-sm bg-transparent border border-richblack-700 text-green-400"
                    aria-checked={!!checks.upper}
                  />
                  <span className={checks.upper ? "text-richblack-400" : "text-richblack-300"}>Uppercase letter (A-Z)</span>
                </label>

                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    readOnly
                    checked={!!checks.lower}
                    className="w-4 h-4 rounded-sm bg-transparent border border-richblack-700 text-green-400"
                    aria-checked={!!checks.lower}
                  />
                  <span className={checks.lower ? "text-richblack-400" : "text-richblack-300"}>Lowercase letter (a-z)</span>
                </label>

                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    readOnly
                    checked={!!checks.number}
                    className="w-4 h-4 rounded-sm bg-transparent border border-richblack-700 text-green-400"
                    aria-checked={!!checks.number}
                  />
                  <span className={checks.number ? "text-richblack-400" : "text-richblack-300"}>Number (0-9)</span>
                </label>

                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    readOnly
                    checked={!!checks.special}
                    className="w-4 h-4 rounded-sm bg-transparent border border-richblack-700 text-green-400"
                    aria-checked={!!checks.special}
                  />
                  <span className={checks.special ? "text-richblack-400" : "text-richblack-300"}>Special character (!@#$...)</span>
                </label>
              </div>
            </div>

            <label htmlFor="confirmPassword" className="text-richblack-5 mt-4">
              Confirm Password <sup className="text-pink-200">*</sup>
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Your Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-3 rounded-md bg-richblack-900 text-white border border-richblack-700 focus:outline-none focus:border-yellow-50"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((s) => !s)}
                className="absolute right-3 top-3 text-richblack-300"
                aria-label="Toggle confirm password visibility"
              >
                {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-pink-200 text-sm">{errors.confirmPassword}</p>}

            <button
              type="submit"
              className="w-full bg-yellow-50 text-richblack-900 font-semibold py-2 rounded-md hover:bg-yellow-100 transition duration-300 mt-4 disabled:opacity-50"
              disabled={!formData.password || !formData.confirmPassword}
            >
              Reset Your Password
            </button>
            {success && <p className="text-green-400 mt-2">{success}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
