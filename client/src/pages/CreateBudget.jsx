import { useState, useRef, useEffect } from "react";
import Form from "../components/Form";
import Icon from "../components/Icon";
import { createBudget, updateBudget, deleteBudget, fetchBudget } from "../utils/bugetService.js";

const inputsBudget = [{ name: "budgetTitle", label: "Enter name" }, { name: "budgetValue", label: "Enter initial value" }];

const CreateBudget = ({ data, isLoading, budgetSelected, budgetView }) => {
    const [nan, setNan] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [showBackButton, setShowBackButton] = useState(false);
    const [selectedBudgetId, setSelectedBudgetId] = useState(data[0]?._id);
    const [selectedBudget, setSelectedBudget] = useState(null);
    const [deleteConfirm, setDeleteConfirm] = useState(false);

    const budgetTitleInput = useRef(null);
    const budgetValueInput = useRef(null);

    inputsBudget[0].ref = budgetTitleInput
    inputsBudget[1].ref = budgetValueInput

    useEffect(() => {
        if (showUpdateForm) {
            budgetTitleInput.current.value = selectedBudget?.budget.title;
            budgetValueInput.current.value = selectedBudget?.budget.value;
            setShowBackButton(true);
        }
    }, [showUpdateForm]);

    const toggleDeleteConfirm = () => setDeleteConfirm(val => val = !val)

    const handleAccept = () => budgetView(true);

    const handleShowForm = () => {
        setShowForm(true);
        setShowBackButton(true);
    };

    const handleSelect = (e) => {
        setSelectedBudgetId(e.target.value);
        budgetSelected(e.target.value)
    };

    const handleEdit = () => {
        fetchBudget(selectedBudgetId)
            .then((budget) => {
                setSelectedBudget(budget);
                setShowUpdateForm(true);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleDelete = () => {
        deleteBudget(selectedBudgetId)
            .then(() => {
                isLoading(true);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleCreate = (e) => {
        const title = budgetTitleInput?.current.value;
        const value = budgetValueInput?.current.value;

        if (!isNaN(value)) {
            setNan(false)

            if (showUpdateForm) {
                updateBudget(selectedBudgetId, { balance: value, budget: { title, value } })
                    .then((budget) => {
                        setSelectedBudget(budget);
                        isLoading(true);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                createBudget({ balance: value, budget: { title, value } })
                    .then((budget) => {
                        setSelectedBudget(budget);
                        setShowForm(false);
                        isLoading(true);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        } else {
            setNan(true)
        }
        e.preventDefault();
    };

    return (
        <div className="flex justify-center items-center flex-col h-screen w-96 m-auto">
            <h1 className="text-center text-teal-500 text-[3rem] font-bold">
                {showForm || !data.length
                    ? "Budgeting App"
                    : showUpdateForm
                        ? "Update budget"
                        : "Select budget"}
            </h1>
            {(!showUpdateForm && !showForm && data.length > 0) && (
                <div className="flex justify-evenly text-center w-full">
                    <div className="text-xl mt-6 self-start">
                        <button onClick={handleEdit} type="button" aria-label="Edit" title="Edit">
                            <Icon
                                name="edit"
                                size={1}
                                className="mx-4 text-orange-500 hover:text-orange-700"
                            />
                        </button>
                        <button
                            onClick={toggleDeleteConfirm}
                            type="button"
                            aria-label="delete"
                            title="delete"
                        >
                            <Icon
                                name="delete"
                                size={1}
                                className="mr-4 text-red-500 hover:text-red-700"
                            />
                        </button>
                        <select onChange={handleSelect} value={selectedBudgetId} title="Select a budget" className="bg-teal-500 hover:bg-teal-700 transition-colors font-bold rounded text-white py-2 px-4 block outline-none cursor-pointer">
                            {data.map(budget => (
                                <option key={budget._id} value={budget._id}>
                                    {budget.budget.title}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="self-end mt-12">
                        <button
                            onClick={!deleteConfirm ? handleAccept : handleDelete}
                            type="button"
                            className={`transition-colors ${!deleteConfirm ? "bg-teal-500 hover:bg-teal-700" : "bg-red-500 hover:bg-red-700"} p-5 mb-5 rounded block`}
                            aria-label="create new budget"
                            title="create new budget"
                        >
                            <Icon
                                name="check"
                                size={1}
                                className="text-white"
                            />
                        </button>
                        <button
                            onClick={!deleteConfirm ? handleShowForm: toggleDeleteConfirm}
                            type="button"
                            className={`self-end transition-colors p-5 rounded  ${!deleteConfirm ? "bg-green-500 hover:bg-green-700" : "bg-blue-500 hover:bg-blue-700"}`}
                            aria-label="create new budget"
                            title="create new budget"
                        >
                            <Icon
                                name={!deleteConfirm ? "plus": "back"}
                                size={1}
                                className="text-white"
                            />
                        </button>
                    </div>
                </div>
            )}
            {nan && <p className="self-start text-red-500 font-bold text-showForm">Ingresa un valor numérico</p>
            }
            {(showForm || showUpdateForm || !data.length > 0) && (
                <Form
                    inputs={inputsBudget}
                    onSubmit={handleCreate}
                    border="border-b-2 border-green-500"
                    bg="bg-green-500"
                    btnText={showUpdateForm ? "Update budget" : "Create budget"}
                />
            )}
            {showBackButton && (
                <button
                    onClick={() => {
                        setShowForm(false);
                        setShowUpdateForm(false);
                        setShowBackButton(false);
                    }}
                    className="mx-4 transition-colors bg-blue-500 hover:bg-blue-700 p-3 rounded mt-5"
                    type="button"
                    aria-label="Back"
                    title="Back"
                >
                    <Icon
                        name="back"
                        size={1}
                        className="transition-colors text-white"
                    />
                </button>
            )}
        </div>
    )
}

export default CreateBudget;