import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { getExpenses } from "@/Store/Store";
import { budgetAction } from "@/Store/Store";

const Expences = () => {
  const { expenses } = useSelector((store) => store.budgetSlice);
  const dispatch = useDispatch();

  useEffect(()=>{
    fetchExpense();
  },[])
  async function fetchExpense() {
    const expenseData = await getExpenses();
    dispatch(budgetAction.setExpenses(expenseData));
  }
  return (
    <div className="px-9 py-10 flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <label htmlFor="" className="mb-10 text-3xl font-bold">
          My Expenses
        </label>
        <table className="border-collapse">
          <thead>
            <tr className="bg-[#e2e8f0]  rounded-lg border-none ">
              <th>Name</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {expenses?.map((elm) => {
              return (
                <tr key={elm._id} className="text-center">
                  <td>{elm.expenseName}</td>
                  <td>{elm.expenseAmount}₹</td>
                  <td>{moment(elm.createdAt).format("llll")}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Expences;
