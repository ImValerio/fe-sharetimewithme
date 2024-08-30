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
        let rv: string[] = []

        schedules.forEach(schedule => {
            schedule.binaryWeeks.forEach((binaryWeek, mapIndex) => {

                for (let i = 0; i < binaryWeek.length; i++) {
                    let value = 0;
                    let inc = 0
                    value = binaryWeeksMaps[mapIndex].get(i) ?? 0;
                    if (Number(binaryWeek[i]) === 1)
                        inc = 1
                    binaryWeeksMaps[mapIndex].set(i, value + inc);
                }

            })

        });


        setResultWeeks(getResultWeek(binaryWeeksMaps, schedules.length))
        if (resultWeeks.every(week => week === "0000000")) {
            let upperBound = schedules.length - 1
            let rv: string[] = []
            while (upperBound > 0 && (rv.length === 0 || rv.every(week => week === "0000000"))) {
                rv = getResultWeek(binaryWeeksMaps, upperBound)
                upperBound--;
            }

            setBackupWeeks(rv)
        } else {
            setBackupWeeks([])
        }


    }

    const getResultWeek = (binaryWeeksMaps: Map<number, number>[], upperBound: number) => {
        const rv: string[] = []
        binaryWeeksMaps.map(maps => {
            let resultString = "";
            Array.from(maps.values()).forEach(value => {
                resultString += (value === upperBound) ? "1" : "0";
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

                if (data.length === 0 || !data[0].instanceId)
                    router.push("/")

                calcResultSchedule(data)
                setSchedules([...data])

                setIsLoading(false)
                return
            }

            router.push("/")

        }

        checkInstanceId();
    }, [])


    if (isLoading) {
        return (
            <Loader />
        )
    }

    return (
        <div className='w-full h-full flex justify-center items-center '>
            <div className='h-full w-full flex-col max-w-2xl justify-center items-center'>
                <Schedule schedule={{ binaryWeeks: resultWeeks, username: "RESULT", instanceId: "", backupWeeks: backupWeeks }} isResult={true} showSchedules={showSchedules} setShowSchedules={setShowSchedules} />
                {showSchedules && <div className='overflow-y-auto w-full flex justify-around '>
                    {schedules.map((schedule, i) => {
                        return <Schedule key={`schedule-${i}`} schedule={schedule} setSchedules={setSchedules} calcResultSchedule={calcResultSchedule} />
                    })}
                </div>}

                {error &&
                    <div className='my-2'>
                        <span className='text-red-500'>ERROR: </span>{error}
                    </div>
                }
                <CreateInstance instanceId={instanceId} setSchedules={setSchedules}
                    calcResultSchedule={calcResultSchedule} setError={setError} creationDate={schedules[0].creationDate} setIsLoading={setIsLoading} />
            </div>
        </div >
    )
}

export default Page