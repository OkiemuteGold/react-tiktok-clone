import React from "react";
import Image from 'next/image'
import Link from 'next/link'
import { GoVerified } from "react-icons/go";

import useAuthStore from "@/store/authStore";
import NoResult from "./NoResult";

const Comments = () => {
    const comments: any[] = [];

    return (
        <div className="border-y-2 border-gray-200 bg-[#f8f8f8] mt-8 px-7 pt-7 pb-[100] lg:pb-7">
            <div className="overflow-y-scroll lg:h-[200px]">
                {comments.length ? (
                    <h2>Comments</h2>
                ) : (
                    <NoResult text="No Comments" />
                )}
            </div>
        </div>
    )
}

export default Comments
