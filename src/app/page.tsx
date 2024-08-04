"use client"
import Week from '@/components/week'
import React, { useEffect, useState } from 'react'
const page = () => {
  const binaryWeeks: string[] = ["0000000", "0000000"];
  const setBinaryWeek = (binaryWeek: string, i: number) => {
    binaryWeeks[i] = binaryWeek
    console.log(binaryWeeks)
  }
  const [name, setName] = useState("")

  useEffect(() => {

  }, [])


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name)
      return

    const res = await fetch("http://localhost:8080",
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ test: "ciao" })
      })
    console.log(res)
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-xl items-center justify-between font-mono text-sm lg:flex flex-col">


        {binaryWeeks.length > 0 && binaryWeeks.map((week, i) => {

          if (i === 0) {
            return <Week isCurrentWeek={true} setBinaryWeek={setBinaryWeek} />
          }

          return <Week isCurrentWeek={false} setBinaryWeek={setBinaryWeek} />
        })}

        <form onSubmit={(e) => handleSubmit(e)} className='flex w-full flex-wrap'>
          <input type="text" className='flex grow text-2xl p-1 ' placeholder='Name...' onChange={(e) => setName(e.target.value)} value={name} />
          <button className='bg-gray-900 hover:bg-gray-800 px-3 py-1 text-2xl md:grow-0 md:w-auto  grow'>CREATE</button>
        </form>
      </div>
    </main>
  )
}
export default page