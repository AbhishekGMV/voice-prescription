import { DOCTOR } from "@/data/constants";
import { useDoctorStore } from "@/store/doctor.store";
import { usePatientStore } from "@/store/patient.store";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const Auth = ({ type }: { type: string }) => {
  const store = type === DOCTOR ? useDoctorStore() : usePatientStore();

  const { user, authChecked, isAuthenticated, fetchUser } = store;
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
