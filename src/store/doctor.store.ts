import { create } from 'zustand'

type Store = {
    phone: string
    password: string
    loading: boolean
    
}

type Action = {
    setPhone: (data: string) => void
    setPassword: (data: string) => void
    setLoading: (data: boolean) => void
}

export const useDoctorStore = create<Store & Action>()((set) => ({
    phone: "",
    password: "",
    loading: false,
    setPhone: (phone) => set(() => ({ phone })),
    setPassword: (password) => set(() => ({ password })),
    setLoading: (loading) => set(() => ({ loading }))
}))
