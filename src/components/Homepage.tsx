import { useState } from "react";
import "../styles/homepage.css";

export default function Homepage() {
  const [accountType, setAccountType] = useState<string>("");
  if (!import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key");
  }

  return (
    <div className="homepage">
      <h3 className="text-3xl text-blue-500 text-center font-bold">
        Choose account type
      </h3>
      <div className="card-section">
        <div
          className="card card__doctor"
          onClick={() => setAccountType("Doctor")}
        >
          Doctor
        </div>
        <div
          className="card card__patient"
          onClick={() => setAccountType("Patient")}
        >
          Patient
        </div>
      </div>
      {accountType && (
        <button className="rounded-none bg-sky-500">
          Login as {accountType}
        </button>
      )}
    </div>
  );
}
