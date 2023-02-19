import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
// import Image from "next/image";
// import Link from "next/link";

import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import axios from "axios";
import useAuthStore from '@/store/authStore';
import { client } from '@/utils/client';

const Upload = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [videoAsset, setVideoAsset] = useState(null);

    return (
        <div className="flex w-full h-full">
            <div className="bg-white rounded-lg">
                <div>
                    <div>
                        <div>
                            <p className="text-2xl font-bold">Upload Video</p>
                            <p className="text-md text-gray-400 mt-1">
                                Post a video to your account
                            </p>
                        </div>

                        <div className="border-dashed border-4 border-gray-200 rounded-xl flex flex-col justify-center items-center outline-none mt-10 w-[260px] h-[460px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100">
                            {isLoading ? (
                                <p>Uploading...</p>
                            ) : (
                                <div>
                                    {videoAsset ? (
                                        <label className="cursor-pointer">
                                            <div className="flex flex-col items-center justify-center h-full">
                                                <div className="flex flex-col items-center justify-center">
                                                    <p className="font-bold text-xl">
                                                        <FaCloudUploadAlt className="text-gray-300 text-6xl" />
                                                    </p>
                                                    <p className="font-bold text-xl capitalize">
                                                        upload video
                                                    </p>
                                                </div>

                                                <div className="text-gray-400 text-center leading-8">
                                                    <p className="text-sm mt-10">MP4 or WebM or ogg</p>
                                                    <p className="text-sm mt-10">720x1280 or higher</p>
                                                    <p className="text-sm mt-10">Up to 10 minutes</p>
                                                    <p className="text-sm mt-10">Less than 2GB</p>
                                                </div>

                                                <div className="mt-10 w-52">
                                                    <button className="bg-[#f51997] text-center text-white text-base font-medium p-2 outline-none rounded capitalize" type="button">Select file</button>
                                                </div>
                                            </div>
                                        </label>
                                    ) : (
                                        <div></div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Upload;
