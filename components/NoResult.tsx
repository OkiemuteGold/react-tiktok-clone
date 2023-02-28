import React from 'react'
import { MdOutlineComment } from 'react-icons/md'

interface IProps {
    text: string
}

const NoResult = ({ text }: IProps) => {
    return (
        <div className="flex flex-col justify-center items-center h-full w-full">
            <div className="text-6xl mb-3">
                <MdOutlineComment />
            </div>

            <p className="text-xl text-center">
                {text}
            </p>
        </div>
    )
}

export default NoResult
