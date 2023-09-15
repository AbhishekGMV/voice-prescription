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
// const clerkPubKey = import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY;

import Homepage from "./components/Homepage";

function App() {
  return <Homepage />;
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
