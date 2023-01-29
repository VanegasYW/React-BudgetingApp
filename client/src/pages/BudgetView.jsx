import { useState, useEffect, useRef } from "react";
import { fetchBudget, updateBudget } from "../utils/bugetService.js"
import Table from "../components/Table";
import Form from "../components/Form";
import Icon from "../components/Icon";
import Loading from "../components/Loading.jsx";

const inputBudget = [
    { name: "budget", label: "Enter your budget" }
]

const inputsExpense = [
    { name: "expenseTitle", label: "Enter your expense title" },
    { name: "expenseValue", label: "Enter your expense value" }
]

const BudgetView = ({ id }) => {
    const [isLoadingTable, setIsLoadingTable] = useState(false)
    const [isLoadingGeneral, setIsLoadingGeneral] = useState(true)
    const [nan, setNaN] = useState(false)
    const [data, setData] = useState([])
    const [expenseValue, setExpenseValue] = useState(0)
    const [budgetValue, setBudgetValue] = useState(0)
    const [balance, setBalance] = useState(0)
    const [updateExpense, setUpdateExpense] = useState(false)
    const [deleteExpense, setDeleteExpense] = useState(false)
    const [expenseSelected, setExpenseSelected] = useState(false)

    const expenseTitleInput = useRef(null);
    const expenseValueInput = useRef(null);
    const budgetValueInput = useRef(null);

    inputBudget[0].ref = budgetValueInput
    inputsExpense[0].ref = expenseTitleInput
    inputsExpense[1].ref = expenseValueInput

    useEffect(() => {
        fetchBudget(id)
            .then((data) => {
                setData(data)
                setBudgetValue(parseFloat(data.budget.value))
                setExpenseValue(data.expenses.reduce((sum, { value }) => sum + parseFloat(value), 0))
                setBalance(budgetValue - expenseValue)
                setIsLoadingGeneral(false)
                setIsLoadingTable(false)
                updateBudget(id, { balance })
                    .catch((error) => {
                        console.error(error);
                    });
            }).catch(error => () => {
                console.error(error);
            })

    }, [isLoadingGeneral, isLoadingTable])

    const updateBudgetFunc = (object, callback) => updateBudget(id, object)
        .then(callback)
        .catch((error) => {
            console.error(error);
        });

    if (deleteExpense) {
        setDeleteExpense(false)
        let expensesDelete = data?.expenses

        expensesDelete = expensesDelete.filter(({ title }) => title != expensesDelete[expenseSelected].title);

        updateBudgetFunc({ expenses: expensesDelete }, () =>
            setIsLoadingTable(true)
        )
    }

    const handleCreateExpense = (e) => {
        const title = expenseTitleInput?.current.value;
        const value = expenseValueInput?.current.value;

        if (!isNaN(value)) {
            setNaN(false)

            if (updateExpense) {
                let expensesUpdate = data?.expenses
                expensesUpdate[expenseSelected].title = title
                expensesUpdate[expenseSelected].value = value

                updateBudgetFunc({ expenses: expensesUpdate }, () => {
                    expenseTitleInput.current.value = "";
                    expenseValueInput.current.value = "";
                    setUpdateExpense(false)
                    setIsLoadingTable(true)
                })
            } else {

                updateBudgetFunc({ expenses: [...data?.expenses, { title, value }] }, () => {
                    expenseTitleInput.current.value = "";
                    expenseValueInput.current.value = "";
                    setIsLoadingTable(true)
                })
            }
        } else {
            setNaN(true)
        }

        e.preventDefault()
    }

    const handleEditBudgetValue = (e) => {
        const title = data?.budget.title;
        const currentValue = data?.budget.value;
        const addValue = budgetValueInput?.current.value;

        if (!isNaN(addValue)) {
            setNaN(false)

            const addValue = budgetValueInput?.current.value;
            const value = parseFloat(currentValue) + parseFloat(addValue)

            setBudgetValue(value)

            updateBudgetFunc({ balance: balance, budget: { title, value } }, () => {
                budgetValueInput.current.value = ""
                setIsLoadingGeneral(true)
            })

        } else {
            setNaN(true)
        }

        e.preventDefault()
    }

    return (
        <div className="container m-auto">
            {isLoadingGeneral && <Loading color="teal" />}
            <h1 className="text-center text-teal-500 text-[2rem] font-bold ">Budgeting App</h1>
            <button
                onClick={() => location.reload()}
                className="transition-colors mx-4 bg-blue-500 hover:bg-blue-700 p-2 rounded"
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
            <div className="flex justify-center items-center font-bold text-[1.5rem] max-sm:flex-col">
                <p className={`flex m-10 max-sm:mb-1 ${balance < 0 ? "text-red-500" : ""}`}>
                    <Icon name="balance" size={2} className="mr-2" /> Balance: ${balance}
                </p>
                <p className="flex m-10 max-sm:mb-1 text-green-500 ">
                    <Icon name="budget" size={2} className="mr-2" /> Budget: ${budgetValue}
                </p>
                <p className="flex m-10 max-sm:mb-1 text-red-500">
                    <Icon name="expenses" size={2} className="mr-2" /> Expenses: -${expenseValue}
                </p>
            </div>
            <div className="flex justify-evenly max-md:flex-col max-md:px-12 ">
                <div className="mt-2">
                    <Form
                        onSubmit={handleEditBudgetValue}
                        bg="bg-green-500"
                        border="border-b-2 border-green-500"
                        btnText="Add Budget"
                        inputs={inputBudget}
                    />
                    {
                        nan && <p className="text-sm text-red-500 font-bold">Ingresa un valor numérico</p>
                    }
                    <div className="mt-10">
                        <Form
                            onSubmit={handleCreateExpense}
                            bg="bg-red-500"
                            border="border-b-2 border-red-500"
                            btnText={updateExpense ? "Update Expense" : "Add Expense"}
                            inputs={inputsExpense}
                        />

                    </div>
                </div>
                <Table expenseSelected={setExpenseSelected} updateExpense={setUpdateExpense} deleteExpense={setDeleteExpense} refs={[expenseTitleInput, expenseValueInput]} expenses={data?.expenses ? data.expenses : []} loading={isLoadingTable} />
            </div>
        </div>
    );
}

export default BudgetView;