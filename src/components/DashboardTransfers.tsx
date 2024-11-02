import { useBorrowedTransactionsStore, useReceivedTransactionsStore, useSentTransactionsStore } from '@/hooks/use-transactions-store'
import { Icon } from '@iconify/react/dist/iconify.js'

const DashboardTransfers = () => {
  const { sentTransactions } = useSentTransactionsStore()
  const { borrowedTransactions } = useBorrowedTransactionsStore()
  const { receivedTransactions } = useReceivedTransactionsStore()
  console.log(borrowedTransactions)

  function iconsForTransactions(action: string) {
    switch (action) {
      case "sending":
        return <Icon icon={'mynaui:arrow-left-solid'} color='red' fontSize={30} />
      case "receiving":
        return <Icon icon={'mynaui:arrow-right-solid'} fontSize={30} color='green' />
      case "borrowing":
        return <Icon icon={'mynaui:arrow-down-solid'} color='#6D2932' fontSize={30} />
    }
  }

  return (
    <main className='container mx-auto p-6'>
      <div className='flex justify-evenly items-start'>
        <div className='flex flex-col justify-center items-center'>
          <h4 className='font-PoppinsRegular text-lg'>Received</h4>
          <div>
            {receivedTransactions.length > 0 ? (
              <>
                {receivedTransactions.map((transaction) => (
                  <div className='flex gap-5 items-center'>
                    {iconsForTransactions("receiving")}
                    <span>{transaction.receiver_first_name} {transaction.receiver_last_name}</span>
                    <span className='font-PoppinsExtraBold text-lg'>{transaction.amount}</span>
                    <span className='font-PoppinsLight text-xs'>FROM</span>
                    <span>{transaction.receiver_first_name} {transaction.receiver_last_name}</span>
                  </div>
                ))}
              </>
            ) : (
              <span>No money received</span>
            )}
          </div>
        </div>
        <div className='flex flex-col justify-center items-center'>
          <h4 className='font-PoppinsRegular text-lg'>Borrowed</h4>
          <div>
            {borrowedTransactions.length > 0 ? (
              <>
                {borrowedTransactions.map((transaction) => (
                  <div className='flex gap-5 items-center'>
                    {iconsForTransactions("borrowing")}
                    <span>ChiFunds</span>
                    <span className='font-PoppinsExtraBold text-lg'>{transaction.amount}</span>
                    <span className='font-PoppinsLight text-xs'>FROM</span>
                    <span>ChiFunds</span>
                  </div>
                ))}
              </>
            ) : (
              <span>You do not wanna borrow money?</span>
            )}
          </div>
        </div>
        <div className='flex flex-col justify-center items-center'>
          <h4 className='font-PoppinsRegular text-lg'>Sent</h4>
          <div>
            {sentTransactions.length > 0 ? (
              <>
                {sentTransactions.map((transaction) => (
                  <div className='flex gap-5 items-center'>
                    {iconsForTransactions("sending")}
                    <span className='font-PoppinsExtraBold text-lg'>{transaction.amount}</span>
                    <span className='font-PoppinsLight text-xs'>TO</span>
                    <span>{transaction.receiver_first_name} {transaction.receiver_last_name}</span>
                  </div>
                ))}
              </>
            ) : (
              <>No transactions sent</>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

export default DashboardTransfers
