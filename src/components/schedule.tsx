import React from 'react'
import Week from './week'

interface ScheduleProps {
    schedule: Schedule
}

const Schedule: React.FC<ScheduleProps> = ({ schedule }) => {
    return <div className='m-2 bg-gray-800 flex flex-col rounded' >
        <div className='flex justify-end py-2 bg-gray-900'>
            <h2 className='text-2xl uppercase font-bold tracking-wider mx-2'>{schedule.username}</h2>
        </div>
        <div className='flex flex-col p-1'>
            {schedule.binaryWeeks.map((binaryWeek, i) => {
                return (
                    <Week key={i} isCurrentWeek={i === 0 ? true : false} binaryWeek={binaryWeek} viewMode={true} />
                )

            })}

        </div>
    </div>
}

export default Schedule