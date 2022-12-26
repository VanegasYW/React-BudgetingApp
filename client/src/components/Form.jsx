import React from "react";
import Icon from "./Icon";

const Form = ({ onSubmit, btnText, color, inputs }) => {
    return (
        <form onSubmit={onSubmit} className="w-full">
            {inputs.map((input, index) => (
                <div key={index} className={`flex items-center border-b-2 border-${color}-500 py-2`}>
                    <input
                        className=" bg-transparent font-normal border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none mt-4"
                        type="text"
                        name={input.name}
                        placeholder={input.label}
                        autoComplete="true"
                    />
                </div>
            ))}
            <div className="flex justify-center">
                <button className={`flex text-white bg-${color}-500 mt-4 hover:bg-${color}-700 p-2 rounded`} type="submit" title={btnText} aria-label={btnText}>
                   {btnText} <Icon name="plus" size={1} className={`ml-1 text-sm self-center`} />
                </button>
            </div>
        </form>
    );
};

export default Form;