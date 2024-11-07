import { PATIENT } from "@/data/constants";
import { NavigateFunction } from "react-router-dom";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type Patient = {
  phone?: string | undefined;
  password?: string | undefined;
  token: string;
  name?: string;
  id: string;
  type: string;
};

type Store = {
  loading: boolean;
  user: Patient | null;
};

type Action = {
  setUser: (user: Patient) => void;
  handleUserLogout: (navigate: NavigateFunction) => void;
  setLoading: (loading: boolean) => void;
};

export const usePatientStore = create<Store & Action>()(
  persist(
    (set) => ({
      user: null,
      loading: false,
      type: PATIENT,
      setUser: (user: Patient) => set((state) => ({ ...state, user })),
      setLoading: (loading: boolean) => set((state) => ({ ...state, loading })),
      handleUserLogout: (navigate: NavigateFunction) => {
        set({ user: null });
        navigate("/");
      },
    }),
    {
      name: "user", // Key name in localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);
