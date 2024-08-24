"use client"
import CreateInstance from '@/components/createInstance'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Page = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between w-full">
      <div className="z-10 w-full md:max-w-xl items-center justify-between font-mono m-5 md:m-20 text-sm lg:flex flex-col">
        <div className='w-100 flex justify-center items-center m-2'>
          <img src='logo_lg_blu.png' />
        </div>
        <CreateInstance />

      </div>
    </main>
  )
}
export default Page