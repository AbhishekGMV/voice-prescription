import { useDoctorStore } from "@/store/doctor.store";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const DoctorAuth = () => {
  const token = useDoctorStore().token || localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      return navigate("/");
    }
  }, [navigate, token]);

  return <Outlet />;
};

// export const PatientAuth = () => {
//   const { token } = usePatientStore();

//   if (!token) {
//     return null;
//   }

//   return token ? <Outlet /> : <Navigate to="/" />;
// };
