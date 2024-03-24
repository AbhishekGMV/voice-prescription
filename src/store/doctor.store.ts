import { create } from 'zustand'

type Store = {
    phone: string
    password: string
    loading: boolean
    token: string | null
}

type Action = {
    setPhone: (phone: string) => void
    setPassword: (password: string) => void
    setLoading: (loading: boolean) => void
    setToken: (token: string | null) => void
    handleUserLogout: () => void
}

export const useDoctorStore = create<Store & Action>()((set) => ({
    phone: "",
    password: "",
    loading: false,
    token: null,
    setPhone: (phone) => set(() => ({ phone })),
    setPassword: (password) => set(() => ({ password })),
    setLoading: (loading) => set(() => ({ loading })),
    setToken: (token) => set(() => ({ token })),
    handleUserLogout: () => set(() => ({
        phone: "",
        password: "",
        loading: false,
        token: null,
    }))
}))
