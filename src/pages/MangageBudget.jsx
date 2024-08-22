import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import BudgetCard from "@/components/BudgetCard";
import '../App.css'
import Loader from "@/components/Loader";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { budgetAction } from "@/Store/Store";
import moment from "moment";
import { EditBudget } from "@/components/EditBudget";
import DeleteBudget from "@/components/DeleteBudget";
import { useNavigate } from "react-router-dom";

const MangageBudget = () => {
  const { budgetId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedBudget } = useSelector((store => store.budgetSlice));
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  let [latestExpenses, setLatestExpenses] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(()=>{
    getSelectedBudget();
  },[]);

  const getSelectedBudget = async() => {
    const response = await axios.get(`${backendUrl}/api/budget/getselectedbudget/${budgetId}`);
    if(response.data.status===false){
      toast.error('invalid URL!');
    }else{
      dispatch(budgetAction.setSelectedBudget(response.data));
      const reverse = [...response.data.expenses].reverse();
      setLatestExpenses(reverse);
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      addExpense();
    }
  };

  const addExpense = async(event) => {
    event.preventDefault();
    setLoading(true);
    const data = {
      expenseName,
      expenseAmount
    }
    const response = await axios.post(`${backendUrl}/api/expense/addexpenses/${budgetId}`,data);
    if(response.data.status===true){
      setExpenseName('');
      setExpenseAmount('');
      getSelectedBudget();
      toast.success('New Expense Added!');
      dispatch(budgetAction.setIsBudgetDataFetched(false));
      dispatch(budgetAction.setIsBudgetDataFetchedDashboard(false));
      setLoading(false);
    }
  }
  
  const deleteExpense = async(expenseId) => {
    const response = await axios.delete(`${backendUrl}/api/expense/deleteexpenses/${expenseId}/${budgetId}`);
    if(response.data.status===true){
      toast.success('Expense is Deleted!');
      dispatch(budgetAction.setIsBudgetDataFetched(false));
      dispatch(budgetAction.setIsBudgetDataFetchedDashboard(false));
      getSelectedBudget();
    }
  }
  return (
    <div className="px-9 py-10">
       <div>
                <Toaster
                    position="top-center"
                    toastOptions={{
                        success: {
                            theme: {
                                primary: '#4aed88',
                            },
                        },
                    }}
                ></Toaster>
            </div>
      <div className="flex justify-between">
        <div>
          <label htmlFor="" className="text-3xl  font-bold manage_budget_text">
            Manage Budget's
          </label>
        </div>
        <div className="flex gap-3">
          {selectedBudget && <EditBudget getSelectedBudget={getSelectedBudget} budgetData={selectedBudget}/>}
          {selectedBudget?._id && <DeleteBudget budgetId={budgetId}/>}
        </div>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2 grid-cols-1 lg:grid-cols-2 ">
       {selectedBudget?._id && <BudgetCard budgetData={selectedBudget}/>}

        {/* add new Expences */}
       {selectedBudget?._id  && <div className="border flex flex-col px-3 py-2 pb-4 rounded-lg justify-between shadow-lg ">
          <label htmlFor="" className="font-bold">Add Expense</label>
          <form onSubmit={addExpense} action="" className="flex flex-col mt-2 gap-2">
            <label htmlFor="" className="font-semibold">Expense Name</label>
            <input type="text" value={expenseName} onChange={(e)=>setExpenseName(e.target.value)} placeholder="eg. fuel" className="w-full outline-none border rounded-sm px-[6px] border-slate-300 focus:border-primary py-[2px]" />
            <label htmlFor="">Expense Amount</label>
            <input type="number" value={expenseAmount} onChange={(e)=>setExpenseAmount(e.target.value)} placeholder="2000" className="w-full outline-none border rounded-sm px-[6px] border-slate-300 focus:border-primary py-[2px]"/>
            <Button disabled={expenseName?.length===0 || expenseAmount?.length===0} type="submit"  onKeyDown={handleKeyDown} className="bg-primary py-[6px] cursor-pointer text-[.9rem] text-white font-semibold rounded-md mt-[10px]">{loading?<Loader/>:"Add New Expenses"}</Button>
          </form>
       </div>}
      </div>

      {/* Latest Expense */}
      <div className='mt-5 flex flex-col gap-2'>
      <label htmlFor="" className='text-lg font-bold'>Expenses</label>
          <table className="border-collapse">
          <thead>
          <tr className='bg-[#e2e8f0]  rounded-lg border-none '>
              <th>Name</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {
            latestExpenses?.map((elm)=>{
              return <tr key={elm._id} className="text-center">
                      <td>{elm.expenseName}</td>
                      <td>{elm.expenseAmount}₹</td>
                      <td>{moment(elm.createdAt).format('llll')}</td>
                      <td><AiOutlineDelete fontSize={'1.1rem'} onClick={()=>deleteExpense(elm._id)} cursor={'pointer'} className="hover:scale-110 p-2 box-content transition-all text-red-600  hover:text-white font-bold hover:bg-red-600 rounded-full"/></td>
                  </tr>
                })
              }
            </tbody>
          </table>
    </div>
    </div>
  );
};

export default MangageBudget;
