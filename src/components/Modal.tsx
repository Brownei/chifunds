import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { useForm } from 'react-hook-form'
import { encryptData } from '../lib/utils'
import { usingAnotherBearerRequest } from '../lib/api'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useKeyStore } from '../hooks/use-public-key'

export enum ErrorEnum {
  Oversabi,
  Rubbish
}

const Modal = () => {
  const token = sessionStorage.getItem("token") as string
  const { keys } = useKeyStore()
  const [successSection, setSuccessSection] = useState(false)
  const [errorSection, setErrorSection] = useState<"oversabi" | "rubbish" | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit } = useForm({
    mode: 'onSubmit'
  })

  function encrytedData(data: any) {
    return encryptData(keys.publicKey, {
      amount: Number(data.amount),
      explanation: data.explanation
    })
  }

  async function onSubmit(data: any) {
    console.log(data)
    setIsLoading(true)
    try {
      const response = await usingAnotherBearerRequest(token, "POST", "/transactions/borrow-money", {
        data: encrytedData(data)
      })
      console.log(response.data)
      if (response.data.error) {
        if (response.data.error = `"json: cannot unmarshal number 10000000000 into Go struct field BorrowMoneyDto.amount of type int32"`) {
          setErrorSection("oversabi")
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
      <DialogTrigger asChild>
        <Button
          type="button"
          variant={'outline'}
          className="md:px-[70px] md:py-[20px] px-[50px] py-[10px] bg-darkBrown text-white font-PoppinsRegular hover:bg-littleDarkBrown hover:text-white duration-200 transition-all"
        >
          Steal more money
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
            <img width={700} height={700} src={'/trust-me.png'} alt='I will kill you!' />
            <DialogTitle className='p-0 m-0 text-lg'>Senior man</DialogTitle>
            <DialogDescription className='p-0 m-0 text-base'>E no dey</DialogDescription>
          </DialogHeader>
        </DialogContent>
      ) : successSection ? (
        <DialogContent>
          <DialogHeader className='flex flex-col font-PoppinsRegular justify-center items-center'>
            <img width={700} height={700} src={'/ozons-salute.avif'} alt='Who is the problem' />
            <DialogTitle className='p-0 m-0 text-lg'>Road clear!</DialogTitle>
          </DialogHeader>
        </DialogContent>
      ) : (
        <DialogContent className="font-PoppinsRegular sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className='text-[20px]'>Beg me</DialogTitle>
            <DialogDescription className='text-base'>
              Are things that hard for you?
            </DialogDescription>
          </DialogHeader>
          <div className='grid gap-5'>
            <div className="grid items-center gap-4">
              <Label htmlFor="amount" className="text-start">
                How much?
              </Label>
              <Input
                id="amount"
                type='number'
                className="col-span-3"
                {...register("amount")}
              />
            </div>

            <div className="grid items-center gap-4">
              <Label htmlFor="talking" className="text-start">
                Talk to me
              </Label>
              <Textarea
                id="talking"
                defaultValue="Make i use am see road small"
                className="col-span-3"
                {...register("explanation")}
              />
            </div>
          </div>
          <DialogFooter>
            <Button disabled={isLoading} className='bg-darkBrown mt-3 text-white font-PoppinsRegular hover:bg-littleDarkBrown hover:text-white duration-200 transition-all' onClick={handleSubmit(onSubmit)} type="submit">
              {isLoading && (<Icon icon={'uil:spinner-alt'} className='mr-2 h-4 w-4 animate-spin' />)}
              Borrow
            </Button>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  )
}

export default Modal
