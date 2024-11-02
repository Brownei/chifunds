import { arrangeMoneyFigures } from '../lib/utils'
import Modal from './Modal'
import { useAuthStore } from '../hooks/use-auth-store'
import TransferModal from './TransferModal'
import { Button } from './ui/button'
import { ProfileImage } from './ProfileImage'
import { useBalanceStore } from '@/hooks/use-balance'

const DashBoardHeader = () => {
  const { balance } = useBalanceStore()
  const user = useAuthStore((state: any) => state.user) as any
  const userBalance = balance !== 0 ? balance : user.balance
  const value = arrangeMoneyFigures(userBalance)
  const firstLetter = user.first_name.split('')[0] as string
  const lastLetter = user.last_name.split('')[0] as string
  const initials = firstLetter + lastLetter

  function logOut() {
    sessionStorage.removeItem("token")
    window.location.assign("/login")
  }

  return (
    <main>
      <div className="h-[250px] w-full">
        <div className="absolute inset-0 -z-10 h-[250px] w-full bg-white bg-[linear-gradient(to_right,#E8D8C4_1px,transparent_1px),linear-gradient(to_bottom,#E8D8C4_1px,transparent_1px)] bg-[size:8rem_4rem]"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div></div>
        <div className='absolute right-10 top-10'>
          <div className='flex gap-3 items-center'>
            <ProfileImage firstLetter={initials} image={user.profile_picture} />
            <Button
              type="button"
              variant={'outline'}
              onClick={logOut}
              className="md:px-[15px] md:py-[5px] px-[10px] py-[3px] bg-darkBrown text-white font-PoppinsRegular hover:bg-littleDarkBrown hover:text-white duration-200 transition-all"
            >
              Log out
            </Button>
          </div>
        </div>
        <div className='container grid gap-2 mx-auto p-6'>
          <h1 className='mt-10 text-[1.5rem] font-PoppinsExtraBold md:text-[2rem] lg:text-[3rem]'>Welcome Back, {user.first_name}!</h1>
          <span className='font-PoppinsRegular text-base'>Account No.: {user.account_number}</span>
          <p className='font-PoppinsLight text-[1rem] md:text-[2rem]'>Total Balance: {'\u20A6'}{value}</p>
          <div className='flex gap-10 justify-end items-center'>
            <TransferModal />
            <Modal />
          </div>
        </div>
      </div>
    </main>
  )
}

export default DashBoardHeader
