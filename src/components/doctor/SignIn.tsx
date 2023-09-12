import { RedirectToSignIn, useUser } from "@clerk/clerk-react";
import { useEffect } from "react";

export default function SignIn() {
  const { isLoaded, isSignedIn, user } = useUser();
  useEffect(() => {
    if (isLoaded && (!isSignedIn || !user)) {
      <RedirectToSignIn />;
    }
  }, [isLoaded, isSignedIn, user]);
  return <div>Redirecting to clerk SignIn</div>;
}
