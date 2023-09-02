// rrd imports
import { Link, useLoaderData } from "react-router-dom";

// helper functions
import { createBudget, createExpense, deleteItem, fetchData, waait } from "../helpers";

// components
import Intro from "../components/Intro";
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";


// library imports
import { toast } from "react-toastify";

// actions
export async function dashboardAction({request}){

    await waait();

    const data = await request.formData();
    console.log({data, request});

    const {_action, ...values} = Object.fromEntries(data);
    console.log(_action);

    // newUser submission
    if(_action === "newUser"){
        try{
            // throw new Error('Ya done!');
            localStorage.setItem("userName", JSON.stringify(values.userName));
            return toast.success(`Welcome, ${values.userName}`);
        }catch(e){
            throw new Error("There was a problem creating your account!");
        }
        
    }

    // const userName = data.get("userName");
    // console.log("dashboard action: userName", userName );
    // const formData = Object.fromEntries(data);
    // console.log("dashboard action: formData",formData);

    if(_action === "createBudget"){
        try{
            // create budget
            createBudget({
                name: values.newBudget,
                amount: values.newBudgetAmount
            });
            return toast.success("Budget created!");
        }catch(e){
            throw new Error("There was a problem creating your budget.");
        }
    }

    if(_action === "createExpense"){
        try{
            // create expense
            createExpense({
                name: values.newExpense,
                amount: values.newExpenseAmount,
                date: values.newExpenseDate,
                budgetId: values.newExpenseBudget,
                quantity: values.newExpenseQuantity
            });
            return toast.success(`Expense ${values.newExpense} created!`);
        }catch(e){
            throw new Error("There was a problem creating your expense.");
        }
    }

    if(_action === "deleteExpense"){
        try{
            // delete expense
            deleteItem({
                key: "expenses",
                id: values.expenseId
            });
            return toast.success("Expense deleted!");
        }catch(e){
            throw new Error("There was a problem deleting your expense.");
        }
    }

}

// loaders
export function dashboardLoader(){
    const userName  = fetchData("userName");
    const budgets  = fetchData("budgets");
    const expenses = fetchData("expenses");

    return { userName, budgets, expenses };
}

const Dashboard = () => {

    const { userName, budgets, expenses } = useLoaderData();

  return (
    <>
        { userName ? (
            <div className="dashboard">
                <h1>Welcome back, <span className="accent">{userName}</span></h1>
                <div className="grid-sm">
                    {
                        budgets && budgets.length > 0 ? (
                            <div className="grid-lg">
                                <div className="flex-lg">
                                    <AddBudgetForm />
                                    <AddExpenseForm budgets={budgets} />
                                </div>
                                <h2>Existing Budgets</h2>
                                <div className="budgets">
                                    {
                                        budgets.map((budget) => (
                                            <BudgetItem budget={budget} key={budget.id} />
                                        ))
                                    }
                                </div>
                                {
                                    expenses && expenses.length > 0 && (
                                        <div className="grid-md">
                                            <h2>Recent Expenses</h2>
                                            <Table  
                                                expenses={expenses
                                                    .sort((a,b) => b.createdAt - a.createdAt)
                                                    .slice(0,5)
                                                }

                                            />
                                            {
                                                expenses.length > 5 && (
                                                    <Link 
                                                        to="expenses"
                                                        className="btn btn--dark"
                                                    >
                                                        View all expenses
                                                    </Link>
                                                )
                                            }
                                        </div>
                                    )
                                }
                        </div>
                        ):(
                            <div className="grid-sm">
                                <p>Personal budgeting is the secret to financial freedom.</p>
                                <p>Create a budget to get started!</p>
                                <AddBudgetForm />
                            </div>
                        )
                        
                    }
                </div>
            </div>
        ) : <Intro /> }
    </>
  )
}

export default Dashboard;
