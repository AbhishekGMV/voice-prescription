import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import NotFound from "./components/NotFound";
import { ClerkProvider } from "@clerk/clerk-react";
import DoctorLogin from "./components/doctor/DoctorLogin";
import PatientLogin from "./components/patient/PatientLogin";
import DoctorDashboard from "./components/doctor/DoctorDashboard";
// import DoctorRegister from "./components/DoctorRegister";
// import PatientRegister from "./components/PatientRegister";
// import DoctorDashboard from "./components/DoctorDashboard";
// import PatientDashboard from "./components/PatientDashboard";

function App() {
  const clerkPubKey = import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY;
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/doctor/login" element={<DoctorLogin />} />
          {/* <Route path="/doctor/register" element={<DoctorRegister />} /> */}
          <Route path="/doctor/dashboard" element={<DoctorDashboard />} />

          <Route path="/patient/login" element={<PatientLogin />} />
          {/* <Route path="/patient/register" element={<PatientRegister />} /> */}
          {/* <Route path="/patient/dashboard" element={<PatientDashboard />} /> */}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ClerkProvider>
  );
}

export default App;
