import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const Page404 = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row justify-center items-center bg-[var(--color-background)] px-6">
      <div className="w-full md:w-1/2 mb-10 md:mb-0">
        <img
          src="https://i.ibb.co.com/0R6pRkwr/404page.png"
          alt="Page not found"
          className="w-full max-w-md mx-auto"
        />
      </div>

      <div className="w-full md:w-1/2 text-center md:text-left">
        <h1 className="text-[100px] font-extrabold text-[var(--color-main)] leading-none mb-4">
          404
        </h1>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Oops! Page not found
        </h2>
        <p className="text-gray-600 max-w-md mb-6 mx-auto md:mx-0">
          The page you're looking for doesn’t exist or has been moved. Let’s get
          you back to where you belong.
        </p>
        <Link
          to="/"
          className="ezy-button-primary inline-flex items-center justify-center"
        >
          <FaArrowLeft className="mr-2" /> Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default Page404;
