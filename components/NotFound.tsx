// NotFound.tsx

import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600">404</h1>
        <p className="text-2xl mt-4 text-gray-800">Oops! Page Not Found</p>
        <Link
          to="/"
          className="inline-block mt-8 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
        >
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
