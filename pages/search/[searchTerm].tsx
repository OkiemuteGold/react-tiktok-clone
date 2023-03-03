import React, { useState } from "react";
import Image from 'next/image'
import Link from 'next/link'

import VideoCard from "@/components/VideoCard";
import NoResult from "@/components/NoResult";
import { GoVerified } from "react-icons/go";

import axios from "axios";
import { BASE_URL } from "@/utils";
import { IUser, Video } from "@/types";

const Search = ({ videos }: { videos: Video[] }) => {
    const [isResultAccounts, setIsResultAccounts] = useState(false);
    const active = "border-b-2 border-black";

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
                <div>Accounts</div>
            ) : (
                <div>
                    Videos
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
