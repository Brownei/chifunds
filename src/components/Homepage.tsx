import React from "react"
import { Link } from "react-router-dom";
import { useBorrowedTransactionsStore, useReceivedTransactionsStore, useSentTransactionsStore } from '@/hooks/use-transactions-store'
import { useAuthStore } from '@/hooks/use-auth-store'
import { useBalanceStore } from '@/hooks/use-balance'

const Homepage = () => {
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
      <div className="flex flex-col justify-center items-center gap-[23px] text-center h-screen py-[300px]">
        <h1 className="font-PoppinsExtraBold text-[3rem] md:text-[4rem] md:w-[747px] lg:w-[947px] lg:text-[5rem]">Introducing ChiFunds: MAKE <span className="text-darkBrown">EASY</span> AND <span className="text-darkBrown">SWIFT</span> PAYMENTS </h1>
        <p className="text-[0.9rem] font-PoppinsLight md:text-[1.2rem] md:w-[747px] lg:w-[847px]">
          ChiFunds revolutionizes online transactions with its lightning-fast and user-friendly payment platform. Offering seamless integration and secure processing, ChiFunds ensures hassle-free payments for businesses and customers alike. Say goodbye to lengthy checkout processes and hello to swift, efficient transactions with ChiFunds.
        </p>
        <Link to={'/register'} className="bg-darkBrown font-PoppinsRegular px-24 py-3 rounded-[40px] text-white hover:bg-littleDarkBrown duration-200 transition-all cursor-pointer" >
          Get Started
        </Link>
      </div>
    </main>
  )
}

export default Homepage
