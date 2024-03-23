  import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import NotFound from "./components/NotFound";
// import DoctorLogin from "./components/doctor/DoctorLogin";
import PatientLogin from "./components/patient/PatientLogin";
import DoctorDashboard from "./components/doctor/DoctorDashboard";
import DoctorAppointment from "./components/doctor/DoctorAppointment";
import "./index.css"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        {/* <Route path="/doctor/onboard" element={<DoctorLogin />} /> */}
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
        <Route path="/doctor/appointments" element={<DoctorAppointment />} />
        <Route path="/patient/login" element={<PatientLogin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
