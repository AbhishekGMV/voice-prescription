// NotFound.tsx

import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound: React.FC = () => {
    const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600">404</h1>
        <p className="text-2xl mt-4 text-gray-800">Oops! Page Not Found</p>
        <Button
          onClick={() => navigate(-1)}
        >
          Go Back to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
