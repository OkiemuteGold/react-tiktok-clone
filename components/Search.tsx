import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import { BiSearch } from "react-icons/bi";
import { PreventDefault } from "@/types";

const Search = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter();

    const handleSearch = (e: PreventDefault) => {
        e.preventDefault();
        searchTerm && router.push(`/search/${searchTerm}`);

        setSearchTerm("");
    };

    return (
        <div className="relative hidden: md:block">
            <form
                onSubmit={handleSearch}
                className="absolute md:static top-10 left-20 bg-white"
            >
                <input
                    type="text"
                    placeholder="Search accounts and videos"
                    className="bg-primary py-3 px-4 text-sm md:text-base font-medium border-2 border-gray-100 focus:outline-none focus:border-gray-300 w-[300px] md:w-[350px] rounded-full"
                    value={searchTerm}
                    onChange={
                        (e) => setSearchTerm(e.target.value)
                    }
                />

                <button
                    type="submit"
                    className="absolute right-5 md:right-4 top-0 bottom-0 my-auto h-7 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400"
                >
                    <BiSearch />
                </button>
            </form>
        </div>
    );
};

export default Search;
