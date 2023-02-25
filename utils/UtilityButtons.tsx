import React from "react";
import { FaArrowLeft } from "react-icons/fa";
// import classnames from "classnames";

const DefaultBtn = (props: any) => <button type="button" {...props} />;

const GoBackBtn = ({ setStatus }: any) => {
    return (
        <DefaultBtn
            className="flex justify-evenly items-center w-16 mx-auto border-b-2 border-gray-300 hover:border-gray-400"
            onClick={setStatus}
        >
            <FaArrowLeft className="h-3 w-3" />
            <span>Back</span>
        </DefaultBtn>
    );
};

const UtilityBtns = () => {
    const Button = ({ className, btnType, ...props }: {
        className: string,
        btnType: string
    }) => {

        if (btnType === "primary") {
            className = className.concat(" " + "bg-[#f51997] text-white");
        }

        if (btnType === "outline") {
            className = className.concat(" " + "border-2 border-gray-200 hover:border-gray-300");
        }

        return (
            <DefaultBtn
                // className={classnames(btnType && `button_${btnType}`, className, "rounded outline-none font-medium capitalize")}
                className={`${btnType ? `button_${btnType} ${className}` : className} rounded outline-none font-medium capitalize`}
                {...props}
            />
        )
    };

    const CustomButton = (props: any) => <Button {...props} />;

    return {
        CustomButton,
    }
};

export { GoBackBtn, UtilityBtns };