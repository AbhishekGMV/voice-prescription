import { useDoctorStore } from "@/store/doctor.store";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const DoctorAuth = () => {
  const { user, setUser } = useDoctorStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user || !user.token) {
      const localUser = JSON.parse(localStorage.getItem("user") || "{}");
      setUser(localUser);
      if (!localUser || !localUser.token) {
        return navigate("/");
      }
    }
  }, [navigate, setUser]);

  return <Outlet />;
};

// export const PatientAuth = () => {
//   const { token } = usePatientStore();

//   if (!token) {
//     return null;
//   }

//   return token ? <Outlet /> : <Navigate to="/" />;
// };
