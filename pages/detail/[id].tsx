import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'

import { GoVerified } from "react-icons/go";
import { MdOutlineCancel } from "react-icons/md";
import { BsPlay, BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";

import axios from "axios";
import { BASE_URL } from "@/utils";
import { PreventDefault, Video } from "@/types";

import VideoButtons from "@/utils/video-buttons-ctas";
import useAuthStore from "@/store/authStore";
import LikeButton from "@/components/LikeButton";
import Comments from "@/components/Comments";

interface IProps {
    postDetails: Video
}

const Detail = ({ postDetails }: IProps) => {
    const [post, setPost] = useState(postDetails);

    const [isPostingComment, setIsPostingComment] = useState(false);
    const [comment, setComment] = useState("");

    const { videoRef, isPlaying, isMuted, pausePlayVideo, muteUnmuteVideo } = VideoButtons();

    const router = useRouter();
    const { userProfile }: any = useAuthStore();

    const buttonStyle = "w-full h-full flex justify-center items-center text-white cursor-pointer hover:scale-90 transition-transform duration-75";

    useEffect(() => {
        if (post && videoRef.current) {
            videoRef.current.muted = isMuted;
        }
    }, [post, isMuted]);

    const handleLikeStatus = async (like: boolean) => {
        if (userProfile) {
            const { data } = await axios.put(`${BASE_URL}/api/like`, {
                userId: userProfile._id,
                postId: post._id,
                like
            });

            setPost({ ...post, likes: data.likes });
        }
    };

    const submitComment = async (e: PreventDefault) => {
        e.preventDefault();

        if (userProfile && comment) {
            setIsPostingComment(true);

            const { data } = await axios.put(`${BASE_URL}/api/post/${post._id}`, {
                userId: userProfile._id,
                comment
            });

            setPost({ ...post, comments: data.comments });

            setComment("");
            setIsPostingComment(false);
        }
    };

    if (!post) return null;

    return (
        <div className="flex flex-wrap lg:flex-nowrap w-full absolute left-0 top-0 bg-white overflow-hidden lg:h-[100vh]">
            {/* bg-blurred-img bg-no-repeat bg-cover bg-center */}
            <div className="relative flex justify-center items-center w-[1000px] lg:w-9/12 bg-black">
                <div className="absolute top-6 left-2 lg:left-6 flex gap-6 z-50" >
                    <p
                        className="cursor-pointer rounded-full shadow bg-black"
                        onClick={() => {
                            router.back()
                        }}
                    >
                        <MdOutlineCancel className="text-white text-[35px]" />
                    </p>
                </div>

                <div className="relative">
                    <div className="lg:h-[100vh] h-[60vh]">
                        <video
                            className="h-[100%] cursor-pointer"
                            ref={videoRef}
                            loop
                            onClick={pausePlayVideo}
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

            <div className="relative w-[1000px] md:w-[900px] lg:w-[700px] h-[100vh] overflow-y-auto">
                <div className="mt-10">
                    <div className="flex gap-3 p-2 font-semibold rounded ml-5">
                        <div className="md:w-20 md:h-20 w-16 h-16">
                            <Link href={`/profile/${post.postedBy._id}`}>
                                <>
                                    <Image
                                        src={post.postedBy.image}
                                        alt={`${post.postedBy.userName} profile photo`}
                                        width={64}
                                        height={64}
                                        className="rounded-full"
                                    />
                                </>
                            </Link>
                        </div>

                        <div>
                            <Link href={`/profile/${post.postedBy._id}`}>
                                <span className="flex  flex-col justify-center gap-2">
                                    <span className="flex items-center gap-2 font-bold md:text-base text-primary">
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

                    <div className="p-2 text-lg text-gray-500 ml-5">
                        <p>{post.caption}</p>

                        {userProfile && (
                            <LikeButton
                                likes={post.likes}
                                handleLike={() => handleLikeStatus(true)}
                                handleDisLike={() => handleLikeStatus(false)}
                            />
                        )}
                    </div>

                    <Comments
                        isPostingComment={isPostingComment}
                        comment={comment}
                        setComment={setComment}
                        submitComment={submitComment}
                        comments={post.comments}
                    />
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

export default Detail;