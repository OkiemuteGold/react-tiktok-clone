import React, { useEffect } from 'react'
import useAuthStore from '@/store/authStore'

import { IUser } from '@/types';
import Link from 'next/link';
import Image from 'next/image';

import { GoVerified } from "react-icons/go";

const SuggestedAccounts = () => {
    const { fetchAllUsers, allUsers } = useAuthStore();

    const users = allUsers.slice(0, 5);

    useEffect(() => {
        fetchAllUsers();
    }, [fetchAllUsers]);

    return (
        <div className="xl:border-b-2 border-gray-200 pb-4">
            <h2 className="text-base text-gray-500 font-semibold m-3 mt-4 hidden xl:block">
                Suggested Accounts
            </h2>

            <div>
                {users.map((user: IUser) => (
                    <Link href={`/profile/${user._id}`} key={user._id}>
                        <div className="flex items-center gap-3 hover:bg-primary p-2 font-semibold rounded cursor-pointer">
                            <div className="w-8 h-8">
                                <Image
                                    src={user.image}
                                    alt={user.userName}
                                    width={34}
                                    height={34}
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
                ))}
            </div>
        </div>
    )
}

export default SuggestedAccounts
