import React from 'react'
// BiCommentX
import { MdOutlineComment, MdOutlineVideocamOff } from 'react-icons/md'

interface IProps {
    text: string
}

const NoResult = ({ text }: IProps) => {
    return (
        <div className="flex flex-col justify-center items-center h-full w-full">
            <div className="text-7xl mb-[10px]">
                {text.toLowerCase() === "no comments yet" ? (
                    <MdOutlineComment />
                ) : (
                    <MdOutlineVideocamOff />
                )}
            </div>

            <p className="text-xl text-center">{text}</p>
        </div>
    );
}

export default NoResult
