import React, { useState, useEffect } from 'react'
import { MdFavorite } from "react-icons/md";

import useAuthStore from '@/store/authStore';

interface IProps {
    handleLike: () => void;
    handleDisLike: () => void;
    likes: any[];
}

const LikeButton = ({ handleLike, handleDisLike, likes }: IProps) => {
    const [alreadyLiked, setAlreadyLiked] = useState(false);

    const { userProfile }: any = useAuthStore();

    const filteredLikes = likes?.filter(like => like._ref === userProfile._id);

    useEffect(() => {
        filteredLikes?.length > 0
            ? setAlreadyLiked(true)
            : setAlreadyLiked(false);
    }, [likes, filteredLikes]);

    return (
        <div className="gap-6">
            <div className="mt-5 flex items-center">
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
                    {likes?.length || 0}
                </p>
            </div>
        </div>
    )
}

export default LikeButton
