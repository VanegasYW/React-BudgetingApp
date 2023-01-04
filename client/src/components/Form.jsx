import React from "react";
import Icon from "./Icon";

const Form = ({ onSubmit, btnText, bg, border, inputs }) => {
    return (
        <form onSubmit={onSubmit} className="w-full">
            {inputs.map((input, index) => (
                <div key={index} className={`flex items-center py-2 ${border}`}>
                    <input
                        id={input.name}
                        ref={input.ref}
                        className=" bg-transparent font-normal border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none mt-4"
                        type="text"
                        name={input.name}
                        placeholder={input.label}
                        autoComplete="true"
                        required
                    />
                </div>
            ))}
            <div className="flex justify-center">
                <button className={`flex text-white ${bg} mt-4 hover:${bg} p-2 rounded transition-colors`} type="submit" title={btnText} aria-label={btnText}>
                    {btnText} <Icon name="plus" size={1} className={`ml-1 text-sm self-center`} />
                </button>
            </div>
        </form>
    );
};

export default Form;