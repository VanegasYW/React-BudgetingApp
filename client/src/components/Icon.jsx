import React from "react";
import { FaMoneyBillAlt, FaMoneyCheckAlt, FaCoins, FaPen, FaTrash, FaPlus, FaCheck, FaArrowLeft } from "react-icons/fa";

const icons = {
  budget: FaMoneyBillAlt,
  expenses: FaMoneyCheckAlt,
  balance: FaCoins,
  edit: FaPen,
  delete: FaTrash,
  plus: FaPlus,
  check: FaCheck,
  back: FaArrowLeft,
};

const Icon = ({ name, size, className }) => {
  const IconComponent = icons[name];
  if (!IconComponent) return null;

  return <IconComponent className={`${className} text-[${size}rem] transition-colors`} />;
};

export default Icon;
