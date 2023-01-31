import React from "react";
import Icon from "./Icon";
import Loading from "./Loading";

const Table = ({ expenseSelected, updateExpense, deleteExpense, refs, expenses, loading }) => {

    const handleAction = (e, row, action) => {
        if (action === "delete") {
            expenseSelected(row);
            deleteExpense(true);
        } else if (action === "edit") {
            refs[0].current.value = expenses[row].title;
            refs[1].current.value = expenses[row].value;
            expenseSelected(row);
            updateExpense(true);
        }
        e.preventDefault();
    };

    return (
        <div className="max-md:m-auto">
            <table className="table-auto mt-8 self-start w-96 max-md:w-full text-center text-black">
                <thead>
                    <tr className="block">
                        <th className="pl-8">Expense Title</th>
                        <th className="pl-10">Expense Value</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody className="block h-80 overflow-x-hidden overflow-y-auto">
                    {loading && 
                    <tr className="flex justify-center">
                        <td><Loading color="border-red-500" /></td>
                    </tr>}
                    {(!loading && expenses != []) && expenses.map(({ title, value }, index) => (
                        <tr key={index} className="font-bold">
                            <td className="px-6 py-2 text-red-500">{title}</td>
                            <td className="px-6 py-2 text-red-500">-${value}</td>
                            <td className="px-6 py-2 flex">
                                <button onClick={(e) => handleAction(e, index, "edit")} type="button" aria-label="Edit" title="Edit">
                                    <Icon name="edit" size={1} className="mr-4 text-orange-500 hover:text-orange-700" />
                                </button>
                                <button onClick={(e) => handleAction(e, index, "delete")} type="button" aria-label="Delete" title="Delete">
                                    <Icon name="delete" size={1} className="mr-4 text-red-500 hover:text-red-700" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
