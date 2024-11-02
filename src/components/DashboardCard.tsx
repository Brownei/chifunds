import { Icon } from "@iconify/react/dist/iconify.js";

const DashboardCard = () => {
  return (
    <main className='container mx-auto p-6'>
      <div className='border border-dashed border-darkBrown h-[400px] w-full '>
        <span className="flex justify-center items-center h-[400px]">
          <Icon icon={'majesticons:plus-line'} fontSize={40} />
        </span>
      </div>
    </main>
  )
}

export default DashboardCard
