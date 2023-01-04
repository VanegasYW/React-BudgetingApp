import { useState, useEffect } from "react";
import { fetchAllBudgets } from "./utils/bugetService.js"
import CreateBudget from "./pages/CreateBudget.jsx";
import BudgetView from "./pages/BudgetView.jsx";
import Loading from "./components/Loading.jsx";

const App = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [showBudgetView, setShowBudgetView] = useState(false);
    const [budgetSelected, setBudgetSelected] = useState([]);
    const [budgets, setBudgets] = useState([]);

    useEffect(() => {
        fetchAllBudgets()
            .then((data) => {
                setBudgets(data)
                setBudgetSelected(data[0]?._id)
                setIsLoading(false)
            })
    }, [isLoading])

    return (
        <div>
            { isLoading && <Loading color="teal" /> }
            {(!isLoading && !showBudgetView) &&
                <CreateBudget data={budgets} isLoading={setIsLoading} budgetSelected={setBudgetSelected} budgetView={setShowBudgetView} />
            }
            {showBudgetView && <BudgetView id={budgetSelected} />}
        </div>
    )
};

export default App;