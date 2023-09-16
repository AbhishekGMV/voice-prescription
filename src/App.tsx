import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import NotFound from "./components/NotFound";
// import DoctorLogin from "./components/DoctorLogin";
// import DoctorRegister from "./components/DoctorRegister";
// import PatientLogin from "./components/PatientLogin";
// import PatientRegister from "./components/PatientRegister";
// import DoctorDashboard from "./components/DoctorDashboard";
// import PatientDashboard from "./components/PatientDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        {/* <Route path="/doctor/login" element={<DoctorLogin />} />
        <Route path="/doctor/register" element={<DoctorRegister />} />
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />

        <Route path="/patient/login" element={<PatientLogin />} />
        <Route path="/patient/register" element={<PatientRegister />} />
        <Route path="/patient/dashboard" element={<PatientDashboard />} /> */}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
