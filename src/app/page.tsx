"use client"
import CreateInstance from '@/components/createInstance'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Page = () => {
  const router = useRouter()
  const [binaryWeeks, setBinaryWeeks] = useState(["0000000", "0000000"])
  const setBinaryWeek = (binaryWeek: string, i: number) => {
    const newBinaryWeeks = [...binaryWeeks];
    newBinaryWeeks[i] = binaryWeek;
    setBinaryWeeks(newBinaryWeeks);
  }
  const [username, setUsername] = useState("")

  return (
    <main className="flex min-h-screen flex-col items-center justify-between w-full">
      <div className="z-10 w-full md:max-w-xl items-center justify-between font-mono m-5 md:m-20 text-sm lg:flex flex-col">
        <div className='w-100 flex justify-center items-center m-2'>
          <img src='logo_lg_blu.png'></img>
        </div>
        <CreateInstance />

      </div>
      <footer className='w-full p-2 bg-gray-900 text-white text-center'>Made with ❤️ by <a href='https://www.valeriovalletta.it'>Valerio Valletta</a></footer>
    </main>
  )
}
export default Page