import { create } from "zustand";

export type PatientAppointment = {
  patientName: string;
  slot: string | number;
  date: string;
};

type AppointmentStore = {
  loading: boolean;
  appointments: PatientAppointment[] | null;
};

type Action = {
  setAppointments: (appointment: PatientAppointment[]) => void;
  setLoading: (loading: boolean) => void;
};

export const usePatientAppointmentStore = create<AppointmentStore & Action>(
  (set) => ({
    appointments: null,
    loading: false,
    setAppointments: (appointments: PatientAppointment[]) =>
      set(() => ({ appointments })),
    setLoading: (loading: boolean) => set(() => ({ loading })),
  })
);
