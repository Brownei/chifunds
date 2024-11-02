import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface BalanceState {
  balance: number
  setNewBalance: (newBalance: number) => void
  clearBalance: () => void
}

export const useBalanceStore = create<BalanceState>()(
  persist((set) => ({
    balance: 0,
    setNewBalance: (newBalance) => set(() => ({ balance: newBalance })),
    clearBalance: () => set(() => ({ balance: 0 }))
  }),
    {
      name: "balance-store"
    })
)


