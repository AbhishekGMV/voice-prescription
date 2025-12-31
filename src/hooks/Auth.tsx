import { useDoctorStore } from "@/store/doctor.store";
import { usePatientStore } from "@/store/patient.store";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const DoctorAuth = () => {
  const { user, authChecked, isAuthenticated, fetchUser } = useDoctorStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (!authChecked) return;
    if (!user || !isAuthenticated) {
      navigate("/");
    }
  }, [user, authChecked, isAuthenticated]);

  return (
    <>
      <Outlet />
    </>
  );
};

export const PatientAuth = () => {
  const { user } = usePatientStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      return navigate("/");
    }
  }, []);

  return (
    <>
      {/* <div className="m-6 flex justify-center">
        <MainNav user={user} className="mx-6" />
        <UserNav user={user} handleUserLogout={handleUserLogout} />{" "}
      </div> */}
      <Outlet />
    </>
  );
};
