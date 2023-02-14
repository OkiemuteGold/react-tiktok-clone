import React, { useState, useEffect } from 'react'
import { Video } from '@/types'
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { BsPlay, BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";

interface IProps {
    post: Video
}

const VideoCard: NextPage<IProps> = ({ post }) => {
    console.log(post);

    return (
        <div className="flex flex-col border-b-2 border-gray-200 pb-6">
            <div>
                <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
                    <div className="md:w-16 md:h-16 w-10 h-10">
                        <Link href="/">
                            <>
                                <Image
                                    src={post.postedBy.image}
                                    alt={`${post.postedBy.userName} profile photo`}
                                    width={62}
                                    height={62}
                                    className="rounded-full"
                                    layout="responsive"
                                />
                            </>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoCard
