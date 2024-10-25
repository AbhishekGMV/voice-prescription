import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100">
      <h1 className="text-6xl font-bold text-blue-800 mb-6 drop-shadow-lg">
        Medipro
      </h1>
      <p className="text-xl text-gray-700 mb-10">
        Please select your role to proceed
      </p>

      <div className="flex space-x-8">
        {/* Doctor Button */}
        <button
          className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition transform hover:scale-105"
          onClick={() => navigate("/doctor")}
        >
          I am a Doctor
        </button>

        {/* Patient Button */}
        <button
          className="bg-green-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-green-700 transition transform hover:scale-105"
          onClick={() => navigate("/patient")}
        >
          I am a Patient
        </button>
      </div>
    </div>
  );
}
