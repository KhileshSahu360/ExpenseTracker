import { DashboardHeader } from '@/components/Header'
import SideNav from '@/components/SideNav'
import React from 'react'
import { Outlet } from 'react-router-dom'
import { useLocation } from 'react-router-dom';


const DashboardCont = () => {
  const location = useLocation();
  return (
    <div className='grid grid-cols-10'>
      <SideNav path={location.pathname}/>
      <div className='md:col-span-8 col-span-10 lg:col-span-8'>
      <DashboardHeader path={location.pathname}/>
        <Outlet/>
      </div>
    </div>
  )
}

export default DashboardCont
