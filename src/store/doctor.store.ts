import api from "@/api";
import { NavigateFunction } from "react-router-dom";
import { create } from "zustand";

export type Doctor = {
  phone?: string | undefined;
  password?: string | undefined;
  token: string;
  name?: string;
  id: string;
  role?: string;
  imageUrl?: string;
  type: "patient" | "doctor" | null;
};

type Store = {
  loading: boolean;
  user: Doctor | null;
  isAuthenticated: boolean;
  authChecked: boolean;
  signature: Blob | undefined;
};

type Action = {
  setUser: (user: Doctor | null) => void;
  handleUserLogout: (navigate: NavigateFunction) => void;
  setLoading: (loading: boolean) => void;
  setSignature: (file: Blob) => void;
  fetchUser: () => Promise<void>;
};

export const useDoctorStore = create<Store & Action>()((set) => ({
  user: null,
  loading: false,
  signature: undefined,
  isAuthenticated: false,
  authChecked: false,
  setUser: (user: Doctor | null) => set((state) => ({ ...state, user })),
  setLoading: (loading: boolean) => set((state) => ({ ...state, loading })),
  setSignature: (file: Blob) => set((state) => ({ ...state, signature: file })),
  fetchUser: async () => {
    try {
      set({ loading: true });
      const { data: result } = await api.get("/doctor/me");
      set({ user: result.data, isAuthenticated: true });
    } catch (error) {
      set({ user: null, isAuthenticated: false });
      console.error("Error fetching doctor data:", error);
    } finally {
      set({ loading: false, authChecked: true });
    }
  },
  handleUserLogout: (navigate: NavigateFunction) => {
    set({ user: null });
    navigate("/");
  },
}));
