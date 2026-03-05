"use client"
import { useState } from 'react'
import Week from './week'
import { useRouter } from 'next/navigation'
import { HOST } from '@/components/utils'

interface CreateInstanceProps {
    instanceId?: string
    setSchedules?: Function
    calcResultSchedule?: Function
    setError: Function
    setIsLoading: Function
    creationDate?: string
}

const CreateInstance: React.FC<CreateInstanceProps> = ({ instanceId = null, setSchedules, calcResultSchedule, setError, creationDate, setIsLoading }) => {
    const router = useRouter()
    const [binaryWeeks, setBinaryWeeks] = useState(["0000000", "0000000"])
    const [username, setUsername] = useState("")

    const setBinaryWeek = (binaryWeek: string, i: number) => {
        const newBinaryWeeks = [...binaryWeeks];
        newBinaryWeeks[i] = binaryWeek;
        setBinaryWeeks(newBinaryWeeks);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!username) return
        setIsLoading(true)
        
        const schedule = { instanceId, username, binaryWeeks }
        const res = await fetch(HOST + "/instance", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(schedule)
        })

        setUsername("")
        if (res.status !== 200) {
            const error = await res.text()
            setError(error)
            setIsLoading(false)
            return
        }

        setError("")
        const data: GenerateInstance = await res.json();

        if (instanceId && setSchedules) {
            setSchedules((schedules: Schedule[]) => {
                const rv = [...schedules, schedule]
                if (calcResultSchedule) calcResultSchedule(rv)
                return rv
            })
            setIsLoading(false)
        } else {
            router.push(`/${data.instanceId}`)
        }
    }

    return (
        <div className='w-full py-2 px-0 transition-apple text-left'>
            <div className='mb-12'>
                <h2 className='text-3xl md:text-4xl font-extrabold tracking-tight mb-3'>
                    {instanceId ? "Join the meeting" : "Create a schedule"}
                </h2>
                <p className='text-foreground/40 text-sm font-medium'>
                    Select the days you are available to meet.
                </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                {binaryWeeks.map((week, i) => (
                    <Week 
                        key={`binaryweek-${i}`} 
                        isCurrentWeek={i === 0} 
                        setBinaryWeek={setBinaryWeek} 
                        viewMode={false} 
                        isFormView={true} 
                        creationDate={creationDate} 
                    />
                ))}
            </div>

            <form onSubmit={handleSubmit} className='mt-16 flex flex-col gap-8 items-start'>
                <div className='w-full'>
                    <label className='text-[11px] font-bold text-foreground/40 mb-3 block uppercase tracking-widest'>Your Name</label>
                    <input 
                        type="text" 
                        className='input-apple' 
                        placeholder='Enter your name' 
                        onChange={(e) => setUsername(e.target.value)} 
                        value={username} 
                    />
                </div>
                <button className='button-apple self-end'>
                    {instanceId ? "Add availability" : "Create link"}
                </button>
            </form>
        </div>
    )
}

export default CreateInstance
