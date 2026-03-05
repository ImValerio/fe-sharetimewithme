"use client"
import CreateInstance from '@/components/createInstance'
import Schedule from '@/components/schedule'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { HOST } from '@/components/utils'
import Loader from '@/components/loader'

const Page = ({ params }: { params: { id: string } }) => {
    const router = useRouter()
    const instanceId = params.id
    const [isLoading, setIsLoading] = useState(true)
    const [schedules, setSchedules] = useState<Schedule[]>([])
    const [showSchedules, setShowSchedules] = useState<boolean>(false)
    const [resultWeeks, setResultWeeks] = useState<string[]>([])
    const [backupWeeks, setBackupWeeks] = useState<string[]>([])
    const [error, setError] = useState("")

    const calcResultSchedule = (schedules: Schedule[]) => {
        if (schedules.length < 2) {
            setResultWeeks([])
            return
        }

        const binaryWeeksMaps = [new Map<number, number>(), new Map<number, number>()]
        schedules.forEach(schedule => {
            schedule.binaryWeeks.forEach((binaryWeek, mapIndex) => {
                for (let i = 0; i < binaryWeek.length; i++) {
                    let value = binaryWeeksMaps[mapIndex].get(i) ?? 0;
                    let inc = Number(binaryWeek[i]) === 1 ? 1 : 0;
                    binaryWeeksMaps[mapIndex].set(i, value + inc);
                }
            })
        });

        const res = getResultWeek(binaryWeeksMaps, schedules.length);
        setResultWeeks(res)
        
        if (res.every(week => week === "0000000")) {
            let upperBound = schedules.length - 1
            let backup: string[] = []
            while (upperBound > 0 && (backup.length === 0 || backup.every(week => week === "0000000"))) {
                backup = getResultWeek(binaryWeeksMaps, upperBound)
                upperBound--;
            }
            setBackupWeeks(backup)
        } else {
            setBackupWeeks([])
        }
    }

    const getResultWeek = (binaryWeeksMaps: Map<number, number>[], upperBound: number) => {
        const rv: string[] = []
        binaryWeeksMaps.forEach(maps => {
            let resultString = "";
            Array.from(maps.values()).forEach(value => {
                resultString += (value >= upperBound) ? "1" : "0";
            });
            rv.push(resultString)
        })
        return rv
    }

    useEffect(() => {
        const checkInstanceId = async () => {
            const res = await fetch(HOST + `/instance/${instanceId}`)
            if (res.status === 200) {
                const data: Schedule[] = await res.json();
                if (data.length === 0 || !data[0].instanceId) router.push("/")
                calcResultSchedule(data)
                setSchedules([...data])
                setIsLoading(false)
                return
            }
            router.push("/")
        }
        checkInstanceId();
    }, [instanceId])

    if (isLoading) return <Loader />

    return (
        <div className='w-full max-w-5xl mx-auto px-6 py-20 flex flex-col items-center'>
            <header className='mb-24 flex flex-col items-center gap-8 w-full border-b border-white/[0.03] pb-16'>
                <div className='cursor-pointer transition-apple hover:scale-105 active:scale-95 animate-reveal' onClick={() => router.push("/")}>
                  <img className="w-20 h-20 invert opacity-90" src='logo_black.png' alt="Logo" />
                </div>
                
                <div className='flex flex-col items-center'>
                    <h2 className='text-5xl md:text-7xl font-extrabold tracking-tight mb-4 animate-reveal stagger-1'>Meeting results</h2>
                    <p className='text-sm font-medium text-foreground/40 bg-white/[0.05] px-4 py-1.5 rounded-full select-all animate-reveal stagger-2'>
                      ID: {instanceId}
                    </p>
                </div>
            </header>

            <section className='w-full mb-32 flex flex-col items-center'>
                <div className='w-full glass rounded-apple p-8 md:p-16 animate-reveal stagger-3'>
                    <Schedule 
                        schedule={{ binaryWeeks: resultWeeks, username: "Combined schedule", instanceId: instanceId, backupWeeks: backupWeeks }} 
                        isResult={true} 
                        showSchedules={showSchedules} 
                        setShowSchedules={setShowSchedules} 
                    />
                </div>

                <div className={`w-full expand-container ${showSchedules ? "open" : ""}`}>
                    <div className='expand-content'>
                        <div className='mt-24 space-y-12 pb-12'>
                            <div className='flex items-center justify-between border-b border-white/[0.03] pb-6'>
                                <h4 className='text-xl font-bold'>Individual schedules</h4>
                                <span className='text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full'>
                                    {schedules.length} participants
                                </span>
                            </div>
                            
                            <div className='grid grid-cols-1 gap-12'>
                                {schedules.map((schedule, i) => (
                                    <Schedule key={`schedule-${i}`} schedule={schedule} setSchedules={setSchedules} calcResultSchedule={calcResultSchedule} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='w-full glass rounded-apple p-8 md:p-16 relative overflow-hidden animate-reveal stagger-4'>
                <div className='flex flex-col mb-12 text-left'>
                    <h4 className='text-3xl font-extrabold tracking-tight'>Add your availability</h4>
                    <p className='text-sm font-medium text-foreground/40 mt-3'>Your schedule will be combined with the group.</p>
                </div>
                
                {error && <div className='my-6 bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-red-500 text-xs font-bold'>Error: {error}</div>}
                
                <CreateInstance 
                    instanceId={instanceId} 
                    setSchedules={setSchedules}
                    calcResultSchedule={calcResultSchedule} 
                    setError={setError} 
                    creationDate={schedules[0]?.creationDate} 
                    setIsLoading={setIsLoading} 
                />
            </section>
        </div>
    )
}

export default Page
