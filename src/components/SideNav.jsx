import React from 'react'
import logo from '../../public/logo.svg'
import { RxDashboard } from "react-icons/rx";
import { Link } from 'react-router-dom';
import { LuPiggyBank } from "react-icons/lu";
import { SiExpensify } from "react-icons/si";

const SideNav = ({path}) => {
  var budgetPath = path.split('/');
  if(budgetPath.length > 3){
      budgetPath.shift();
      budgetPath.pop();
      budgetPath = budgetPath.join('/')
    }else{
      budgetPath = path
      budgetPath = budgetPath.split('');
      budgetPath.shift();
      budgetPath = budgetPath.join('');
    }
  return (
    <>
    <div className='h-full min-h-screen md:block hidden lg:block  border col-span-2'>
      <div className='h-20 flex place-items-center px-4'>
        <img src={logo} alt="" className='h-18'/>
      </div>
      <div className='flex flex-col gap-2 px-6'>
        <Link to={'/dashboard'} className={`p-5 font-semibold ${path==='/dashboard' ? 'text-primary bg-[#dbeafe]' : 'opacity-50'} flex items-center gap-2 rounded-md `}>
             <label htmlFor=""><RxDashboard className='text-[1.4rem]'/></label>   
             <label htmlFor="" className='text-[1.1rem]'>Dashboard</label>   
        </Link>
        <Link to={'/dashboard/budget'} className={`p-5 font-semibold ${budgetPath==='dashboard/budget' ? 'text-primary bg-[#dbeafe]' : 'opacity-50'} flex items-center gap-2 rounded-md `}>
             <label htmlFor=""><LuPiggyBank className='text-[1.4rem]'/></label>   
             <label htmlFor="" className='text-[1.1rem]'>Budget</label>   
        </Link>
        <Link to={'/dashboard/expenses'} className={`p-5 font-semibold ${path==='/dashboard/expenses' ? 'text-primary bg-[#dbeafe]' : 'opacity-50'} flex items-center gap-2 rounded-md `}>
             <label htmlFor=""><SiExpensify className='text-[1.4rem]'/></label>   
             <label htmlFor="" className='text-[1.1rem]'>Expences</label>   
        </Link>
      </div>
    </div>
    </>
  )
}

export default SideNav
