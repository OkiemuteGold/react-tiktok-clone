import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { topics } from "@/utils/constants";

const Discover = () => {
    const router = useRouter();
    const { topic } = router.query;

    console.log(topic);

    const topicStyle =
        "xl:border-2 hover:bg-primary px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer";

    return (
        <div className="xl:border-b-2 xl:border-gray-200 pb-6">
            <h2 className="text-base text-gray-500 font-semibold m-3 mt-4 hidden xl:block">
                Popular Topics
            </h2>

            <div className="flex flex-wrap gap-3">
                {topics.map((item) => {
                    const { name, icon } = item;

                    return (
                        <Link href={`/?topic=${name}`} key={name}>
                            <div
                                className={
                                    `${topicStyle} ${topic === name ? "xl:border-[#f51997] text-[#f51997]" : "xl:border-gray-300 text-black"}`
                                }
                            >
                                <span className="font-bold text-2xl xl:text-base">
                                    {icon}
                                </span>
                                <span className="font-medium text-base hidden xl:block capitalize">
                                    {name}
                                </span>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default Discover;
