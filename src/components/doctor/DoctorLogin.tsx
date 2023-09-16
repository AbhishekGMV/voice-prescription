import { UserButton, useClerk, useUser } from "@clerk/clerk-react";
import { useEffect } from "react";

function DoctorLogin() {
  const { user, isLoaded } = useUser();
  const clerk = useClerk();

  useEffect(() => {
    if (isLoaded && !user) {
      clerk.redirectToSignIn();
    }
  }, [user, clerk, isLoaded]);

  return <div>{user && <UserButton />}</div>;
}

export default DoctorLogin;
