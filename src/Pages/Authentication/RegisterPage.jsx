import React, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaFacebookF,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import { saveUserInformation } from "../../API/Utils";

function RegisterPage() {
  const { createUser, signInWithGoogle, darkMode, setLoading } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      const result = await createUser(email, password);
      const user = result?.user;
      await saveUserInformation(user);
      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    } catch (error) {
      toast.error("Registration failed");
      setLoading(false);
      console.log(error);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithGoogle();
      const user = result?.user;
      await saveUserInformation(user);
      Swal.fire({
        icon: "success",
        title: "Signed in with Google!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    } catch (err) {
      toast.error("Google Sign-In failed");
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <div
      className={`min-h-screen grid md:grid-cols-2 px-6 ${
        darkMode
          ? "bg-gradient-to-r from-purple-900 via-blue-900 to-black"
          : "bg-white"
      }`}
    >
      {/* Left Panel */}
      <div
        className={`hidden md:flex items-center justify-center p-10 ${
          darkMode
            ? "bg-gradient-to-r from-purple-900 via-blue-900 to-black"
            : "bg-white"
        }`}
      >
        <div className="text-center space-y-6">
          <h1
            className={`text-5xl font-extrabold drop-shadow ${
              darkMode ? "text-white" : "text-green-700"
            }`}
          >
            Join the Journey!
          </h1>
          <p
            className={`text-lg ${
              darkMode ? "text-gray-300" : "text-gray-700"
            } max-w-md mx-auto`}
          >
            Create your account and step into a world of streamlined
            productivity.
          </p>
          <p
            className={`text-md italic ${
              darkMode ? "text-amber-300" : "text-green-500"
            }`}
          >
            "Every great story starts with a single signup."
          </p>
        </div>
      </div>

      {/* Right Form Panel */}
      <div
        className={`flex items-center justify-center py-20 ${
          darkMode
            ? "bg-gradient-to-r from-black via-blue-900 to-purple-900 text-white"
            : "bg-white text-black"
        }`}
      >
        <div
          className={`${
            darkMode
              ? "bg-white/10 backdrop-blur-md border border-white/20 text-white"
              : "bg-white text-black"
          } p-10 rounded-2xl shadow-2xl w-full max-w-md`}
        >
          <h2 className="text-3xl font-bold text-center mb-6">
            Create an Account
          </h2>

          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            {/* Username */}
            <div>
              <label className="block mb-1">Username</label>
              <div className="flex items-center rounded-lg px-3 py-2 bg-green-100 dark:bg-white/20">
                <FaUser className="mr-2 text-black dark:text-gray-300" />
                <input
                  type="text"
                  placeholder="Enter your name"
                  {...register("name", { required: true })}
                  className={`w-full outline-none ${
                    darkMode
                      ? "bg-transparent text-white placeholder-gray-300"
                      : "bg-white text-gray-800 placeholder-gray-500"
                  }`}
                />
              </div>
              {errors.name && (
                <p className="text-red-300 text-sm mt-1">Name is required</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1">Email</label>
              <div className="flex items-center rounded-lg px-3 py-2 bg-green-100 dark:bg-white/20">
                <FaEnvelope className="mr-2 text-black dark:text-gray-300" />
                <input
                  type="email"
                  placeholder="Enter email"
                  {...register("email", { required: true })}
                  className={`w-full outline-none ${
                    darkMode
                      ? "bg-transparent text-white placeholder-gray-300"
                      : "bg-white text-gray-800 placeholder-gray-500"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-red-300 text-sm mt-1">Email is required</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1">Password</label>
              <div className="flex items-center rounded-lg px-3 py-2 bg-green-100 dark:bg-white/20 relative">
                <FaLock className="mr-2 text-black dark:text-gray-300" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Minimum 6 characters required",
                    },
                    validate: {
                      hasUppercase: (val) =>
                        /[A-Z]/.test(val) || "Must include an uppercase letter",
                      hasLowercase: (val) =>
                        /[a-z]/.test(val) || "Must include a lowercase letter",
                    },
                  })}
                  className={`w-full outline-none pr-10 ${
                    darkMode
                      ? "bg-transparent text-white placeholder-gray-300"
                      : "bg-white text-gray-800 placeholder-gray-500"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-xl text-gray-600 dark:text-gray-300"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-300 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block mb-1">Confirm Password</label>
              <div className="flex items-center rounded-lg px-3 py-2 bg-green-100 dark:bg-white/20 relative">
                <FaLock className="mr-2 text-black dark:text-gray-300" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  className={`w-full outline-none pr-10 ${
                    darkMode
                      ? "bg-transparent text-white placeholder-gray-300"
                      : "bg-white text-gray-800 placeholder-gray-500"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 text-xl text-gray-600 dark:text-gray-300"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-300 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={password !== confirmPassword}
              className={`w-full py-3 rounded-lg shadow-md text-white font-semibold bg-supporting hover:scale-95 transition-transform ${
                password !== confirmPassword
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              Register
            </button>
          </form>

          {/* Social Login */}
          <div className="text-center mt-4">
            <div className="divider">OR</div>
            <div className="flex gap-2 justify-center">
              <button
                onClick={handleGoogleSignUp}
                className="p-2 border border-gray-300 text-3xl rounded-full hover:scale-95 transition-transform shadow-md"
              >
                <FcGoogle />
              </button>
              <button
                onClick={""}
                className="p-2 border border-gray-300 text-3xl text-blue-500 rounded-full hover:scale-95 transition-transform shadow-md"
              >
                <FaFacebookF />
              </button>
            </div>
          </div>

          {/* Link to Login */}
          <p className="text-center text-sm mt-6 text-gray-300">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="text-amber-400 font-semibold underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
