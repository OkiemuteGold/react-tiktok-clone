import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
// import { useState } from "react";

import { topics } from "@/utils/constants";

const Discover = () => {
    // ----- use either the isActive state and toggleActiveButton (doesn't update on refresh) OR `router.asPath to toggle active (works since I can't access router.query)` -----

    //  ----- in div className={activeTopic === topic.name ? activeTopicStyle : topicStyle} onClick={() => toggleActiveButton(topic.name)} -----

    // const [activeTopic, setActiveTopic] = useState("");

    // const toggleActiveButton = (topic: string) => {
    //     setActiveTopic(topic);
    // };

    const router = useRouter();
    const activePath = router.asPath;
    // console.log(router);

    const activeTopicStyle =
        "xl:border-2 hover:bg-primary xl:border-[#f51997] px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-[#f51997]";

    const topicStyle =
        "xl:border-2 hover:bg-primary xl:border-gray-300 px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-black";

    return (
        <div className="xl:border-b-2 xl:border-gray-200 pb-6">
            <h2 className="text-base text-gray-500 font-semibold m-3 mt-4 hidden xl:block">
                Popular Topics
            </h2>

            <div className="flex flex-wrap gap-3">
                {topics.map((topic) => {
                    const { name, icon } = topic;
                    const path = `/?topic/${name}`;

                    return (
                        <Link key={name} href={path}>
                            <div
                                className={
                                    activePath === path
                                        ? activeTopicStyle
                                        : topicStyle
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
