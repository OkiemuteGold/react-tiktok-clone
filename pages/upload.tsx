import React, { useState } from "react";
import { useRouter } from "next/router";

import { FaCloudUploadAlt } from "react-icons/fa";
// import { MdDelete } from "react-icons/md";

import axios from "axios";
import useAuthStore from "@/store/authStore";
import { client } from "@/utils/client";
import { SanityAssetDocument } from "@sanity/client";

import { topics } from "@/utils/constants";
import { BASE_URL } from "@/utils";

import { GoBackBtn, UtilityBtns } from "@/utils/UtilityButtons";

const Upload = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [videoAsset, setVideoAsset] = useState<SanityAssetDocument | undefined>();
    const [wrongFileType, setWrongFileType] = useState(false);
    const [uploadError, setUploadError] = useState<any>({
        status: false,
        message: "",
    });

    const defaultCategory = topics[0].name;

    const [caption, setCaption] = useState("");
    const [category, setCategory] = useState(defaultCategory);
    // const [isSavingPost, setIsSavingPost] = useState(false);

    const isInvalid = !caption || !category || !videoAsset;

    const { userProfile }: any = useAuthStore();
    const router = useRouter();

    const { CustomButton } = UtilityBtns();

    const clearFields = () => {
        setCaption("");
        setCategory(defaultCategory);
        setVideoAsset(undefined);
    };

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
                    // console.log(error);
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

    const postVideo = async () => {
        if (caption && videoAsset?._id && category) {
            // setIsSavingPost(true);

            const videoDocument = {
                _type: "post",
                caption,
                topic: category,
                video: {
                    _type: "file",
                    asset: {
                        _type: "reference",
                        _ref: videoAsset?._id
                    }
                },
                userId: userProfile?._id,
                postedBy: {
                    _type: "postedBy",
                    _ref: userProfile?._id
                }
            }

            await axios.post(`${BASE_URL}/api/post`, videoDocument);

            // console.log(videoDocument);

            clearFields();

            router.push("/");
        }
    };

    return (
        <div className="flex w-full h-full absolute left-0 top-[52px] justify-center bg-[#f8f8f8] md:py-10">
            <div className="flex justify-center md:justify-between xl:justify-evenly items-center flex-wrap gap-6 xl:gap-8 p-14 md:p-10 w-[100%] md:w-[90%] lg:w-[80%] xl:w-[60%] mx-auto xl:h-[80vh] bg-white rounded-lg overflow-y-auto">
                <div>
                    <div>
                        <p className="text-2xl font-bold">Upload Video</p>
                        <p className="text-base text-gray-400 mt-1">
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

                                <GoBackBtn
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

                                                        <GoBackBtn
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
                        <CustomButton
                            btnType="outline"
                            className="text-base p-2 w-28 lg:w-44"
                            onClick={clearFields}
                        >
                            Discard
                        </CustomButton>

                        <CustomButton
                            btnType="primary"
                            className="text-base p-2 w-28 lg:w-44 disabled:opacity-70"
                            onClick={postVideo}
                            disabled={isInvalid}
                        >
                            Post
                        </CustomButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Upload;
