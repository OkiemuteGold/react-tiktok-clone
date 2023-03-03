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
    data: {
        user: IUser,
        userVideos: Video[],
        userLikedVideos: Video[]
    }
}

const Profile = ({ data }: IProps) => {
    const { user, userVideos, userLikedVideos } = data;

    return (
        <div className="w-full">
            <div className="flex gap-6 md:gap-10 mb-4 bg-white w-full">
                <div className="w-20 h-20">
                    <Image
                        src={user.image}
                        alt={user.userName}
                        width={80}
                        height={80}
                        className="rounded-full"
                    />
                </div>

                <div className="hidden xl:block">
                    <p className="flex gap-1 items-center font-bold text-primary text-lg lowercase">
                        {user.userName.replaceAll(' ', '')}
                        <GoVerified className="text-blue-400" />
                    </p>

                    <p className="text-gray-400 text-sm capitalize">
                        {user.userName}
                    </p>
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps = async ({
    params: { id }
}: {
    params: { id: string }
}) => {
    const { data } = await axios.get(`${BASE_URL}/api/profile/${id}`);

    return {
        props: { data: data }
    }
}

export default Profile;
