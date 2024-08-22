import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BudgetCard = ({budgetData}) => {

  const { expenses } = budgetData;
  const [totalSpend, setTotalSpend] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [progressWidth, setProgressWidth] = useState(0);
  useEffect(()=>{
    const tlSpend = expenses.reduce((prevResult, current)=>{
      return prevResult + Number(current.expenseAmount);
    },0)
    setTotalSpend(tlSpend);
    const rem = budgetData.budgetAmount - tlSpend;
    setRemaining(rem);
    const onePercent = (budgetData.budgetAmount * 0.01);
    const width = (tlSpend/onePercent).toFixed(2);
    setProgressWidth(width);
  },[budgetData])
  
  return (
    <Link to={`/dashboard/budget/${budgetData._id}`} className="border flex flex-col px-3 py-4 pt-5 h-40 rounded-lg justify-between shadow-lg cursor-pointer">
      <div className="flex w-full justify-between items-center">
        <div className="flex gap-3 items-center">
          <label htmlFor="" className="bg-[#f0f3f7] rounded-full px-4 py-3.5">
            {budgetData.icon}
          </label>
          <div className="flex flex-col items-start">
            <label htmlFor="" className="font-semibold text-[1.2rem]">
              {budgetData.budgetName}
            </label>
            <label htmlFor="" className="font-semibold -mt-1 text-[.9rem]">
              {expenses.length} Item
            </label>
          </div>
        </div>
        <label htmlFor="" className="font-extrabold text-primary text-[1.1rem]">
            {budgetData.budgetAmount}₹
        </label>
      </div>

      <div>
        <div className="flex justify-between mb-2 px-1">
          <label htmlFor="" className="text-[.8rem]  font-semibold">
            {totalSpend} ₹  Spend
          </label>
          <label htmlFor="" className="text-[.8rem]  font-semibold">
            {remaining} ₹  Remaining
          </label>
        </div>
        <div className="bg-slate-300 h-2 w-full rounded-lg">
          {progressWidth && <div className={`bg-primary h-2 rounded-lg max-w-[100%]`} style={{width:`${progressWidth}%`}}></div>}
        </div>
      </div>
    </Link>
  );
};

export default BudgetCard;
