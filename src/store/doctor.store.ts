import { create } from 'zustand'

type Doctor = {
    phone: string
    password: string
    token: string
    name: string
    id: string
}

type Store = {
    loading: boolean
    user: Doctor | null
}

type Action = {
    setUser: (user: Doctor) => void
    handleUserLogout: () => void
    setLoading: (loading: boolean) => void
}

export const useDoctorStore = create<Store & Action>()((set) => ({
    user: null,
    loading: false,
    setUser: (user: Doctor) => set(() => ({ user })),
    setLoading: (loading: boolean) => set({ loading }),
    handleUserLogout: () => set({ user: null })
}))
