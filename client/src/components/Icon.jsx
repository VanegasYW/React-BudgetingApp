import React from "react";
import { FaMoneyBillAlt, FaMoneyCheckAlt, FaCoins, FaPen, FaTrash, FaPlus } from "react-icons/fa";

const Icon = ({ name, size, className }) => {
    switch (name) {
        case "budget":
            return <FaMoneyBillAlt className={`${className} text-[${size}rem]`} />;
        case "expenses":
            return <FaMoneyCheckAlt className={`${className} text-[${size}rem]`} />;
        case "balance":
            return <FaCoins className={`${className} text-[${size}rem]`} />;
        case "edit":
            return <FaPen className={`${className} text-[${size}rem]`} />;
        case "delete":
            return <FaTrash className={`${className} text-[${size}rem]`} />;
        case "plus":
            return <FaPlus className={`${className} text-[${size}rem]`} />;
        default:
            return null;
    }
};

export default Icon;