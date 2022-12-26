import React from "react";
import Icon from "./Icon";

const Table = ({ data }) => {
    return (
        <table className="table-auto mt-8 self-start w-96 max-md:w-full text-center text-black">
            <thead>
                <tr>
                    <th>Expense Title</th>
                    <th>Expense Value</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {data.map(item => (
                    <tr key={item.id} className="font-bold">
                        <td className="px-4 py-2 text-red-500">{item.expenseTitle}</td>
                        <td className="px-4 py-2 text-red-500">-${item.expenseAmount}</td>
                        <td className="px-4 py-2 flex">
                            <button type="button" aria-label="Edit" title="Edit">
                                <Icon name="edit" size={1} className="mr-4 text-orange-500 hover:text-orange-700" />
                            </button>
                            <button type="button" aria-label="Delete" title="Delete">
                                <Icon name="delete" size={1} className="mr-4 text-red-500 hover:text-red-700" />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
