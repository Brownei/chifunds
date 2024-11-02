import { persist } from "zustand/middleware"
import { create, } from 'zustand'

type Transactions = {
  amount: number
  receiver_first_name: string
  receiver_last_name: string
  sent_at: Date
}
type BorrowedTransactions = {
  amount: number
  sent_at: Date
}

interface SentTransactionsState {
  sentTransactions: Transactions[]
  setInitial: () => void
  setSentTransaction: (newTransactions: Transactions[]) => void
  addNewSentTransaction: (newTransactions: Transactions) => void
}

interface BorrowedTransactionsState {
  borrowedTransactions: BorrowedTransactions[]
  setInitial: () => void
  setBorrowedTransaction: (newTransactions: BorrowedTransactions[]) => void
  addNewBorrowedTransaction: (newTransactions: BorrowedTransactions) => void
}

interface ReceivedTransactionsState {
  receivedTransactions: Transactions[]
  setInitial: () => void
  setReceivedTransaction: (newTransactions: Transactions[]) => void
  addNewReceivedTransaction: (newTransactions: Transactions) => void
}




export const useSentTransactionsStore = create<SentTransactionsState>()(
  persist((set) => ({
    sentTransactions: [],
    setInitial: () => set(() => ({ sentTransactions: [] })),
    setSentTransaction: (newTransactions) => set(() => ({ sentTransactions: newTransactions })),
    addNewSentTransaction: (newTransactions) => set((state) => ({ sentTransactions: [newTransactions, ...state.sentTransactions] }))
  }),
    {
      name: "sentTransactions-storage"
    })
)

export const useBorrowedTransactionsStore = create<BorrowedTransactionsState>()(
  persist((set) => ({
    borrowedTransactions: [],
    setInitial: () => set(() => ({ borrowedTransactions: [] })),
    setBorrowedTransaction: (newTransactions) => set(() => ({ borrowedTransactions: newTransactions })),
    addNewBorrowedTransaction: (newTransaction) => set((state) => ({ borrowedTransactions: [newTransaction, ...state.borrowedTransactions] }))
  }),
    {
      name: "borrowedTransactions-storage"
    })
)

export const useReceivedTransactionsStore = create<ReceivedTransactionsState>()(
  persist((set) => ({
    receivedTransactions: [],
    setInitial: () => set(() => ({ receivedTransactions: [] })),
    setReceivedTransaction: (newTransactions) => set(() => ({ receivedTransactions: newTransactions })),
    addNewReceivedTransaction: (newTransaction) => set((state) => ({ receivedTransactions: [newTransaction, ...state.receivedTransactions] }))
  }),
    {
      name: "receivedTransactions-storage"
    })
)

