import React from 'react'
import { LoginForm } from "./LoginForm"
import { Link } from "react-router-dom"
import { Icon } from "@iconify/react"
import { buttonVariants } from "./ui/button"
import { areObjectsEqual, cn } from "../lib/utils"
import { useBorrowedTransactionsStore, useReceivedTransactionsStore, useSentTransactionsStore } from '@/hooks/use-transactions-store'
import { initialState, useAuthStore } from '@/hooks/use-auth-store'
import { useBalanceStore } from '@/hooks/use-balance'

const GetStartedPage = () => {
  const { clearBalance } = useBalanceStore()
  const { setInitial: setReceivedInitial } = useReceivedTransactionsStore()
  const { setInitial: setBorrowedInitial } = useBorrowedTransactionsStore()
  const { setInitial } = useSentTransactionsStore()
  const clear = useAuthStore((state: any) => state.clear)

  React.useEffect(() => {
    clear()
    clearBalance()
    setInitial()
    setReceivedInitial()
    setBorrowedInitial()
  }, [])


  return (
    <main>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#E8D8C4_1px,transparent_1px),linear-gradient(to_bottom,#E8D8C4_1px,transparent_1px)] bg-[size:8rem_4rem]"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div></div>
      <div className="container flex h-screen w-screen flex-col items-center justify-center">
        <Link
          to="/"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute left-4 top-4 font-PoppinsLight md:left-8 md:top-8"
          )}
        >
          <>
            <Icon icon='ion:chevron-back-sharp' className="mr-2 h-4 w-4" />
            Back
          </>
        </Link>
        <div className="mx-auto flex w-full flex-col justify-center items-center space-y-6">
          <h1 className="text-[3rem] font-PoppinsExtraBold text-center md:text-[5rem]">
            Welcome back
          </h1>
          <LoginForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            <Link
              to="/register"
              className="hover:text-brand underline underline-offset-4"
            >
              Don&apos;t have an account? Sign Up
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}

export default GetStartedPage
