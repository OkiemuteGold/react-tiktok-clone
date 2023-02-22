import React, { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'

import { GoVerified } from "react-icons/go";
import { MdOutlineCancel } from "react-icons/md";
import { BsPlay, BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";

import axios from "axios";
import { BASE_URL } from "@/utils";
import { Video } from "@/types";

interface IProps {
    postDetails: Video
}

const Detail = ({ postDetails }: IProps) => {
    const [post, setPost] = useState(postDetails);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);

    const videoRef = useRef<HTMLVideoElement>(null);

    const buttonStyle = "w-full h-full flex justify-center items-center text-white cursor-pointer hover:scale-90 transition-transform duration-75";

    const pausePlayVideo = () => {
        if (isPlaying) {
            videoRef.current?.pause();
            setIsPlaying(false);
        } else {
            videoRef.current?.play();
            setIsPlaying(true);
        }
    };

    const muteUnmuteVideo = () => {
        console.log(videoRef);

        if (isMuted) {
            !videoRef.current?.muted;
            setIsMuted(false);
        } else {
            videoRef.current?.muted;
            setIsMuted(true);
        }
    };

    if (!post) return null;

    return (
        <div className="flex flex-wrap lg:flex-nowrap w-full absolute left-0 top-0 bg-white">
            {/* bg-blurred-img bg-no-repeat bg-cover bg-center */}
            <div className="relative flex justify-center items-center flex-1 w-[1000px] lg:w-9/12 bg-black">
                <div className="absolute top-6 left-2 lg:left-6 flex gap-6 z-50">
                    <p>
                        <MdOutlineCancel className="text-white text-[35px]" />
                    </p>
                </div>

                <div className="relative">
                    <div className="lg:h-[100vh] h-[60vh]">
                        <video
                            className="h-[100%]"
                            ref={videoRef}
                            loop
                            onClick={() => { }}
                        >
                            <source src={post.video.asset.url} />

                            <p>Your browser does not support this video</p>
                        </video>
                    </div>

                    <div className="absolute top-[45%] left-[45%] bg-gray-400 shadow-xl rounded-full w-[80px] h-[80px]">
                        <button
                            className={`${buttonStyle} text-4xl lg:text-6xl`}
                            onClick={pausePlayVideo}
                        >
                            {isPlaying ? (
                                <BsFillPauseFill />
                            ) : (
                                <BsFillPlayFill />
                            )}
                        </button>
                    </div>

                    <div className="absolute bottom-10 right-10 bg-black rounded-full w-[45px] h-[45px]">
                        <button
                            className={`${buttonStyle} text-xl lg:text-2xl`}
                            onClick={muteUnmuteVideo}
                        >
                            {isMuted ? (
                                <HiVolumeOff />
                            ) : (
                                <HiVolumeUp />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export const getServerSideProps = async ({
    params: { id }
}: {
    params: { id: string }
}) => {
    const { data } = await axios.get(`${BASE_URL}/api/post/${id}`);

    return {
        props: { postDetails: data }
    }
}

export default Detail