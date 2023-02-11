import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import GoogleLogin from "react-google-login";
import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";
import { useState } from 'react';

const Sidebar = () => {
    const [showSidebar, setShowSidebar] = useState(true);

    return (
        <div>
            <div className="block xl:hidden m-2 ml-4 mt-3 text-xl">
                {
                    showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />
                }
            </div>
        </div>
    )
}

export default Sidebar
