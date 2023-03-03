import React, { useEffect, useState } from 'react'
import { Video } from '@/types'
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";

import VideoButtonsCtas from '@/utils/video-buttons-ctas'

interface IProps {
    post: Video
}

const VideoCard: NextPage<IProps> = ({ post }) => {
    // console.log(post);
    const [isHovered, setIsHovered] = useState(false);

    const { videoRef, isPlaying, isMuted, pausePlayVideo, muteUnmuteVideo } = VideoButtonsCtas();

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.muted = isMuted;
        }
    }, [isMuted, videoRef]);

    return (
        <div className="flex flex-col border-b-2 border-gray-200 pb-6">
            <div>
                <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
                    <div className="md:w-16 md:h-16 w-10 h-10">
                        <Link href={`/profile/${post.postedBy._id}`}>
                            <span>
                                <Image
                                    src={post.postedBy.image}
                                    alt={`${post.postedBy.userName} profile photo`}
                                    width={64}
                                    height={64}
                                    className="rounded-full"
                                />
                            </span>
                        </Link>
                    </div>
                    <div>
                        <Link href={`/profile/${post.postedBy._id}`}>
                            <span className="flex items-center gap-2">
                                <span className="flex items-center gap-2 font-bold md:txt-md text-primary">
                                    {post.postedBy.userName}
                                    <GoVerified className="text-blue-400 text-base" />
                                </span>
                                <span className="capitalize font-medium text-xs text-gray-500 hidden md:block">
                                    {post.postedBy.userName}
                                </span>
                            </span>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="lg:ml-20 mt-4 flex gap-4">
                <div
                    className="rounded-3xl relative"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <Link href={`/detail/${post._id}`}>
                        <video
                            ref={videoRef}
                            loop
                            className="lg:w-[600px] h-[300px] md:h-[400px] lg:h-[530px] w-[200px] rounded-2xl cursor-pointer bg-gray-100"
                        >
                            <source src={post.video.asset.url} type="video/mp4" />

                            <span>
                                Your browser doesn't support HTML5 video.
                            </span>
                        </video>
                    </Link>

                    {isHovered && (
                        <div className="flex gap-10 lg:justify-between absolute bottom-6 left-8 md:left-14 lg:left-0 cursor-pointer w-[100px] md:w-[50px] p-3">
                            <button
                                className="text-black text-2xl lg:text-4xl"
                                onClick={pausePlayVideo}
                            >
                                {isPlaying ? (
                                    <BsFillPauseFill />
                                ) : (
                                    <BsFillPlayFill />
                                )}
                            </button>
                            {isMuted ? (
                                <button
                                    className="text-black text-2xl lg:text-4xl"
                                    onClick={muteUnmuteVideo}
                                >
                                    <HiVolumeOff />
                                </button>
                            ) : (
                                <button
                                    className="text-black text-2xl lg:text-4xl"
                                    onClick={muteUnmuteVideo}
                                >
                                    <HiVolumeUp />
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default VideoCard
