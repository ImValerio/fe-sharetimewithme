"use client"
import { useState } from 'react'
import Week from './week'
import { useRouter } from 'next/navigation'
import { HOST } from '@/app/layout'
interface CreateInstanceProps {
    instanceId?: string
    setSchedules?: Function
    calcResultSchedule?: Function
    setError: Function
}
const CreateInstance: React.FC<CreateInstanceProps> = ({ instanceId = null, setSchedules, calcResultSchedule, setError }) => {

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
        const path = instanceId ? "/instance" : "/generate"
        const schedule = { instanceId, username, binaryWeeks }
        const res = await fetch(HOST + path,
            {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(schedule)
            })

        setUsername("")
        if (res.status !== 200) {
            const error = await res.text()
            setError(error)
            return
        }

        setError("")
        const data: GenerateInstance = await res.json();

        if (instanceId && setSchedules) {

            setSchedules((schedules: Schedule[]) => {

                const rv = [...schedules, schedule]
                if (calcResultSchedule)
                    calcResultSchedule(rv)
                return rv
            })
        }
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