import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { FaCloudUploadAlt, FaArrowLeft } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import axios from "axios";
import useAuthStore from "@/store/authStore";
import { client } from "@/utils/client";
import { SanityAssetDocument } from "@sanity/client";

import { topics } from "@/utils/constants";

export const GoBackComponent = ({ setStatus }: any) => {
    return (
        <button
            type="button"
            className="flex justify-evenly items-center w-16 mx-auto border-b-2 border-gray-300 hover:border-gray-400"
            onClick={setStatus}
        >
            <FaArrowLeft className="h-3 w-3" />
            <span>Back</span>
        </button>
    );
};

const Upload = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [videoAsset, setVideoAsset] = useState<SanityAssetDocument | undefined>();
    const [wrongFileType, setWrongFileType] = useState(false);
    const [uploadError, setUploadError] = useState<any>({
        status: false,
        message: "",
    });

    const [caption, setCaption] = useState("");
    const [category, setCategory] = useState(topics[0].name);
    const [isSavingPost, setIsSavingPost] = useState(false);

    const invalid = !caption || !category || !videoAsset;
    const [isInvalid] = useState(invalid);

    const uploadVideo = (e: any) => {
        setIsLoading(true);

        const selectedFile = e.target.files[0];
        const fileTypes = ["video/mp4", "video/webm", "video/ogg"];

        if (fileTypes.includes(selectedFile.type)) {
            client.assets
                .upload("file", selectedFile, {
                    contentType: selectedFile.type,
                    filename: selectedFile.name,
                })
                .then((data) => {
                    setIsLoading(false);
                    setVideoAsset(data);
                })
                .catch((error) => {
                    console.log(error);
                    setIsLoading(false);

                    setUploadError({
                        status: true,
                        message: error.isNetworkError
                            ? "Network Error!"
                            : error.message,
                    });
                });
        } else {
            setIsLoading(false);
            setWrongFileType(true);
        }
    };

    const postVideo = () => {
        const videoObj = {
            caption: caption,
            category: category,
            file: videoAsset
        }

        console.log(videoObj);

        setCaption("");
        setCategory("");
        setVideoAsset(undefined);
    };

    // useEffect(() => {
    //     if (!caption || !category || !videoAsset) {
    //         setIsInvalid(true);
    //     }
    // }, []);

    return (
        <div className="flex w-full h-full absolute left-0 top-[58px] justify-center bg-[#f8f8f8] md:py-10">
            <div className="flex justify-center md:justify-between xl:justify-evenly items-center flex-wrap gap-6 xl:gap-8 p-14 md:p-10 w-[100%] md:w-[90%] lg:w-[80%] xl:w-[60%] mx-auto xl:h-[80vh] bg-white rounded-lg overflow-y-auto">
                <div>
                    <div>
                        <p className="text-2xl font-bold">Upload Video</p>
                        <p className="text-md text-gray-400 mt-1">
                            Post a video to your account
                        </p>
                    </div>

                    <div className="border-dashed border-4 border-gray-200 rounded-xl flex flex-col justify-center items-center outline-none mt-10 w-[260px] h-[460px] p-10 hover:border-red-300 hover:bg-gray-100">
                        {wrongFileType ? (
                            <div className="text-center">
                                <p className="text-red-500 text-lg font-semibold mb-5">
                                    Video format not supported!
                                </p>
                                <p className="text-sm mb-3">
                                    We do not currently support the format
                                    you're trying to upload.
                                </p>
                                <p className="text-sm mb-5">
                                    Please select a different video.
                                </p>

                                <GoBackComponent
                                    setStatus={() => {
                                        setWrongFileType(false);
                                    }}
                                />
                            </div>
                        ) : (
                            <div>
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
                                                    className="rounded-xl h-[400px] bg-black"
                                                ></video>
                                            </div>
                                        ) : (
                                            <div>
                                                {uploadError.status ? (
                                                    <div>
                                                        <p className="text-center text-red-500 text-lg font-semibold mb-5">
                                                            {uploadError.message}
                                                        </p>

                                                        <GoBackComponent
                                                            setStatus={() => {
                                                                setUploadError({
                                                                    status: false,
                                                                    message: "",
                                                                });
                                                            }}
                                                        />
                                                    </div>
                                                ) : (
                                                    <label
                                                        htmlFor="upload-video"
                                                        className="cursor-pointer"
                                                    >
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
                                                                <span className="w-full bg-[#f51997] text-white border-2 border-transparent hover:bg-transparent hover:border-gray-300 hover:text-[#f51997] text-center text-base font-medium p-1.5 outline-none rounded capitalize">
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
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <label className="font-medium">Caption</label>

                    <input
                        type="text"
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        className="rounded outline-none border-2 border-gray-200 text-base p-2"
                    />

                    <label className="font-medium">Choose a Category</label>

                    <select
                        className="outline-none border-2 border-gray-200 text-base p-2 lg:p-4 rounded capitalize cursor-pointer"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        {topics.map((topic): any => (
                            <option
                                key={topic.name}
                                value={topic.name}
                            >
                                {topic.name}
                            </option>
                        ))}
                    </select>

                    <div className="flex gap-6 mt-10">
                        <button
                            className="outline-none border-2 border-gray-200 text-base font-medium p-2 rounded w-28 lg:w-44"
                        >
                            Discard
                        </button>

                        <button
                            className="outline-none bg-[#f51997] text-white text-base font-medium p-2 rounded w-28 lg:w-44"
                            onClick={postVideo}
                            disabled={isInvalid}
                        >
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Upload;
