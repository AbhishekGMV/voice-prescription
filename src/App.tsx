import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
// import DoctorLogin from "./components/doctor/DoctorLogin";
import PatientLogin from "./components/patient/PatientLogin";
import DoctorDashboard from "./pages/doctor/Dashboard";
import "./index.css";
import { DoctorAuth } from "./middleware/Auth";
import ProcessPrescription from "./pages/doctor/ProcessPrescription";
import LandingPage from "./pages/LandingPage";
import Doctor from "./pages/doctor/Doctor";
import { DoctorSignatureUpload } from "./pages/doctor/Register";
import DoctorAppointment from "./pages/appointment/Appointment";

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
          <Route
            path="/doctor/prescription"
            element={<ProcessPrescription />}
          />
        </Route>

        <Route path="/patient/login" element={<PatientLogin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
