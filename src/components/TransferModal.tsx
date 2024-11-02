import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { useState } from 'react'
import { Button } from "./ui/button"
import { Icon } from "@iconify/react/dist/iconify.js"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { useForm } from "react-hook-form"
import { useKeyStore } from '../hooks/use-public-key'
import { usingAnotherBearerRequest } from "../lib/api"
import { decryptData, encryptData } from "../lib/utils"

const TransferModal = () => {
  const token = sessionStorage.getItem("token") as string
  const { keys } = useKeyStore()
  const [successSection, setSuccessSection] = useState(false)
  const [errorSection, setErrorSection] = useState<"oversabi" | "rubbish" | "None" | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit } = useForm({
    mode: 'onSubmit'
  })

  function encryptedData(data: any) {
    const accountNumber = data.accountNumber
    const amount = Number(data.amount)
    const payload = {
      amount,
      account_number: accountNumber,
    }

    return encryptData(keys.publicKey, payload)
  }

  async function onSubmit(data: any) {
    console.log(data)
    setIsLoading(true)
    try {
      const response = await usingAnotherBearerRequest(token, "POST", "/transactions/transfer-money", {
        data: encryptedData(data)
      })
      const d = decryptData(keys.privateKey, response.data)
      console.log(d)
      if (response.data.error) {
        console.log(response.data.error)
        if (response.data.error === `"json: cannot unmarshal number 10000000000 into Go struct field BorrowMoneyDto.amount of type int32"`) {
          setErrorSection("oversabi")
        } else if (response.data.error === "No user with this account!") {
          setErrorSection("None")
        }
      }

      setSuccessSection(true)
    } catch (error) {
      setErrorSection("rubbish")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog onOpenChange={(open: boolean) => {
      if (open === false) {
        setSuccessSection(false)
        setErrorSection(null)
      }
    }}>
      <DialogTrigger>
        <Button
          type="button"
          variant={'outline'}
          className="md:px-[20px] md:py-[20px] px-[50px] py-[10px] bg-darkBrown text-white font-PoppinsRegular hover:bg-littleDarkBrown hover:text-white duration-200 transition-all"
        >
          <Icon icon={'fa6-solid:paper-plane'} fontSize={16} color='white' />
        </Button>
      </DialogTrigger>
      {errorSection === 'rubbish' ? (
        <DialogContent>
          <DialogHeader className='flex flex-col font-PoppinsRegular justify-center items-center'>
            <img width={700} height={700} src={'/willem-dafoe-looking-up.avif'} alt='Who is the problem' />
            <DialogTitle className='p-0 m-0 text-lg'>Who is the problem?</DialogTitle>
          </DialogHeader>
        </DialogContent>
      ) : errorSection === 'oversabi' ? (
        <DialogContent >
          <DialogHeader className='flex flex-col font-PoppinsRegular justify-center items-center'>
            <img width={700} height={700} src={'/wikihow-defending-against-a-knife-attack.avif'} alt='I will kill you!' />
            <DialogTitle className='p-0 m-0 text-lg'>With what????</DialogTitle>
            <DialogDescription className='p-0 m-0 text-base'>You sef!!</DialogDescription>
          </DialogHeader>
        </DialogContent>
      ) : errorSection === "None" ? (
        <DialogContent >
          <DialogHeader className='flex flex-col font-PoppinsRegular justify-center items-center'>
            <img width={700} height={700} src={'/none.png'} alt='I will kill you!' />
            <DialogTitle className='p-0 m-0 text-lg'>This person you wanna send to</DialogTitle>
            <DialogDescription className='p-0 m-0 text-base'>E no dey</DialogDescription>
          </DialogHeader>
        </DialogContent>
      ) : successSection ? (
        <DialogContent>
          <DialogHeader className='flex flex-col font-PoppinsRegular justify-center items-center'>
            <img width={700} height={700} src={'/noice.png'} alt='Noice' />
          </DialogHeader>
        </DialogContent>
      ) : (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Money</DialogTitle>
            <DialogDescription>
              Sending funds? after borrowing?
            </DialogDescription>
          </DialogHeader >

          <div className="grid items-center gap-4">
            <Label htmlFor="accountNumber" className="text-start">
              Account Number
            </Label>
            <Input
              id="amount"
              placeholder="512....."
              className="col-span-3"
              {...register("accountNumber")}
            />
          </div>

          <div className="grid items-center gap-4">
            <Label htmlFor="talking" className="text-start">
              Amount
            </Label>
            <Input
              id="amount"
              type='number'
              className="col-span-3"
              {...register("amount")}
            />
          </div>
          <DialogFooter>
            <Button disabled={isLoading} className='bg-darkBrown mt-3 text-white font-PoppinsRegular hover:bg-littleDarkBrown hover:text-white duration-200 transition-all' onClick={handleSubmit(onSubmit)} type="submit">
              {isLoading && (<Icon icon={'uil:spinner-alt'} className='mr-2 h-4 w-4 animate-spin' />)}
              Send
            </Button>
          </DialogFooter>

        </DialogContent >
      )}
    </Dialog >
  )
}

export default TransferModal
