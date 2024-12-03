import React from 'react'
import { ALERT } from './utils'

interface AlertProps {
    text?: string
    type: ALERT

}

const Alert: React.FC<AlertProps> = ({ text, type }) => {

    const convertTypeIntoColor = (type: ALERT) => {
        switch (type) {
            case ALERT.ERROR:
                return "red";
            default:
                return "transparent"
        }


    }

    const generateClassName = () => {

        const color = convertTypeIntoColor(type);

        return `text-xs bg-${color}-900 rounded-md px-3 py-1 m-5`
    }

    return (
        <div className={generateClassName()}>
            {text}
        </div>
    )
}

export default Alert