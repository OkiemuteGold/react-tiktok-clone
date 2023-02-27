import React, { useState, useEffect } from 'react'
import { MdFavorite } from "react-icons/md";

import useAuthStore from '@/store/authStore';

interface IProps {
    handleLike: () => void;
    handleDisLike: () => void;
}

const LikeButton = ({ handleLike, handleDisLike }: IProps) => {
    const [alreadyLiked, setAlreadyLiked] = useState(true);

    const { userProfile } = useAuthStore();

    return (
        <div className="gap-6">
            <div className="mt-4 flex items-center">
                {alreadyLiked ? (
                    <div className="bg-primary rounded-full p-2 md:p-4 text-[#f51997] cursor-pointer" onClick={handleDisLike}>
                        <MdFavorite className="text-lg md:text-2xl" />
                    </div>
                ) : (
                    <div className="bg-primary rounded-full p-2 md:p-4 cursor-pointer" onClick={handleLike}>
                        <MdFavorite className="text-lg md:text-2xl" />
                    </div>
                )}

                <p className="ml-2 font-semibold">
                    Like?.length || 0
                </p>
            </div>
        </div>
    )
}

export default LikeButton
