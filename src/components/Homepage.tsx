import { useEffect, useState } from "react";
import * as constants from "../utils/constants";

import "../styles/homepage.css";
import { useNavigate } from "react-router-dom";
import { useClerk } from "@clerk/clerk-react";

interface CardProps {
  isSelected: boolean;
  onClick: () => void;
}

function DoctorCard({ isSelected, onClick }: CardProps) {
  const clerk = useClerk();
  useEffect(() => {
    console.log(clerk?.client?.id);
  }, []);
  return (
    <div
      className={`card card__doctor ${
        isSelected ? "selected" : ""
      } rounded-full cursor-pointer`}
      onClick={onClick}
    >
      {isSelected && <span className="checkmark">&#10003;</span>}
    </div>
  );
}

function PatientCard({ isSelected, onClick }: CardProps) {
  return (
    <div
      className={`card card__patient ${
        isSelected ? "selected" : ""
      } rounded-full cursor-pointer`}
      onClick={onClick}
    >
      {isSelected && <span className="checkmark">&#10003;</span>}
    </div>
  );
}

export default function Homepage() {
  const [accountType, setAccountType] = useState<string>("");
  const navigate = useNavigate();

  if (!import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key");
  }

  return (
    <div className="homepage shadow-xl">
      <h3 className="text-3xl p-12 text-blue-500 text-center font-bold">
        Choose Account Type
      </h3>
      <div className="card-section flex justify-center">
        <DoctorCard
          isSelected={accountType === constants.DOCTOR}
          onClick={() => setAccountType(constants.DOCTOR)}
        />
        <PatientCard
          isSelected={accountType === constants.PATIENT}
          onClick={() => setAccountType(constants.PATIENT)}
        />
      </div>
      <div className="text-center">
        {accountType ? (
          <button
            className="mt-6 p-3 text-white font-semibold rounded-lg bg-sky-500"
            onClick={() => {
              const accountTypeSelected = accountType.toLocaleLowerCase();
              navigate(`${accountTypeSelected}/login`);
            }}
          >
            Login as {accountType}
          </button>
        ) : (
          <p className="text-center  mt-4 font-semibold">
            Select either doctor or patient account type.
          </p>
        )}
      </div>
    </div>
  );
}
