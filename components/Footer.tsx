import React, { useEffect, useState } from "react";
import { footerList1, footerList2, footerList3 } from "@/utils/constants";

const List = ({ items, mt }: { items: string[], mt: boolean }) => {
    return (
        <div className={`flex flex-wrap gap-2 ${mt && 'mt-5'}`}>
            {items.map((item) => {
                return (
                    <p
                        key={item}
                        className="text-gray-400 text-sm hover:underline cursor-pointer"
                    >
                        {item}
                    </p>
                );
            })}
        </div>
    )
};

const defaultYear: any = 2023;
const currentYear = new Date().getFullYear();

const Footer = () => {
    const [year] = useState(currentYear);
    const [footerYear, setFooterYear] = useState(defaultYear);

    useEffect(() => {
        const timeline = `${defaultYear} - ${year}`;
        const copyrightYear = year > defaultYear ? timeline : defaultYear;
        setFooterYear(copyrightYear);
    }, [year]);

    return (
        <div className="mt-6 hidden xl:block">
            <List items={footerList1} mt={false} />
            <List items={footerList2} mt />
            <List items={footerList3} mt />

            <p className="mt-5 text-gray-400 text-sm">Copyright@<span>{footerYear}</span> <span className="text-[#f51997]">OG</span> TikTik</p>
        </div>
    );
};

export default Footer;
