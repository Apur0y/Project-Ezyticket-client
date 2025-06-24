import React, { useState } from "react";
import {
  FaLock,
  FaEnvelope,
  FaFacebookF,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getAuth, sendPasswordResetEmail } from "firebase/auth"; // ✅ Import for reset
import useAuth from "../../Hooks/useAuth";
import { saveUserInformation } from "../../API/Utils";

function LoginPage() {
  const { signIn, signInWithGoogle, setLoading, darkMode } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState(""); // ✅ State to hold email for password reset

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      await signIn(email, password);
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      const user = result?.user;
      await saveUserInformation(user);
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  // ✅ Handle Forgot Password
  const handleForgotPassword = async () => {
    if (!resetEmail) {
      Swal.fire({
        icon: "warning",
        title: "Please enter your email first",
      });
      return;
    }
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, resetEmail);
      Swal.fire({
        icon: "success",
        title: "Password reset email sent",
        text: "Check your inbox to reset your password.",
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Failed to send reset email",
        text: error.message,
      });
    }
  };

  return (
    <div
      className={`min-h-screen grid md:grid-cols-2 px-6 ${
        darkMode
          ? "bg-gradient-to-r from-purple-900  via-blue-900 to-black "
          : "bg-white"
      }`}
    >
      {/* Left Panel */}
      <div
        className={`hidden md:flex items-center justify-center p-10 ${
          darkMode
            ? "bg-gradient-to-r from-purple-900  via-blue-900 to-black "
            : "bg-white"
        }`}
      >
        <div className="text-center space-y-6">
          <h1
            className={`text-5xl font-extrabold ${
              darkMode ? "text-white" : "text-green-700"
            } drop-shadow`}
          >
            Welcome Back!
          </h1>
          <p
            className={`text-lg ${
              darkMode ? "text-gray-300" : "text-gray-700"
            } max-w-md mx-auto`}
          >
            Dive into your dashboard and manage everything in one place. Fast,
            secure, and stylish.
          </p>
          <p
            className={`text-md italic ${
              darkMode ? "text-amber-300" : "text-green-500"
            }`}
          >
            "The journey of a thousand miles begins with a single login."
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
          <h2 className="text-3xl font-bold text-center mb-6">Sign In</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block mb-1">Email</label>
              <div className="flex items-center bg-green-100 rounded-lg px-3 py-2">
                <FaEnvelope className="text-black mr-2" />
                <input
                  type="email"
                  placeholder="Enter email"
                  {...register("email", { required: true })}
                  onChange={(e) => setResetEmail(e.target.value)} // ✅ Store email for reset
                  className="outline-none text-gray-700 placeholder-gray-600 py-2 w-full bg-transparent"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">Email is required</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block mb-1">Password</label>
              <div className="flex items-center justify-between bg-green-100 rounded-lg px-3 py-2">
                <div className="flex items-center w-full">
                  <FaLock className="text-black mr-2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    {...register("password", { required: true })}
                    className="outline-none text-gray-700 placeholder-gray-600 py-2 w-full bg-transparent"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="ml-2 text-xl text-gray-600"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  Password is required
                </p>
              )}

              {/* ✅ Forgot Password Link */}
              <p className="text-left text-sm mt-2">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-blue-400 hover:underline"
                >
                  Forgot password?
                </button>
              </p>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full text-center py-3 bg-supporting rounded-lg shadow-md transition-transform hover:scale-95 text-white font-semibold"
            >
              Login
            </button>
          </form>

          {/* Social Login */}
          <div className="text-center mt-4">
            <div className="divider">OR</div>
            <div className="flex gap-2 justify-center">
              <button
                onClick={handleGoogleSignIn}
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

          {/* Register Link */}
          <p className="text-center text-sm mt-6 text-gray-300">
            Don’t have an account?{" "}
            <Link
              to={"/register"}
              className="text-amber-400 font-semibold underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
