import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
// import DoctorLogin from "./components/doctor/DoctorLogin";
import DoctorDashboard from "./pages/doctor/Dashboard";
import "./index.css";
import { DoctorAuth } from "./hooks/Auth";
import ProcessPrescription from "./pages/doctor/ProcessPrescription";
import LandingPage from "./pages/LandingPage";
import Doctor from "./pages/doctor/Doctor";
import { DoctorSignatureUpload } from "./pages/doctor/Register";
import DoctorAppointment from "./pages/appointment/Appointment";
import Schedule from "./pages/schedule/Schedule";
import { PatientLogin } from "./pages/patient/Login";
import Patient from "./pages/patient/Patient";
import PatientDashboard from "./pages/patient/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/doctor" element={<Doctor />} />

        <Route path="/" element={<DoctorAuth />}>
          <Route path="/doctor/sign" element={<DoctorSignatureUpload />} />
          <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
          <Route path="/doctor/appointment" element={<DoctorAppointment />} />
          <Route path="/doctor/schedule" element={<Schedule />} />
          <Route
            path="/doctor/prescription"
            element={<ProcessPrescription />}
          />
        </Route>
        <Route path="/patient" element={<Patient />} />
        <Route path="/patient/login" element={<PatientLogin />} />
        <Route path="/patient/dashboard" element={<PatientDashboard />} />
        {/* <Route path="/patient/appointment" element={<PatientAppointment />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
