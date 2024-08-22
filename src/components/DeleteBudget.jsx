import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { AiOutlineDelete } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { budgetAction } from "@/Store/Store";


const DeleteBudget = ({budgetId}) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const deleteBudget = async() => {
        const response = await axios.delete(`${backendUrl}/api/budget/deletebudget/${budgetId}`)
        if(response.data.status===true){
          toast.success('Budget Deleted!')
          dispatch(budgetAction.setIsBudgetDataFetched(false));
          dispatch(budgetAction.setIsBudgetDataFetchedDashboard(false));
          setTimeout(() => {
            navigate('/dashboard/budget');
          }, 2000);
        }
    }

    return (
    <AlertDialog>
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
      <AlertDialogTrigger>
          <label htmlFor="" className="bg-red-600 px-4 py-2 flex gap-1 rounded-md font-medium cursor-pointer text-white items-center"><AiOutlineDelete fontWeight={'bold'}  fontSize={'1.2rem'}/>Delete</label>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            Budget.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteBudget}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteBudget;