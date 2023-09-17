import { UserButton, useClerk, useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function DoctorLogin() {
  const { user, isLoaded } = useUser();
  const clerk = useClerk();
  const navigate = useNavigate();

  useEffect(() => {
    const checkIfUserSignedIn = async () => {
      if (isLoaded && !user) {
        await clerk.redirectToSignIn();
      }
    };
    checkIfUserSignedIn();
    if (isLoaded && user) navigate("/doctor/dashboard");
  }, [user, clerk, isLoaded, navigate]);

  return <div>{user && <UserButton />}</div>;
}

export default DoctorLogin;
