import { UserButton } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function DoctorDashboard() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state) navigate("/doctor/onboard");
  }, [location.state, navigate]);
  return (
    <div>
      <UserButton />
      Doctor dashboard
    </div>
  );
}
