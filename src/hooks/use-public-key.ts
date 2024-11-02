import { create } from 'zustand'

type Key = {
  publicKey: string
  privateKey: string
}

interface KeyState {
  keys: Key
  setKeys: (newKeys: Key) => void
}

export const useKeyStore = create<KeyState>()((set) => ({
  keys: {
    privateKey: "",
    publicKey: ""
  },
  setKeys: (newKeys) => set(() => ({ keys: newKeys })),
}))

