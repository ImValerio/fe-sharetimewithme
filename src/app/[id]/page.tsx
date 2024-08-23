"use client"
// import CreateInstance from '@/components/createInstance'
import Week from '@/components/week'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Page = ({ params }: { params: { id: string } }) => {

    const router = useRouter()

    const [isLoading, setIsLoading] = useState(true)
    const [schedules, setSchedules] = useState<Instance[]>([])

    useEffect(() => {
        const checkInstanceId = async () => {
            const host = process.env.API_HOST ? process.env.API_HOST : "http://localhost:8080"
            const res = await fetch(host + `/instance/${params.id}`)
            if (res.status === 200) {
                const data: Instance[] = await res.json();

                if (data.length === 0 || !data[0].instanceId)
                    router.push("/")

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
            <div className='w-full h-full flex justify-center items-center'>
                <h1 className='text-3xl'>Loading...</h1>
            </div>
        )
    }

    return (
        <div className='w-full h-full flex justify-center items-center'>
            {schedules.map((schedule, i) => {
                console.log(schedule)

                return <div className='m-2 bg-gray-800 flex flex-col rounded' key={i}>
                    <div className='flex justify-end py-2 bg-gray-900'>
                        <h2 className='text-2xl uppercase font-bold tracking-wider mx-2'>{schedule.username}</h2>
                    </div>
                    <div className='flex flex-col p-1'>
                        {schedule.binaryWeeks.map((binaryWeek, i) => {
                            return (
                                <Week key={i} isCurrentWeek={i === 0 ? true : false} binaryWeek={binaryWeek} viewMode={true} setBinaryWeek={() => { }} />
                            )

                        })}

                    </div>
                </div>
            })}

            {/* <CreateInstance /> */}

        </div>
    )
}

export default Page