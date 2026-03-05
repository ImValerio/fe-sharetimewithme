import React, { useEffect, useState } from 'react'

interface WeekProps {
    isCurrentWeek?: boolean;
    viewMode?: boolean;
    binaryWeek?: string;
    setBinaryWeek?: Function;
    isResult?: boolean;
    isFormView?: boolean;
    isBackupWeek?: boolean;
    creationDate?: string
}

const Week: React.FC<WeekProps> = ({ isCurrentWeek = false, viewMode = false, binaryWeek = "0000000", setBinaryWeek = () => { }, isResult = false, isFormView = false, creationDate, isBackupWeek = false }) => {
    const [days, setDays] = useState(new Map<String, Number>())

    const getWeekDays = (locale: string) => {
        var baseDate = new Date(Date.UTC(2017, 0, 2)); // just a Monday
        var weekDays = [];
        for (let i = 0; i < 7; i++) {
            weekDays.push(baseDate.toLocaleDateString(locale, { weekday: 'long' }));
            baseDate.setDate(baseDate.getDate() + 1);
        }
        return weekDays;
    }

    const formatDay = (day: string): string => {
        return day.substring(0, 3).toUpperCase()
    }

    const init = () => {
        const now = creationDate ? new Date(creationDate) : new Date()
        
        const tmpDays = new Map<String, Number>()
        getWeekDays("en-Us").map(day => {
            day = formatDay(day)
            tmpDays.set(day, 0);
        })

        if (isCurrentWeek && !viewMode) {
            Array.from(tmpDays.keys()).forEach((day, i) => {
                if (now.getDay() - 1 > i) {
                    tmpDays.set(day, -1)
                }
            })
        }
        
        if (viewMode) {
            Array.from(tmpDays.keys()).forEach((day, i) => {
                tmpDays.set(day, Number(binaryWeek[i]))
            })
        }
        setDays(tmpDays)
    }

    useEffect(() => {
        init()
    }, [binaryWeek])

    const toggleBtn = (day: String) => {
        if (viewMode) return

        const currentValue = days.get(day)
        if (currentValue === -1) return

        setDays((days) => {
            const rv = new Map(days.set(day, currentValue === 0 ? 1 : 0));
            let newBinaryWeek = ""
            rv.forEach((val) => newBinaryWeek = newBinaryWeek + (val === -1 ? 0 : val))
            setBinaryWeek(newBinaryWeek, isCurrentWeek ? 0 : 1)
            return rv
        })
    }

    const renderDay = (day: String, i: number) => {
        const val = days.get(day);
        let statusClass = "busy";
        if (val === 1) statusClass = "available";
        if (val === -1) statusClass = "unavailable";

        if (isResult && val === 0) return null;

        return (
            <button 
                key={`btn-${i}`} 
                className={`day-btn ${statusClass} ${isFormView ? "flex-1" : "min-w-[64px]"}`}
                disabled={val === -1}
                onClick={() => toggleBtn(day)}
            >
                {day}
            </button>
        )
    }

    return (
        <div className={`w-full flex flex-col mb-4 transition-apple`}>
            <div className='flex items-center justify-between mb-4 border-b border-white/[0.03] pb-3'>
                <h3 className='text-[10px] font-bold text-foreground/30 uppercase tracking-[0.2em]'>
                    {isCurrentWeek ? 'Current week' : 'Next week'}
                    {isBackupWeek && <span className='ml-3 text-primary'>[ Recommended ]</span>}
                </h3>
            </div>

            <div className={`flex flex-wrap gap-2 ${isFormView ? "justify-between" : "justify-start"}`}>
                {Array.from(days.keys()).map((day, i) => renderDay(day, i))}
            </div>
        </div>
    )
}

export default Week
