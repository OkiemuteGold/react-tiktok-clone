import React, { useState } from "react";
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import VideoCard from "@/components/VideoCard";
import NoResult from "@/components/NoResult";
import { GoVerified } from "react-icons/go";

import axios from "axios";
import { BASE_URL } from "@/utils";
import { IUser, Video } from "@/types";
import useAuthStore from "@/store/authStore";

const Search = ({ videos }: { videos: Video[] }) => {
    const [isResultAccounts, setIsResultAccounts] = useState(false);

    const active = "border-b-2 border-black";

    const router = useRouter();
    const { searchTerm }: any = router.query;
    // console.log(router);

    const { allUsers } = useAuthStore();

    const searchedAccounts = allUsers.filter((user: IUser) => {
        return user.userName.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div className="w-full">
            <div className="flex gap-10 my-9 border-b-2 border-gray-200 bg-white w-full">
                <p
                    className={`font-semibold cursor-pointer mt-2 lg:mt-0 text-xl ${isResultAccounts ? active : 'text-gray-400'}`}
                    onClick={() => setIsResultAccounts(true)}
                >
                    Accounts
                </p>

                <p
                    className={`font-semibold cursor-pointer mt-2 md:mt-0 text-xl ${!isResultAccounts ? active : 'text-gray-400'}`}
                    onClick={() => setIsResultAccounts(false)}
                >
                    Videos
                </p>
            </div>

            {isResultAccounts ? (
                <div className="md:mt-10">
                    {searchedAccounts.length > 0 ? (
                        searchedAccounts.map((user: IUser) => (
                            <div key={user._id}>
                                <Link href={`/profile/${user._id}`}>
                                    <div className="flex items-center gap-3 p-2 font-semibold rounded border-b-2 border-gray-200">
                                        <div>
                                            <Image
                                                src={user.image}
                                                alt={user.userName}
                                                width={50}
                                                height={50}
                                                className="rounded-full"
                                            />
                                        </div>

                                        <div className="hidden xl:block">
                                            <p className="flex gap-1 items-center font-bold text-primary lowercase">
                                                {user.userName.replaceAll(' ', '')}
                                                <GoVerified className="text-blue-400" />
                                            </p>

                                            <p className="text-gray-400 text-xs capitalize">
                                                {user.userName}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))
                    ) : (
                        <NoResult text={`No account result for ${searchTerm}`} />
                    )}
                </div>
            ) : (
                <div className="flex flex-wrap gap-6 md:justify-start md:mt-10">
                    {videos.length > 0 ? (
                        videos.map((video: Video, index: number) => (
                            <VideoCard post={video} key={index} />
                        ))
                    ) : (
                        <NoResult text={`No video result for ${searchTerm}`} />
                    )}
                </div>
            )}
        </div>
    );
}


export const getServerSideProps = async ({
    params: { searchTerm }
}: {
    params: { searchTerm: string }
}) => {
    const { data } = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);

    return {
        props: { videos: data }
    }
}

export default Search
