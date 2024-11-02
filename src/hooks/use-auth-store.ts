import { User } from '@/types/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const initialState: User = {
  user: {
    account_number: 0,
    balance: 0,
    id: 0,
    email: '',
    last_name: '',
    first_name: '',
    email_verified: true,
    profile_picture: ''
  }
}

export const useAuthStore = create(
  persist(
    (set) => ({
      ...initialState,
      setUser: (newData: User) => set((state: User) => ({ user: { ...state.user, ...newData } })),
      clear: () => set(initialState)
    }),
    {
      name: "chifunds-user-storage",
    }
  )
)
