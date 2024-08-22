import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import EmojiPicker from "emoji-picker-react";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import Loader from "./Loader";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { budgetAction } from "@/Store/Store";
import { FaEdit } from "react-icons/fa";


export function EditBudget({budgetData, getSelectedBudget}) {
    const { user } = useUser()
    const userEmail = user.emailAddresses[0].emailAddress;
    const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
    const [emoji, setEmoji] = useState();
    const [budgetName, setBudgetName] = useState('');
    const [budgetAmount, setBudgetAmount] = useState('');
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const emojiClick = (emoji) => {
      setEmoji(emoji.emoji);
      setEmojiPickerOpen(!emojiPickerOpen)
    }
    useEffect(()=>{
      setBudgetName(budgetData?.budgetName);
      setBudgetAmount(budgetData?.budgetAmount);
      setEmoji(budgetData?.icon);
    },[budgetData])

    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        updateBudget();
      }
    };
  
    
    const updateBudget = async(event) => {
      event.preventDefault();
      const data = {
        budgetName,
        budgetAmount,
        icon : emoji,
        createdBy : userEmail
      }
      setLoading(true);
      const response  = await axios.put(`${backendUrl}/api/budget/updatebudget/${budgetData._id}`, data);
      if(response.status===200){
        setBudgetAmount('')
        setBudgetName('')
        await getSelectedBudget();
        dispatch(budgetAction.setIsBudgetDataFetched(false));
        dispatch(budgetAction.setIsBudgetDataFetchedDashboard(false));
        setLoading(false);
        toast.success('Budget updated!')
      }
      
    }
  return (
    <Dialog>
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
      <DialogTrigger asChild>
            <Button>
              <label htmlFor="" className="bg-primary px-4 py-2 flex gap-1 rounded-md font-medium cursor-pointer text-white items-center"><FaEdit fontSize={'1.2rem'}/>Edit</label>
            </Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-[60%] max-w-[90%] lg:max-w-[40%]">
        <form action="" onSubmit={updateBudget}>
        <DialogHeader>
          <DialogTitle className="font-semibold">Edit Budget</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4 relative">
            <div>
                <label className="px-4 py-2 border-2 cursor-pointer rounded-md" htmlFor="" onClick={()=>setEmojiPickerOpen(!emojiPickerOpen)}>{emoji}</label>
            </div>
            <div className="absolute top-14">
                <EmojiPicker className="absolute top-0 z-50" open={emojiPickerOpen} onEmojiClick={emojiClick}/>
            </div>
          <div className="grid grid-cols-4 mt-2 items-center gap-4">
            <Label htmlFor="name" className="text-left col-span-4">
              Budget Name
            </Label>
            <Input
                placeholder="e.g. travel"
                className="col-span-4"
                value={budgetName}
                onChange={(event)=>setBudgetName(event.target.value)}
                />
          </div>
          <div className="grid grid-cols-4 items-center gap-2">
            <Label htmlFor="username" className="text-left col-span-4">
              Budget Amount
            </Label>
            <Input
                placeholder="e.g. 5000"
                type="number"
                className="col-span-4"
                value={budgetAmount}
                onChange={(event)=>setBudgetAmount(event.target.value)}
            />
          </div>
        </div>
        <DialogFooter className={'grid grid-cols-1'}>
            <Button disabled={(budgetName?.length==0  || budgetAmount?.length==0) || (budgetData.budgetName===budgetName && budgetData.budgetAmount===budgetAmount && budgetData.icon===emoji) }onKeyDown={handleKeyDown} type="submit" className="col-span-1 py-5">{loading?<Loader/>:'Update Budget'}</Button>
        </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
