import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
// import Image from "next/image";
// import Link from "next/link";

import { FaCloudUploadAlt, FaArrowLeft } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import axios from "axios";
import useAuthStore from "@/store/authStore";
import { client } from "@/utils/client";
import { SanityAssetDocument } from "@sanity/client";

const Upload = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [videoAsset, setVideoAsset] = useState<SanityAssetDocument | undefined>();
    const [wrongFileType, setWrongFileType] = useState(false);

    const uploadVideo = (e: any) => {
        const selectedFile = e.target.files[0];

        const fileTypes = ["video/mp4", "video/webm", "video/ogg"];

        if (fileTypes.includes(selectedFile.type)) {
            client.assets
                .upload("file", selectedFile, {
                    contentType: selectedFile.type,
                    filename: selectedFile.name,
                })
                .then((data) => {
                    setVideoAsset(data);
                    setIsLoading(false);
                }).catch((error) => {
                    console.log(error);
                });
        } else {
            setIsLoading(false);
            setWrongFileType(true);
        }
    };

    return (
        <div className="flex w-full h-full absolute left-0 top-[58px] justify-center bg-[#f8f8f8] mb-10 pt-10">
            <div className="flex justify-center items-center flex-wrap gap-6 p-14 pt-6 xl:h-[80vh] bg-white rounded-lg">
                <div>
                    <div>
                        <p className="text-2xl font-bold">Upload Video</p>
                        <p className="text-md text-gray-400 mt-1">
                            Post a video to your account
                        </p>
                    </div>

                    <div className="border-dashed border-4 border-gray-200 rounded-xl flex flex-col justify-center items-center outline-none mt-10 w-[260px] h-[460px] p-10 hover:border-red-300 hover:bg-gray-100">
                        {isLoading ? (
                            <p className="text-center">Uploading...</p>
                        ) : (
                            <div>
                                {videoAsset ? (
                                    <div>
                                        <video
                                            src={videoAsset.url}
                                            controls
                                            loop
                                            className="rounded-xl h-[450px] mt-16 bg-black"
                                        ></video>
                                    </div>
                                ) : (
                                    <div>
                                        {!wrongFileType && (
                                            <label htmlFor="upload-video" className="cursor-pointer">
                                                <div className="flex flex-col items-center justify-center h-full">
                                                    <div className="flex flex-col items-center justify-center">
                                                        <p className="font-bold text-xl">
                                                            <FaCloudUploadAlt className="text-gray-300 text-6xl" />
                                                        </p>
                                                        <p className="font-bold text-xl capitalize">
                                                            upload video
                                                        </p>
                                                    </div>

                                                    <div className="text-gray-400 text-center">
                                                        <p className="text-sm mt-10">
                                                            MP4 or WebM or ogg
                                                        </p>
                                                        <p className="text-sm mt-6">
                                                            720x1280 or higher
                                                        </p>
                                                        <p className="text-sm mt-6">
                                                            Up to 10 minutes
                                                        </p>
                                                        <p className="text-sm mt-6">
                                                            Less than 2GB
                                                        </p>
                                                    </div>

                                                    <div className="w-full flex mt-10">
                                                        <span
                                                            className="w-full bg-[#f51997] text-white border-2 border-transparent hover:bg-transparent hover:border-gray-300 hover:text-[#f51997] text-center text-base font-medium p-1.5 outline-none rounded capitalize"
                                                        >
                                                            Select file
                                                        </span>
                                                    </div>
                                                </div>

                                                <input
                                                    type="file"
                                                    name="upload-video"
                                                    id="upload-video"
                                                    className="w-0 h-0"
                                                    onChange={uploadVideo}
                                                />
                                            </label>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}

                        {wrongFileType && (
                            <div className="text-center">
                                <p className="text-red-500 text-lg font-semibold mb-5">Video format not supported!</p>
                                <p className="text-sm mb-3">We do not currently support the format you're trying to upload.</p>
                                <p className="text-sm mb-5">Please select a different video.</p>

                                <button type="button" className="flex justify-evenly items-center w-16 mx-auto border-b-2 border-gray-300 hover:border-gray-400" onClick={() => {
                                    setWrongFileType(false)
                                }}>
                                    <FaArrowLeft className="h-3 w-3" />
                                    <span>Back</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-3 pb-10">
                    <label className="font-medium">Caption</label>
                </div>
            </div>
        </div>
    );
};

export default Upload;
