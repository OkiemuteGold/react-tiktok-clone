import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { topics } from "@/utils/constants";
import { useState } from "react";

const Discover = () => {
    const [isActive, setIsActive] = useState("coding");

    const activeTopicStyle = "xl:border-2 hover:bg-primary xl:border-[#f51997] px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-[#f51997]";

    const topicStyle = "xl:border-2 hover:bg-primary xl:border-gray-300 px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-black";

    const toggleActiveButton = (topic: string) => {
        setIsActive(topic);
    }

    return (
        <div className="xl:border-b-2 xl:border-gray-200 pb-6">
            <p className="text-gray-500 font-semibold m-3 mt-4 hidden xl:block">
                Popular Topics
            </p>

            <div className="flex flex-wrap gap-3">
                {topics.map((topic) => (
                    <Link key={topic.name} href={`/?topic/${topic.name}`}>
                        <div className={topic.name === isActive ? activeTopicStyle + activeTopicStyle : topicStyle} onClick={() => toggleActiveButton(topic.name)}>
                            <span className="font-bold text-2xl xl:text-md">{topic.icon}</span>
                            <span className="font-medium text-md hidden xl:block capitalize">{topic.name}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Discover;
