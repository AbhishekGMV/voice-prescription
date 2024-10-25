import { UserNav } from "@/components/common/UserNav";
import { MainNav } from "@/components/doctor/MainNav";
import { useDoctorStore } from "@/store/doctor.store";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const DoctorAuth = () => {
  const { user } = useDoctorStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      return navigate("/");
    }
  }, []);

  return (
    <>
      <div className="m-6 flex justify-between">
        <MainNav className="mx-6" />
        <UserNav />
      </div>
      <Outlet />
    </>
  );
};

// export const PatientAuth = () => {
//   const { token } = usePatientStore();

//   if (!token) {
//     return null;
//   }

//   return token ? <Outlet /> : <Navigate to="/" />;
// };
