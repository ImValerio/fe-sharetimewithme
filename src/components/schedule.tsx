import React from 'react'
import Week from './week'
import { HOST } from '@/components/utils'
import { useRouter } from 'next/navigation'

interface ScheduleProps {
    schedule: Schedule
    setSchedules?: Function
    isResult?: boolean
    showSchedules?: boolean
    setShowSchedules?: Function
    calcResultSchedule?: Function
}

const Schedule: React.FC<ScheduleProps> = ({ schedule, setSchedules, calcResultSchedule, isResult = false, showSchedules = false, setShowSchedules = () => { } }) => {
    const router = useRouter()
    
    const deleteRecord = async () => {
        const resModal = confirm("Are you sure you want to remove this schedule?")
        if (!resModal) return

        const url = `${HOST}/instance/${schedule.instanceId}/${schedule.username}`
        const res = await fetch(url, { method: "DELETE" })

        if (res.status === 200 && setSchedules) {
            setSchedules((schedules: Schedule[]) => {
                const rv = [...schedules].filter(el => el.username !== schedule.username);
                if (rv.length <= 0) router.push("/")
                if (calcResultSchedule) calcResultSchedule(rv)
                return rv
            });
        }
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
            const id = `clipboard-popup-${new Date().getTime()}`;
            const popup = document.createElement('div');
            popup.innerText = 'Link copied';
            popup.classList.add("info-popup");
            popup.id = id;
            document.body.appendChild(popup);

            setTimeout(() => {
                popup.style.opacity = '1';
            }, 10);

            setTimeout(() => {
                popup.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(popup);
                }, 500);
            }, 3000);
        });
    }

    return (
        <div className={`w-full transition-apple ${isResult ? "mb-0" : "mb-8 pb-8 border-b border-white/[0.03] animate-reveal stagger-1"}`}>
            <div className='flex justify-between items-start mb-10'>
                <div className='flex flex-col text-left animate-reveal stagger-1'>
                    <h2 className={`font-bold tracking-tight leading-none ${isResult ? "text-4xl md:text-5xl text-primary" : "text-2xl text-foreground/80"}`}>
                        {schedule.username}
                    </h2>
                    {isResult && <p className='text-xs font-semibold text-foreground/30 mt-3'>Aggregated availability of the group</p>}
                </div>
                
                <div className='flex gap-4 animate-reveal stagger-2'>
                    {isResult && (
                        <>
                            <button onClick={copyToClipboard} className='text-xs font-bold px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full transition-apple active:scale-95'>
                                Copy link
                            </button>
                            <button onClick={() => setShowSchedules(!showSchedules)} className={`text-xs font-bold px-4 py-2 rounded-full transition-apple active:scale-95 ${showSchedules ? "bg-primary text-white shadow-lg" : "bg-white/5 hover:bg-white/10"}`}>
                                {showSchedules ? "Hide details" : "View participants"}
                            </button>
                        </>
                    )}
                    {!isResult && (
                        <button onClick={deleteRecord} className='text-xs font-bold text-foreground/20 hover:text-red-500 transition-apple active:scale-90'>
                            Remove
                        </button>
                    )}
                </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12'>
                {schedule.binaryWeeks.length === 0 && isResult && (
                    <p className='text-sm font-medium text-foreground/20 animate-reveal stagger-3'>Add at least two schedules to see results.</p>
                )}
                {schedule.binaryWeeks.every(week => week === "0000000") && isResult && schedule.backupWeeks && schedule.backupWeeks.map((binaryWeek, i) => (
                    <Week key={i} isCurrentWeek={i === 0} binaryWeek={binaryWeek} viewMode={true} isResult={true} isBackupWeek={true} />
                ))}
                {schedule.binaryWeeks.map((binaryWeek, i) => (
                    <Week key={i} isCurrentWeek={i === 0} binaryWeek={binaryWeek} viewMode={true} isResult={true} />
                ))}
            </div>
        </div>
    )
}

export default Schedule
