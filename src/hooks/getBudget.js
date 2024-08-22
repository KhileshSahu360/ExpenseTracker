import axios from 'axios';
import React, { useEffect, useState } from 'react'

const useGetBudget = (isFetched) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [data, setData] = useState();
    
    useEffect(()=>{
        console.log('calll')
        if(isFetched){
            getData();
        }
    },[])
    
    const getData = async() => {
        console.log('hiii')
        const response = await axios.get(`${backendUrl}/api/budget/getbudget`);
        if(response.data.length > 0){
            setData(response.data)
        }
    }

    return [data];
}

export default useGetBudget
