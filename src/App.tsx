  import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import NotFound from "./components/NotFound";
// import DoctorLogin from "./components/doctor/DoctorLogin";
import PatientLogin from "./components/patient/PatientLogin";
import DoctorDashboard from "./components/doctor/Dashboard";
import DoctorAppointment from "./components/doctor/Appointment";
import "./index.css"
import { DoctorAuth } from "./middleware/Auth";
import ProcessPrescription from "./components/ProcessPrescription";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        {/* <Route path="/doctor/onboard" element={<DoctorLogin />} /> */}
        <Route path="/" element={<DoctorAuth />}>
          <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
          <Route path="/doctor/appointment" element={<DoctorAppointment />} />
          <Route path="/doctor/prescription" element={<ProcessPrescription />} />
        </Route>

        <Route path="/patient/login" element={<PatientLogin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
