import { create } from "zustand";

export type DoctorSchedule = {
  fromDate: string;
  toDate: string;
};

type ScheduleStore = {
  fromDate: string;
  toDate: string;
};

type Action = {
  setFromDate: (date: string) => void;
  setToDate: (date: string) => void;
};

export const useDoctorScheduleStore = create<ScheduleStore & Action>((set) => ({
  fromDate: "",
  toDate: "",
  setFromDate: (date: string) => set(() => ({ fromDate: date })),
  setToDate: (date: string) => set(() => ({ toDate: date })),
}));
