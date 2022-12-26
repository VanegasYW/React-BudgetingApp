import Table from "./components/Table";
import Form from "./components/Form";
import Icon from "./components/Icon";

const data = [
    { id: 1, expenseTitle: "Auto", expenseAmount: "500" },
];

const inputBudget = [
    { name: "budget", label: "Enter your budget" }
]

const inputsExpense = [
    { name: "expenseTitle", label: "Enter your expense title" },
    { name: "expenseAmount", label: "Enter your expense amount" }
]

const App = () => {

    const handleBudget = (e) => {
        e.preventDefault();
    };

    const handleExpense = (e) => {
        e.preventDefault();
    };

    return (
        <div className="container m-auto">
            <h1 className="text-center text-teal-500 text-[2rem] font-bold ">Budgeting App</h1>
            <div className="flex justify-center items-center font-bold text-[1.5rem] max-sm:flex-col">
                <p className="flex m-10 max-sm:mb-1 text-green-500 ">
                    <Icon name="budget" size={2} className="mr-2" /> Budget: $500
                </p>
                <p className="flex m-10 max-sm:mb-1 text-red-500">
                    <Icon name="expenses" size={2} className="mr-2" /> Expenses: $500
                </p>
                <p className="flex m-10 max-sm:mb-1">
                    <Icon name="balance" size={2} className="mr-2" /> Balance: $500
                </p>
            </div>
            <div className="flex justify-evenly max-md:flex-col max-md:px-12 ">
                <div className="mt-2">
                    <Form
                        onSubmit={handleBudget}
                        color="green"
                        btnText="Add Budget"
                        inputs={inputBudget}
                    />
                    <div className="mt-10">
                        <Form
                            onSubmit={handleExpense}
                            color="red"
                            btnText="Add Expense"
                            inputs={inputsExpense}
                        />
                    </div>
                </div>
                <Table data={data} />
            </div>
        </div>
    );
};

export default App;