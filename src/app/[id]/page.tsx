import CreateInstance, { PROD_HOST } from '@/components/createInstance'
import Schedule from '@/components/schedule'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Page = ({ params }: { params: { id: string } }) => {

    const router = useRouter()

    const instanceId = params.id
    const [isLoading, setIsLoading] = useState(true)
    const [schedules, setSchedules] = useState<Schedule[]>([])

    useEffect(() => {
        const checkInstanceId = async () => {
            const host = process.env.API_HOST ? process.env.API_HOST : PROD_HOST
            const res = await fetch(host + `/instance/${instanceId}`)
            if (res.status === 200) {
                const data: Schedule[] = await res.json();

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
        <div className='w-full h-full flex justify-center items-center flex-col'>
            <div className='overflow-y-auto'>
                {schedules.map((schedule, i) => {
                    return <Schedule key={`schedule-${i}`} schedule={schedule} />
                })}
            </div>


            <CreateInstance instanceId={instanceId} />

        </div >
    )
}

export default Page