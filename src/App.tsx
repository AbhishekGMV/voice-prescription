import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import DoctorDashboard from "./pages/doctor/Dashboard";
import "./index.css";
import { DoctorAuth, PatientAuth } from "./hooks/Auth";
import ProcessPrescription from "./pages/doctor/ProcessPrescription";
import Doctor from "./pages/doctor/index.";
import { DoctorSignatureUpload } from "./pages/doctor/Register";
import DoctorAppointment from "./pages/doctor/Appointment";
import Schedule from "./pages/schedule/Schedule";
import { PatientLogin } from "./pages/patient/Login";
import Patient from "./pages/patient";
import PatientDashboard from "./pages/patient/Dashboard";
import PatientAppointment from "./pages/patient/Appointment";
import Booking from "./pages/patient/Booking";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/register" element={<Signup />} />
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
        <Route path="/" element={<PatientAuth />}>
          <Route path="/patient/dashboard" element={<PatientDashboard />} />
          <Route path="/patient/appointment" element={<PatientAppointment />} />
          <Route path="/book-appointment" element={<Booking />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
