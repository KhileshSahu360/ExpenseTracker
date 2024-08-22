import React from "react";
import logo from "../../public/logo.svg";
import { Button } from "./ui/button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { LuMenu } from "react-icons/lu";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Link } from 'react-router-dom';
import { RxDashboard } from "react-icons/rx";
import { LuPiggyBank } from "react-icons/lu";
import { SiExpensify } from "react-icons/si";

const SHEET_SIDES = ["top", "right", "bottom", "left"];

const Header = () => {
  return (
    <div className="flex justify-between items-center md:px-8 lg:px-6 px-4 py-4 border shadow-sm">
      <div>
        <img src={logo} alt="" className="h-18" />
      </div>
      <div>
        <SignedOut>
          <Button className="bg-primary">
            <SignInButton
              mode="modal"
              forceRedirectUrl="/dashboard"
            ></SignInButton>
          </Button>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};
const DashboardHeader = ({path}) => {
  return (
    <div className="flex h-20 md:justify-end justify-between lg:justify-end items-center md:px-8 lg:px-6 px-4 py-4 border shadow-sm">
      <div className="md:hidden block lg:hidden">
        <SheetSide path={path}/>
      </div>
      <UserButton />
    </div>
  );
};

const SheetSide = ({path}) => {
  return (
    <div className="grid  gap-2">
      <Sheet key={"left"} className="w-[100px]">
        <SheetTrigger asChild>
          <label htmlFor="">
            <LuMenu fontSize={"1.7rem"} />
          </label>
        </SheetTrigger>
        <SheetContent side={"left"}>
          <div className="h-20 flex place-items-center ">
            <img src={logo} alt="" className="h-18" />
          </div>
          <div className="flex flex-col gap-2 px-6">
            <Link
              to={"/dashboard"}
              className={`p-5 font-semibold ${
                path === "/dashboard"
                  ? "text-primary bg-[#dbeafe]"
                  : "opacity-50"
              } flex items-center gap-2 rounded-md `}
            >
              <label htmlFor="">
                <RxDashboard className="text-[1.4rem]" />
              </label>
              <label htmlFor="" className="text-[1.1rem]">
                Dashboard
              </label>
            </Link>
            <Link
              to={"/dashboard/budget"}
              className={`p-5 font-semibold ${
                path === "/dashboard/budget"
                  ? "text-primary bg-[#dbeafe]"
                  : "opacity-50"
              } flex items-center gap-2 rounded-md `}
            >
              <label htmlFor="">
                <LuPiggyBank className="text-[1.4rem]" />
              </label>
              <label htmlFor="" className="text-[1.1rem]">
                Budget
              </label>
            </Link>
            <Link
              to={"/dashboard/expences"}
              className={`p-5 font-semibold ${
                path === "/dashboard/expences"
                  ? "text-primary bg-[#dbeafe]"
                  : "opacity-50"
              } flex items-center gap-2 rounded-md `}
            >
              <label htmlFor="">
                <SiExpensify className="text-[1.4rem]" />
              </label>
              <label htmlFor="" className="text-[1.1rem]">
                Expences
              </label>
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export { DashboardHeader };
export default Header;
