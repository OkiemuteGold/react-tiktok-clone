import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { createOrGetUser } from '@/utils';
import { AiOutlineLogout } from "react-icons/ai";

import { IoMdAdd } from "react-icons/io";

import Logo from '../utils/tiktik-logo.png';
import useAuthStore from '@/store/authStore';

import Search from './Search';

interface IProps {
    userProfile: any;
    addUser: any;
    removeUser: () => void;
}

const Navbar = () => {
    const [isLoading, setIsLoading] = useState({
        status: false,
        message: "",
    });

    const { userProfile, addUser, removeUser }: IProps = useAuthStore();

    const setLoadingMessage = (actionType: string, myFunc: any) => {
        if (actionType === 'login') {
            setIsLoading({ status: true, message: "Logging in..." });
        } else if (actionType === 'logout') {
            setIsLoading({ status: true, message: "Logging out..." });
        }

        setTimeout(() => {
            myFunc();
            setIsLoading({ status: false, message: "" });
        }, 1000);
    }

    const logUserIn = (response: any, actionType: string) => {
        const handleLogin = () => createOrGetUser(response, addUser);
        setLoadingMessage(actionType, handleLogin);
    };

    const logUserOut = (actionType: string) => {
        const handleLogout = () => {
            googleLogout();
            removeUser();
        }
        setLoadingMessage(actionType, handleLogout);
    };

    // const googleLoginButtonStyle = "cursor-pointer text-lg bg-white text-[#f51997] border-[1px] border-[#f51997] hover:bg-[#f51997] hover:text-white outline-none rounded-md font-semibold px-6 p-3 mt-3 w-full"

    return (
        <div className="w-full flex justify-between items-center border-b-2 border-gray-200 py-2 lg:py-3 px-3 md:px-4">
            <Link href="/">
                <div className="w-[100px] md:w-[130px]">
                    <Image
                        className="logo cursor-pointer"
                        src={Logo}
                        alt="TikTik logo"
                    />
                </div>
            </Link>

            <Search />

            <div>
                {isLoading.status ? (
                    <span className="flex font-semibold text-base">
                        {isLoading.message}
                    </span>
                ) : (
                    <>
                        {userProfile ? (
                            <div className="flex items-center gap-4 md:gap-8 lg:gap-10">
                                <Link href="/upload">
                                    <span className="flex items-center gap-2 border-2 py-0.5 px-2 md:px-4 text-base font-semibold rounded hover:border-gray-300" aria-label="Upload video">
                                        <IoMdAdd className="text-xl" />

                                        <span className="hidden sm:inline-flex">
                                            Upload
                                        </span>
                                    </span>
                                </Link>

                                {userProfile.image && (
                                    <Link href={`/profile/${userProfile._id}`} key={userProfile._id}>
                                        <span>
                                            <Image
                                                src={userProfile.image}
                                                alt={`${userProfile.userName} profile photo`}
                                                width={40}
                                                height={40}
                                                className="rounded-full cursor-pointer hover-border-round"
                                            />
                                        </span>
                                    </Link>
                                )}

                                <button
                                    type="button" className="rounded-full hover-border-round"
                                    onClick={() => logUserOut("logout")}
                                >
                                    <AiOutlineLogout
                                        color="red"
                                        fontSize={22}
                                    />
                                </button>
                            </div>
                        ) : (
                            <GoogleLogin
                                onSuccess={(response) => {
                                    logUserIn(response, "login");
                                }}
                                onError={() => {
                                    console.log("Login Failed");
                                }}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default Navbar

