//import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
//import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { ReactNode } from 'react'
import { Toaster } from "../ui/sonner"


export default function ClientProvider({ children }: {
  children: ReactNode
}) {
  return (
    <main>
      {children}
      <Toaster richColors />
    </main>
  )
}
