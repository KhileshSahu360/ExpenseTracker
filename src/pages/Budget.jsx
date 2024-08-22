import BudgetCard from '@/components/BudgetCard';
import { CreateBudget } from '@/components/CreateBudget'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { budgetAction, getBudget } from '@/Store/Store';
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const Budget = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { budget, isBudgetDataFetched } = useSelector((store) => store.budgetSlice);

  let budgetData;
  useEffect(()=>{
    if(!isBudgetDataFetched){
      fetchBudget();
    }
  },[]);
  const fetchBudget = async() => {
    budgetData = await getBudget();
    dispatch(budgetAction.setBudget(budgetData));
    dispatch(budgetAction.setIsBudgetDataFetched(true));
  }

  return (
    <div className='px-9 py-10'>
      <label htmlFor="" className='text-3xl font-bold'>My Budgets</label>
      <div className='mt-10 grid gap-5 md:grid-cols-2 grid-cols-1 lg:grid-cols-3 '>
        <div className='flex justify-center items-center'>
          <CreateBudget/>
        </div>

        {/* show budget */}
        {/* <div className='flex justify-center items-center  bg-[#f0f3f7]  h-40 rounded-lg animate-pulse'> 
      
         </div> */}

        {
          budget?.length > 0 ? budget?.map((elm)=>{
            return <BudgetCard key={elm._id} budgetData={elm}/>
          })
          :
          [1,2,3,4,5].map(()=>{
            return <div className='flex justify-center items-center  bg-[#f0f3f7]  h-25 rounded-lg animate-pulse'> 
      
            </div>
          }) 
        }

      </div>
    </div>
  )
}
export default Budget