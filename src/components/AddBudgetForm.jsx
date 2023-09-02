
// react imports
import { useEffect, useRef } from "react";

// rrd imports
import { Form, useFetcher } from "react-router-dom";

// library imports
import { CurrencyRupeeIcon } from "@heroicons/react/24/solid";

const AddBudgetForm = () => {
    const fetcher = useFetcher();
    const isSubmitting = fetcher.state === 'submitting';

    const formRef = useRef();
    const focusRef = useRef();

    useEffect(() => {
        if(!isSubmitting){
            formRef.current.reset();
            focusRef.current.focus();
        }
    })

  return (
    <div className="form-wrapper">
        <h2 className="h3">
            Create budget
        </h2>
        <fetcher.Form
        method="post"
        className="grid-sm"
        ref={formRef}
        >
            <div className="grid-xs">
                <label htmlFor="newBudget">Budget Name</label>
                <input 
                type="text"
                name="newBudget"
                id="newBudget"
                required
                placeholder="e.g., Groceries"
                autoComplete="off"
                ref={focusRef}
                 />
            </div>
            <div className="grid-xs">
                <label htmlFor="newBudgetAmount">Amount</label>
                <input 
                type="number" 
                step="0.01"
                name="newBudgetAmount"
                id="newBudgetAmount"
                required
                placeholder="e.g., &#x20B9;1000"
                inputMode="decimal"
                autoComplete="off"
                />
            </div>
            <input type="hidden" name="_action" value="createBudget" />
            <button 
            type="submit"
            className="btn btn--dark"
            disabled={isSubmitting}>

                {isSubmitting ? <span>Submitting...</span> : 
                (
                    <>
                        <span>Create Budget</span>
                        <CurrencyRupeeIcon width={20} />
                    </>
                   
                )}

            </button>
        </fetcher.Form>
    </div>
  )
}

export default AddBudgetForm;