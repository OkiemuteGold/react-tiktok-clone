import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { createOrGetUser } from '@/utils';
import { AiOutlineLogout } from "react-icons/ai";

import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";

import Logo from '../utils/tiktik-logo.png';

const Navbar = () => {
    const user = false;

    return (
        <div className="w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4">
            <Link href="/">
                <div className="w-[100px] md:w-[130px]">
                    <Image className="logo cursor-pointer" src={Logo} alt="TikTik logo" layout="responsive" />
                </div>
            </Link>

            <div>Search</div>

            <div>
                {user ? (
                    <div>User Name</div>
                ) : (
                    <GoogleLogin
                        onSuccess={response => {
                            createOrGetUser(response)
                            console.log(response);
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                    />
                )}
            </div>
        </div>
    )
}

export default Navbar

