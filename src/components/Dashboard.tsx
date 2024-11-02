import React, { useState } from 'react'
import DashBoardHeader from './DashBoardHeader'
import DashboardTransfers from './DashboardTransfers'
import { usingAnotherBearerRequest } from '../lib/api'
import { useKeyStore } from '../hooks/use-public-key'
import { useAuthStore } from '../hooks/use-auth-store'
import { useBalanceStore } from '@/hooks/use-balance'
import { useBorrowedTransactionsStore, useReceivedTransactionsStore, useSentTransactionsStore } from '../hooks/use-transactions-store'
import { Icon } from '@iconify/react/dist/iconify.js'

const Dashboard = () => {
  const [loading, setLoading] = useState(true)
  const secretToken = import.meta.env.VITE_PUBLIC_ENCRYPTED_PUBLIC_KEY as string
  const user = useAuthStore((state: any) => state.user)
  const setUser = useAuthStore((state: any) => state.setUser)
  const { setKeys, keys } = useKeyStore()
  const { setNewBalance } = useBalanceStore()
  const { setBorrowedTransaction, setInitial: setBorrowedInitial } = useBorrowedTransactionsStore()
  const { setSentTransaction, setInitial: setSentInitial } = useSentTransactionsStore()
  const { setReceivedTransaction, setInitial } = useReceivedTransactionsStore()

  React.useEffect(() => {
    const es = new EventSource("http://localhost:8000/v1/balance");

    es.onmessage = (event) => {
      console.log(`message: ${event.data}`)
      setNewBalance(event.data)
    };

    return () => {
      es.close()
    }
  }, [])

  function getToken() {
    if (typeof window !== "undefined") {
      // Client-side-only code
      return sessionStorage.getItem("token") as string
    } else {
      return "";
    }
  };

  React.useEffect(() => {
    setTimeout(() => {
      if (user.email === "" && user.amount === 0) {
        console.log("DEAD")
        window.location.assign('/login')
      }
    }, 3000)
  }, [])

  React.useEffect(() => {
    usingAnotherBearerRequest(getToken(), "GET", "/auth/user").then((response) => {
      console.log(response.data)
      if (!response.data.error) {
        setLoading(false)
        setUser(response.data)
        setNewBalance(response.data.balance)
      }
    })
  }, [])

  React.useEffect(() => {
    usingAnotherBearerRequest(secretToken, "GET", "/all-keys").then((response) => {
      if (!response.data.error) {
        console.log(response.data.error)
      }

      console.log(response.data)
      setKeys(response.data)
    })
  }, [])

  React.useEffect(() => {
    usingAnotherBearerRequest(getToken(), "GET", "transactions/received").then((response) => {
      if (!response.data.error) {
        setInitial()
        console.log(response.data.error)
      }
      console.log(response.data)
      if (response.data !== null) {
        setReceivedTransaction(response.data)
      } else {
        setInitial()
      }
    })
  }, [keys])


  React.useEffect(() => {
    usingAnotherBearerRequest(getToken(), "GET", "transactions/borrowed").then((response) => {
      if (!response.data.error) {
        console.log(response.data.error)
        setSentInitial()
      }
      console.log(response.data)

      if (response.data !== null) {
        setBorrowedTransaction(response.data)
      } else {
        setBorrowedInitial()
      }

    })
  }, [keys])

  React.useEffect(() => {
    usingAnotherBearerRequest(getToken(), "GET", "transactions/sent").then((response) => {
      if (!response.data.error) {
        console.log(response.data.error)
        setSentInitial()
      }
      console.log(response.data)

      if (response.data !== null) {
        setSentTransaction(response.data)
      } else {
        setSentInitial()
      }

    })
  }, [keys])


  return (
    <main>
      {loading === true ? (
        <div className='flex justify-center items-center h-screen w-screen'>
          <Icon icon={'mynaui:spinner-one'} color='#6D2932' fontSize={50} className='animate-spin' />
        </div>
      ) : (
        <>
          <DashBoardHeader />
          <DashboardTransfers />
        </>
      )
      }
    </main >
  )
}

export default Dashboard
