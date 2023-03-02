import React, { Dispatch, SetStateAction, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";

import useAuthStore from "@/store/authStore";
import NoResult from "./NoResult";
import { IUser } from "@/types";

interface IProps {
    isPostingComment: boolean;
    comment: string;
    setComment: Dispatch<SetStateAction<string>>;
    submitComment: (e: FormEvent) => void;
    comments: IComment[];
}

interface IComment {
    comment: string;
    length?: number;
    _key: string;
    postedBy: {
        _ref: string;
        _id: string;
    };
}

const Comments = ({
    isPostingComment,
    comment,
    setComment,
    submitComment,
    comments,
}: IProps) => {
    const { userProfile, allUsers }: any = useAuthStore();

    return (
        <div>
            <div className="border-y-2 border-gray-200 bg-[#f8f8f8] mt-5 px-7 pt-7 pb-[100] lg:pb-7">
                <div className="overflow-y-scroll lg:h-[175px]">
                    {comments?.length ? (
                        comments.map((item, index) => (
                            <>
                                {allUsers.map((user: IUser) => (
                                    user._id === (item.postedBy._id || item.postedBy._ref) && (
                                        <div className="p-2 items-center" key={index}>
                                            <Link href={`/profile/${user._id}`}>
                                                <div className="flex items-center gap-3">
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

                                            <div className="mt-3">
                                                <p>{item.comment}</p>
                                            </div>
                                        </div>
                                    )
                                ))}
                            </>
                        ))
                    ) : (
                        <NoResult text="No comments yet" />
                    )}
                </div>
            </div>

            {userProfile && (
                <div className="pt-5 pb-6 px-2 md:px-10">
                    <form
                        className="relative flex gap-4 w-full"
                        onSubmit={submitComment}
                    >
                        <textarea
                            name="comment"
                            id="comment"
                            rows={3}
                            placeholder="Add comment..."
                            value={comment}
                            onChange={(e) => {
                                setComment(e.target.value);
                            }}
                            className="bg-primary py-4 pr-[155px] pl-5 border-2 border-gray-200 focus:outline-none focus:border-gray-300 
                            focus:bg-transparent hover:border-gray-300 rounded-lg w-[300px] flex-1 resize-none"
                        >
                        </textarea>

                        <button
                            type="submit"
                            className="font-semibold capitalize absolute right-[10px] bottom-[10px] bg-[#f51997] text-white px-4 py-2 rounded-lg"
                        >
                            {isPostingComment ? "Posting..." : "Post comment"}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Comments;
