import { create } from "zustand";

export type DoctorAppointment = {
  patientName: string;
  slot: string | number;
  date: string;
};

type AppointmentStore = {
  loading: boolean;
  appointments: DoctorAppointment[] | null;
};

type Action = {
  setAppointments: (appointment: DoctorAppointment[]) => void;
  setLoading: (loading: boolean) => void;
};

export const useDoctorAppointmentStore = create<AppointmentStore & Action>(
  (set) => ({
    appointments: null,
    loading: false,
    setAppointments: (appointments: DoctorAppointment[]) =>
      set(() => ({ appointments })),
    setLoading: (loading: boolean) => set(() => ({ loading })),
  }),
);
