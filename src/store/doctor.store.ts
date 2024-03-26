import { NavigateFunction } from "react-router-dom";
import { create } from "zustand";

export type User = {
  phone: string;
  password: string;
  token: string;
  name: string;
  id: string;
};

type Store = {
  loading: boolean;
  user: User | null;
};

type Action = {
  setUser: (user: User) => void;
  handleUserLogout: (navigate: NavigateFunction) => void;
  setLoading: (loading: boolean) => void;
};

export const useDoctorStore = create<Store & Action>()((set) => ({
  user: null,
  loading: false,
  setUser: (user: User) => set(() => ({ user })),
  setLoading: (loading: boolean) => set({ loading }),
  handleUserLogout: (navigate: NavigateFunction) => {
    localStorage.setItem("user", "{}");
    set({ user: null });
    navigate("/");
  },
}));
