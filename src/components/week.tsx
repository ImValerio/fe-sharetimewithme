import React, { useEffect, useState } from 'react'

interface WeekProps {
    isCurrentWeek?: boolean;
    viewMode?: boolean;
    binaryWeek?: string;
    setBinaryWeek?: Function;
    isResult?: boolean;
    isFormView?: boolean;
    creationDate?: string
}

const Week: React.FC<WeekProps> = ({ isCurrentWeek = false, viewMode = false, binaryWeek = "0000000", setBinaryWeek = () => { }, isResult = false, isFormView = false, creationDate }) => {
    const [days, setDays] = useState(new Map<String, Number>())
    const [isMobile, setIsMobile] = useState(false)


    const basicBtn = isResult || isFormView ? "px-5 py-1 text-xl m-1 " + (isFormView ? "grow " : "") : "px-3 py-1 m-1 md:grow-0 "

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
        day = day.substring(0, isResult ? 3 : 2)
        return day.charAt(0).toUpperCase() + day.slice(1);
    }


    useEffect(() => {
        const now = creationDate ? new Date(creationDate) : new Date()

        setIsMobile(window.innerWidth <= 768)
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

    if (isResult) {
        if (binaryWeek === "0000000")
            return <></>
        return (
            <div className='w-full flex flex-col justify-center align-center my-3'>
                {isCurrentWeek
                    ? <h3 className='text-2xl'>Current week:</h3>
                    : <h3 className='text-2xl'> Next week:</h3>
                }

                <div className='flex flex-wrap justify-start max-w-2xl'>
                    {Array.from(days.keys()).map((day, i) => {
                        const val = days.get(day);
                        return <button key={`btn-${i}`} className={
                            val === 1
                                ? basicBtn + "bg-green-900 hover:bg-green-800 border-btm-green"
                                : val === -1
                                    ? basicBtn + "bg-gray-700 hover:bg-gray-600 cursor-not-allowed border-btm-gray"
                                    : basicBtn + "bg-red-900 hover:bg-red-800 border-btm-red hidden"
                        } disabled={val !== -1 ? undefined : true}

                            onClick={() => toggleBtn(day)}
                        >{day}</button>
                    })}


                </div>
            </div>
        )
    }

    if (isFormView) {

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
                                ? basicBtn + "bg-green-900 hover:bg-green-800 border-btm-green"
                                : val === -1
                                    ? basicBtn + "bg-gray-700 hover:bg-gray-600 cursor-not-allowed border-btm-gray"
                                    : basicBtn + "bg-red-900 hover:bg-red-800 border-btm-red "
                        } disabled={val !== -1 ? undefined : true}

                            onClick={() => toggleBtn(day)}
                        >{day}</button>
                    })}


                </div>
            </div>
        )
    }

    return (
        <div className='w-full flex flex-col justify-center align-center my'>
            {isCurrentWeek
                ? <h3 className='text-xl md:text-center'>{isMobile ? "Current week:" : "C"}</h3>
                : <h3 className='text-xl md:text-center'>{isMobile ? "Next week:" : "N"}</h3>
            }
            <div className='flex md:flex-col justify-around max-w-2xl'>
                {Array.from(days.keys()).map((day, i) => {
                    const val = days.get(day);
                    return <button key={`btn-${i}`} className={
                        val === 1
                            ? basicBtn + "bg-green-900 hover:bg-green-800 border-btm-green"
                            : val === -1
                                ? basicBtn + "bg-gray-700 hover:bg-gray-600 cursor-not-allowed border-btm-gray"
                                : basicBtn + "bg-red-900 hover:bg-red-800 border-btm-red"
                    } disabled={val !== -1 ? undefined : true}

                        onClick={() => toggleBtn(day)}
                    >{day}</button>
                })}


            </div>
        </div>
    )

}

export default Week