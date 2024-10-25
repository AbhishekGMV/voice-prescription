import { NavigateFunction } from "react-router-dom";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type User = {
  phone?: string | undefined;
  password?: string | undefined;
  token: string;
  name?: string;
  id: string;
};

type Store = {
  loading: boolean;
  user: User | null;
  signature: Blob | undefined;
};

type Action = {
  setUser: (user: User) => void;
  handleUserLogout: (navigate: NavigateFunction) => void;
  setLoading: (loading: boolean) => void;
  setSignature: (file: Blob) => void;
};

export const useDoctorStore = create<Store & Action>()(
  persist(
    (set) => ({
      user: null,
      loading: false,
      signature: undefined,
      setUser: (user: User) => set((state) => ({ ...state, user })),
      setLoading: (loading: boolean) => set((state) => ({ ...state, loading })),
      setSignature: (file: Blob) =>
        set((state) => ({ ...state, signature: file })),
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
