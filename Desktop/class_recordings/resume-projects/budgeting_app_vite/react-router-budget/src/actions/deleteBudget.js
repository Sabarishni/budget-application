
// rrd imports
import { redirect } from "react-router-dom";

// library imports
import { toast } from "react-toastify";

// helper 
import { deleteItem, getAllMatchingItems } from "../helpers";


export function deleteBudget({params}){
    try{
        deleteItem({
            key: "budgets",
            id: params.id
        });

        toast.success("Budget deleted successfully");

        const associatedExpenses = getAllMatchingItems({
            category:"expenses",
            key:"budgetId",
            value: params.id
        });

        associatedExpenses.forEach((expense) => {
            deleteItem({
                key:"expenses",
                id:expense.id
            });
        });

    }catch(e){
        throw new Error("There was a problem deleting your budget.");
    }
    return redirect("/");
}