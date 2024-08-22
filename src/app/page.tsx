"use client"
import Week from '@/components/week'
import React, { useEffect, useState } from 'react'
const Page = () => {
  const [binaryWeeks, setBinaryWeeks] = useState(["0000000", "0000000"])
  const setBinaryWeek = (binaryWeek: string, i: number) => {
    const newBinaryWeeks = [...binaryWeeks];
    newBinaryWeeks[i] = binaryWeek;
    setBinaryWeeks(newBinaryWeeks);
  }
  const [username, setUsername] = useState("")

  useEffect(() => {

  }, [])


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(binaryWeeks)
    if (!username)
      return
    const host = process.env.API_HOST ? process.env.API_HOST : "http://localhost:8080"
    const res = await fetch(host + "/generate",
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ username, binaryWeeks })
      })

    console.log(res)
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between w-full">
      <div className="z-10 w-full md:max-w-xl items-center justify-between font-mono m-5 md:m-20 text-sm lg:flex flex-col">
        <div className='w-100 flex justify-center items-center m-2'>
          <img src='logo_lg_blu.png'></img>
        </div>
        <div className='mx-5 md:mx-0'>
          {binaryWeeks.length > 0 && binaryWeeks.map((week, i) => {

            if (i === 0) {
              return <Week key={`binaryweek-${i}`} isCurrentWeek={true} setBinaryWeek={setBinaryWeek} />
            }

            return <Week key={`binaryweek-${i}`} isCurrentWeek={false} setBinaryWeek={setBinaryWeek} />
          })}
          <form onSubmit={(e) => handleSubmit(e)} className='flex w-full flex-wrap'>
            <input type="text" className='flex grow text-2xl p-1 text-black' placeholder='Name...' onChange={(e) => setUsername(e.target.value)} value={username} />
            <button className='bg-gray-900 hover:bg-gray-800 px-3 py-1 text-2xl md:grow-0 md:w-auto grow my-2 md:my-0'>CREATE</button>
          </form>
        </div>

      </div>
      <footer className='w-full p-2 bg-gray-900 text-white text-center'>Made with ❤️ by <a href='www.valeriovalletta.it'>Valerio Valletta</a></footer>
    </main>
  )
}
export default Page