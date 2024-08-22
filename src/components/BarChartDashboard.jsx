import React, { useEffect, useState } from 'react'
import { Bar, BarChart, Legend, Tooltip, XAxis, YAxis } from 'recharts'

const BarChartDashboard = ({budgetData}) => {
    const [chartBudget, setChartBudget] = useState();
    useEffect(()=>{
        const newArr = budgetData?.map((elm)=>{
            const expenses = elm?.expenses;
            const totalSpend = expenses?.reduce((acc, current)=>{
                return acc + current.expenseAmount
            },0)
            return {...elm, totalSpend};
        })
        setChartBudget(newArr);

    },[budgetData])
  return (
    <div>
      <BarChart
       width={500}
       height={300}
       data={chartBudget}
      >
       <XAxis dataKey={'budgetName'}/>
       <YAxis/>
       <Tooltip/>
       <Legend/>
       <Bar dataKey={'budgetAmount'} stackId={'a'} fill='#4845d2'/>
       <Bar dataKey={'totalSpend'} stackId={'a'} fill='#C3C2FF'/>
      </BarChart>
    </div>
  )
}

export default BarChartDashboard
