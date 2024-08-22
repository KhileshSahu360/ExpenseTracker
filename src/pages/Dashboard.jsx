import { useUser } from '@clerk/clerk-react'
import React, { useEffect, useState } from 'react'
import { LuPiggyBank } from "react-icons/lu";
import { LuWallet } from "react-icons/lu";
import { useSelector, useDispatch } from "react-redux";
import { budgetAction, getBudget, getExpenses } from '@/Store/Store';
import BarChartDashboard from '@/components/BarChartDashboard';
import BudgetCard from '@/components/BudgetCard';
import moment from 'moment';
import { SiExpensify } from "react-icons/si";


const Dashboard = () => {
  const { user } = useUser();
  const dispatch = useDispatch();
  const { budget, isBudgetDataFetchedDashboard, expenses } = useSelector((store) => store.budgetSlice);
  const [totalBudget, setTotalBudget] = useState(getTotalBudget(budget));
  const [totalSpend, setTotalSpend] = useState(getTotalSpend(expenses));
  const [NoOfBudget, setNoOfBudget] = useState(budget?.length);
  
  useEffect(()=>{
    if(!isBudgetDataFetchedDashboard){
      fetchBudget();
    }
  },[]);

  function getTotalBudget(budgetData){
    if(budgetData){
      const totalBudget = budgetData?.reduce((acc, current)=>{
        return acc + current.budgetAmount;
  
      },0)
      return totalBudget;
    }
  }

  function getTotalSpend(expenses){
    if(expenses){
      const totalExpenses = expenses?.reduce((acc, current)=>{
        return acc + current.expenseAmount;
      },0)
      return totalExpenses;
    }
  }

  const fetchBudget = async() => {
    const budgetData = await getBudget();
    const expenseData = await getExpenses();
    setNoOfBudget(budgetData?.length);
    setTotalBudget(getTotalBudget(budgetData));
    setTotalSpend(getTotalSpend(expenseData));
    dispatch(budgetAction.setBudget(budgetData));
    dispatch(budgetAction.setExpenses(expenseData));
    dispatch(budgetAction.setIsBudgetDataFetchedDashboard(true));
  }

  return (
    <div className='px-8 py-7'>
      <div className='flex flex-col gap-1'>
        <label htmlFor="" className='font-bold text-3xl'>Hi, {user?.fullName} ✌️</label>
        <label htmlFor="" className='font-normal'>Here's what happening with your money. Let's Manage your expense</label>
      </div>

      <div className='grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-3 mt-5'>
        <DashBoardCard title={'Total Budget'} value={totalBudget} icon={<LuPiggyBank/>}/>
        <DashBoardCard title={'Total Spend'} value={totalSpend} icon={<SiExpensify/>}/>
        <DashBoardCard title={'No. of Budget\'s'} value={NoOfBudget} number={true} icon={<LuWallet/>}/>
      </div>

      <div className='grid grid-cols-7 lg:grid-cols-10 mt-5 gap-3'>
        <div className='col-span-7 border rounded-lg lg:px-5 py-5 overflow-x-auto'>
          <BarChartDashboard budgetData={budget}/>
        </div>
        <div className='col-span-7 lg:col-span-3'>
          <label htmlFor="" className='font-bold'>Latest Budget's</label>
          <div className='mt-2 flex flex-col gap-2'>
            {
              budget?.slice(0,2)?.map((elm)=>{
                return <BudgetCard key={elm._id} budgetData={elm}/>
              })
            }
          </div>
        </div>
      </div>
      {/* Latest Expense */}
      <div className='mt-5 flex flex-col gap-2'>
      <label htmlFor="" className='text-lg font-bold'>Latest Expenses</label>
          <table className="border-collapse">
          <thead>
          <tr className='bg-[#e2e8f0]  rounded-lg border-none '>
              <th>Name</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
          {
            expenses?.slice(0,4)?.map((elm)=>{
              return <tr key={elm._id} className="text-center">
                      <td>{elm.expenseName}</td>
                      <td>{elm.expenseAmount}₹</td>
                      <td>{moment(elm.createdAt).format('llll')}</td>
                  </tr>
                })
              }
            </tbody>
          </table>
    </div>

    </div>
  )
}

const DashBoardCard = (props) => {
  return(
    <div className='flex justify-between items-center px-6 py-6 border rounded-lg shadow-md'>
    <div className='flex flex-col'>
      <label htmlFor="" className='font-normal text-[.9rem]'>{props.title}</label>
      <label htmlFor="" className='-mt-1 font-extrabold text-[1.4rem]'>{props.value}{!props.number?'₹':''}</label>
    </div>
    <label htmlFor="" className='flex justify-center items-center size-10 bg-primary rounded-full text-white'>{props.icon}</label>
  </div>
  )
}

export default Dashboard
