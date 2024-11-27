"use client"
import Alert from '@/components/alert'
import CreateInstance from '@/components/createInstance'
import Loader from '@/components/loader'
import { ALERT, isServerOff } from '@/components/utils'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Page = () => {
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showServerAlert, setShowServerAlert] = useState(false);

  useEffect(() => {
    const init = async () => {
      const res = await isServerOff();
      setShowServerAlert(res)
    };
    init()
  }, [])



  if (isLoading)
    return <Loader />


  return (
    <main className="flex min-h-screen flex-col items-center justify-between w-full ">
      <div className="z-10 w-full md:max-w-xl items-center justify-between font-mono m-5 md:m-20 text-sm lg:flex flex-col ">
        <div className='w-100 flex justify-center items-center m-2 animate__animated animate__fadeInDown'>
          <img src='logo_red.png' />
        </div>
        {error}
        <CreateInstance setError={setError} setIsLoading={setIsLoading} />

        {showServerAlert ? <Alert text="Google Cloud trial period is expired :(" type={ALERT.ERROR} /> : null}
      </div>
    </main>
  )
}
export default Page