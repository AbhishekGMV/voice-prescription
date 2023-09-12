// import {
//   ClerkProvider,
//   SignedOut,
//   RedirectToSignIn,
//   SignUp,
//   SignOutButton,
//   SignedIn,
// } from "@clerk/clerk-react";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import SignIn from "./components/doctor/SignIn";
import "./styles/homepage.css";

if (!import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

// const clerkPubKey = import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY;

function App() {
  return (
    <div className="homepage">
      <img
        width="100"
        height="100"
        src="https://img.icons8.com/ios/100/medical-doctor.png"
        alt="medical-doctor"
      />
    </div>
  );
}

export default App;

{
  /* <ClerkProvider publishableKey={clerkPubKey}>
      <BrowserRouter>
        <Routes>
          <Route path="/sign-in/*" element={<SignIn />} />
          <Route
            path="/sign-up/*"
            element={<SignUp routing="path" path="/sign-up" />}
          />
          <Route
            path="/protected"
            element={
              <>
                <SignedIn>
                  <SignOutButton />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </ClerkProvider> */
}
