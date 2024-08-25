import React, { useState } from 'react'
import Week from './week'
import { HOST } from '@/app/layout'
import Modal from './modal'

interface ScheduleProps {
    schedule: Schedule
    setSchedules?: Function
    isResult?: boolean
    showSchedules?: boolean
    setShowSchedules?: Function
    calcResultSchedule?: Function
}

const Schedule: React.FC<ScheduleProps> = ({ schedule, setSchedules, calcResultSchedule, isResult = false, showSchedules = false, setShowSchedules = () => { } }) => {

    const deleteRecord = async () => {
        const resModal = confirm("Do you really want to delete this schedule?")
        if (!resModal)
            return

        const url = `${HOST}/instance/${schedule.instanceId}/${schedule.username}`

        const res = await fetch(url, { method: "DELETE" })

        if (res.status === 200 && setSchedules) {
            setSchedules((schedules: Schedule[]) => {
                const rv = [...schedules].filter(el => el.username !== schedule.username);
                if (calcResultSchedule)
                    calcResultSchedule(rv)

                return rv
            });
        }
    }


    if (isResult) {

        return <div className='m-2 bg-gray-800 flex flex-col rounded' >
            <div className='flex justify-between py-2 bg-blue-900'>
                <h2 className='text-2xl uppercase font-bold tracking-wider mx-2'>{schedule.username}</h2>
                <div>
                    <button onClick={() => {
                        navigator.clipboard.writeText(window.location.href).then(() => {
                            const id = `clipboard-popup-${new Date().getTime()}`;
                            const popup = document.createElement('div');
                            popup.innerText = 'URL copied to clipboard!';
                            popup.classList.add("info-popup");
                            popup.id = id;
                            popup.style.opacity = '0';
                            document.body.appendChild(popup);

                            // Transition for appearing
                            setTimeout(() => {
                                popup.style.transition = 'opacity 0.5s';
                                popup.style.opacity = '1';
                            }, 10);

                            // Transition for disappearing
                            setTimeout(() => {
                                popup.style.opacity = '0';
                                setTimeout(() => {
                                    document.body.removeChild(popup);
                                }, 500); // Match the transition duration
                            }, 3000);
                        });
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-share"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>
                    </button>
                    <button onClick={() => setShowSchedules(!showSchedules)} className='text-2xl uppercase font-bold tracking-wider mx-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-info"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                    </button>
                </div>

            </div>
            <div className='flex flex-col p-1'>
                {schedule.binaryWeeks.length < 2 && <h1 className='text-xl p-2'>Can&apos;t calculate result with just one schedule :(</h1>}
                {schedule.binaryWeeks.map((binaryWeek, i) => {
                    return (
                        <Week key={i} isCurrentWeek={i === 0 ? true : false} binaryWeek={binaryWeek} viewMode={true} isResult={true} />
                    )

                })}

            </div>
        </div>
    }

    return (
        <div className='m-2 bg-gray-800 flex flex-col rounded' >
            <div className='flex justify-between items-center bg-gray-900'>
                <h2 className='text-xl uppercase font-bold tracking-wider mx-2 p-1'>{schedule.username}</h2>
                <span className='bg-red-700 h-full px-2 py-1' onClick={() => deleteRecord()}>X</span>
            </div>
            <div className='flex w-100 p-1 flex-col md:flex-row'>
                {schedule.binaryWeeks.map((binaryWeek, i) => {
                    return (
                        <Week key={i} isCurrentWeek={i === 0 ? true : false} binaryWeek={binaryWeek} viewMode={true} />
                    )

                })}

            </div>
        </div>
    )
}

export default Schedule