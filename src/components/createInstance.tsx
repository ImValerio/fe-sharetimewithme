"use client"
import { useState } from 'react'
import Week from './week'
import { useRouter } from 'next/navigation'
interface CreateInstanceProps {
    instanceId?: string
}
export const PROD_HOST = "https://be-sharetimewithme-7gjrwponva-uc.a.run.app"
const CreateInstance: React.FC<CreateInstanceProps> = ({ instanceId = null }) => {

    const router = useRouter()
    const [binaryWeeks, setBinaryWeeks] = useState(["0000000", "0000000"])
    const setBinaryWeek = (binaryWeek: string, i: number) => {
        const newBinaryWeeks = [...binaryWeeks];
        newBinaryWeeks[i] = binaryWeek;
        setBinaryWeeks(newBinaryWeeks);
    }
    const [username, setUsername] = useState("")


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!username)
            return
        const host = process.env.API_HOST ? process.env.API_HOST : PROD_HOST
        console.log(host)
        const path = instanceId ? "/instance" : "/generate"
        const res = await fetch(host + path,
            {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ instanceId, username, binaryWeeks })
            })

        const data: GenerateInstance = await res.json();

        if (instanceId)
            location.reload()
        else
            router.push(`/${data.instanceId}`)
    }

    return (

        <div className='mx-5 md:mx-0'>
            {binaryWeeks.length > 0 && binaryWeeks.map((week, i) => {

                if (i === 0) {
                    return <Week key={`binaryweek-${i}`} isCurrentWeek={true} setBinaryWeek={setBinaryWeek} viewMode={false} isResult={true} />
                }

                return <Week key={`binaryweek-${i}`} setBinaryWeek={setBinaryWeek} viewMode={false} isResult={true} />
            })}
            <form onSubmit={(e) => handleSubmit(e)} className='flex w-full flex-wrap'>
                <input type="text" className='flex grow text-2xl p-1 text-black' placeholder='Name...' onChange={(e) => setUsername(e.target.value)} value={username} />
                <button className='bg-gray-900 hover:bg-gray-800 px-3 py-1 text-2xl md:grow-0 md:w-auto grow my-2 md:my-0'>{instanceId ? "ADD" : "CREATE"}</button>
            </form>
        </div>


    )
}

export default CreateInstance