import { UserButton, useClerk, useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";

function DoctorLogin() {
  const { user, isLoaded } = useUser();
  const [signInComplete, setSignInComplete] = useState(false);
  const clerk = useClerk();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && !user) clerk.redirectToSignIn();

    if (isLoaded && user) {
      api.get(`/doctor/${user.id}`).then(({ data }) => {
        const signature = data.doctor.signatureUrl;
        if (signature) {
          setSignInComplete(true);
          navigate("/doctor/dashboard");
        }
      });
    }
  }, [user, clerk, isLoaded, navigate]);

  return <div>{user && !signInComplete ? <UserButton /> : ""}</div>;
}

export default DoctorLogin;
