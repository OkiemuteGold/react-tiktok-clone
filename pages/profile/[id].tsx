import React, { useEffect, useState } from "react";
import Image from 'next/image'
// import Link from 'next/link'

import VideoCard from "@/components/VideoCard";
import { GoVerified } from "react-icons/go";

import axios from "axios";
import { BASE_URL } from "@/utils";
import { IUser, Video } from "@/types";
import NoResult from "@/components/NoResult";

interface IProps {
    profileDetails: {
        user: IUser,
        userVideos: Video[],
        userLikedVideos: Video[]
    }
}

const Profile = ({ profileDetails }: IProps) => {
    const [showUserVideos, setShowUserVideos] = useState(true);
    const [videoList, setVideoList] = useState<Video[]>([])

    const { user, userVideos, userLikedVideos } = profileDetails;

    const active = "border-b-2 border-black";

    useEffect(() => {
        showUserVideos ? setVideoList(userVideos) : setVideoList(userLikedVideos);
    }, [showUserVideos, userVideos, userLikedVideos]);

    return (
        <div className="w-full mt-2">
            <div className="flex items-center gap-6 md:gap-10 mb-4 bg-white w-full">
                <div className="w-16 h-16 md:w-24 md-h-24">
                    <Image
                        src={user.image}
                        alt={user.userName}
                        width={96}
                        height={96}
                        className="rounded-full"
                    />
                </div>

                <div>
                    <p className="flex gap-1 items-center font-bold text-primary lowercase text-lg md:text-2xl tracking-wide">
                        {user.userName.replaceAll(" ", "")}
                        <GoVerified className="text-blue-400" />
                    </p>

                    <p className="text-gray-400 text-sm md:text-base capitalize">
                        {user.userName}
                    </p>
                </div>
            </div>

            <div>
                <div className="flex gap-10 my-10 border-b-2 border-gray-200 bg-white w-full">
                    <p
                        className={`font-semibold cursor-pointer mt-2 text-xl ${showUserVideos ? active : 'text-gray-400'}`}
                        onClick={() => setShowUserVideos(true)}
                    >
                        Videos
                    </p>

                    <p
                        className={`font-semibold cursor-pointer mt-2 text-xl ${!showUserVideos ? active : 'text-gray-400'}`}
                        onClick={() => setShowUserVideos(false)}
                    >
                        Likes
                    </p>
                </div>

                <div className="flex flex-wrap gap-6 md:justify-start">
                    {videoList.length > 0 ? (
                        videoList.map((video: Video, index: number) => (
                            <VideoCard post={video} key={index} />
                        ))
                    ) : (
                        <NoResult text={`No ${showUserVideos ? '' : 'liked'} videos yet`} />
                    )}
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
    const { data } = await axios.get(`${BASE_URL}/api/profile/${id}`);

    return {
        props: { profileDetails: data }
    }
}

export default Profile;
