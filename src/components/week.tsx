import React, { useEffect, useState } from 'react'

interface WeekProps {
    isCurrentWeek: boolean;
    viewMode: boolean;
    binaryWeek: string;
    setBinaryWeek: Function;
}

const Week: React.FC<WeekProps> = ({ isCurrentWeek = false, setBinaryWeek, viewMode = false, binaryWeek = "0000000" }) => {
    const [days, setDays] = useState(new Map<String, Number>())


    const basicBtn = "px-5 py-1 text-xl m-1 grow md:grow-0 "

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
        day = day.substring(0, 3)
        return day.charAt(0).toUpperCase() + day.slice(1);
    }



    useEffect(() => {
        const now = new Date()

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

    }, [])


    const toggleBtn = (day: String) => {
        if (viewMode)
            return

        const currentValue = days.get(day)
        if (currentValue === -1)
            return

        setDays((days) => {
            const rv = new Map(days.set(day, currentValue === 0 ? 1 : 0));
            binaryWeek = ""
            rv.forEach((val) => binaryWeek = binaryWeek + (val === -1 ? 0 : val))
            setBinaryWeek(binaryWeek, isCurrentWeek ? 0 : 1)

            console.log(binaryWeek)
            return rv
        })

    }


    return (
        <div className='w-full flex flex-col justify-center align-center my-3'>
            {isCurrentWeek
                ? <h3 className='text-2xl'>Current week:</h3>
                : <h3 className='text-2xl'> Next week:</h3>
            }

            <div className='flex flex-wrap justify-around max-w-2xl'>
                {Array.from(days.keys()).map((day, i) => {
                    const val = days.get(day);
                    return <button key={`btn-${i}`} className={
                        val === 1
                            ? basicBtn + "bg-green-900 hover:bg-green-800"
                            : val === -1
                                ? basicBtn + "bg-gray-700 hover:bg-gray-600 cursor-not-allowed"
                                : basicBtn + "bg-red-900 hover:bg-red-800"
                    } disabled={val !== -1 ? undefined : true}

                        onClick={() => toggleBtn(day)}
                    >{day}</button>
                })}


            </div>
        </div>
    )
}

export default Week