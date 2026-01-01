import { create } from "zustand";

export type DoctorAppointment = {
  id: string;
  patient: {
    name: string;
    id: string;
    age: number;
    phone: string;
  };
  doctor: {
    name: string;
    specialization: string;
    phone: string;
  };
  startTime: string;
  status: string;
  date: string;
};

type AppointmentStore = {
  loading: boolean;
  appointments: DoctorAppointment[];
};

type Action = {
  setAppointments: (appointment: DoctorAppointment[]) => void;
  setLoading: (loading: boolean) => void;
};

export const useDoctorAppointmentStore = create<AppointmentStore & Action>(
  (set) => ({
    appointments: [],
    loading: false,
    setAppointments: (appointments: DoctorAppointment[]) =>
      set(() => ({ appointments })),
    setLoading: (loading: boolean) => set(() => ({ loading })),
  })
);
