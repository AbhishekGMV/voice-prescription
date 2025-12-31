import api from "@/api";
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
  isAuthenticated: boolean;
  authChecked: boolean;
};

type Action = {
  setUser: (user: Patient) => void;
  handleUserLogout: (navigate: NavigateFunction) => void;
  setLoading: (loading: boolean) => void;
  fetchUser: () => Promise<void>;
};

export const usePatientStore = create<Store & Action>()(
  persist(
    (set) => ({
      user: null,
      loading: false,
      type: PATIENT,
      isAuthenticated: false,
      authChecked: false,
      setUser: (user: Patient) => set((state) => ({ ...state, user })),
      setLoading: (loading: boolean) => set((state) => ({ ...state, loading })),
      handleUserLogout: (navigate: NavigateFunction) => {
        set({ user: null });
        navigate("/");
      },
      fetchUser: async () => {
        try {
          set({ loading: true });
          const { data: result } = await api.get("/patient/me");
          set({ user: result.data, isAuthenticated: true });
        } catch (error) {
          set({ user: null, isAuthenticated: false });
          console.error("Error fetching patient data:", error);
        } finally {
          set({ loading: false, authChecked: true });
        }
      },
    }),
    {
      name: "user", // Key name in localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);
