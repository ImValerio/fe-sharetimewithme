import React from 'react'
import { ALERT } from './utils'

interface AlertProps {
    text?: string
    type: ALERT
}

const Alert: React.FC<AlertProps> = ({ text, type }) => {
    const isError = type === ALERT.ERROR;

    return (
        <div className={`my-8 p-6 border-l-4 ${isError ? "border-primary bg-primary/5" : "border-foreground/20 bg-muted/30"} transition-editorial`}>
            <div className='flex items-start gap-4'>
                <div className={`mt-1 h-2 w-2 shrink-0 rounded-full ${isError ? "bg-primary animate-pulse" : "bg-foreground/40"}`}></div>
                <div className='flex flex-col gap-1'>
                    <h5 className='text-[10px] uppercase tracking-[0.2em] font-black text-foreground/40'>
                        {isError ? "System Exception" : "Notice"}
                    </h5>
                    <p className='text-sm font-medium tracking-tight text-foreground/80'>
                        {text}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Alert
