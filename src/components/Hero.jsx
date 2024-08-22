import { SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react';
import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

const Hero = () => {
  return (
    <section className="bg-gray-50 flex flex-col items-center">
  <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
    <div className="mx-auto max-w-xl text-center ">
      <h1 className="text-3xl font-extrabold sm:text-5xl">
        Manage Your Expense
        <strong className="font-extrabold text-primary sm:block"> Control your Money </strong>
      </h1>

      <p className="mt-4 sm:text-xl/relaxed">
        Start creating your budget and save ton of money
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <SignedIn>
          <Link
            to={'/dashboard'}
            className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-blue-600 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
          >
            Dashboard
          </Link>
        </SignedIn>
        <SignedOut>
        <Button className="bg-primary"><SignInButton mode='modal' forceRedirectUrl='/dashboard' >Get Started</SignInButton></Button>
        </SignedOut>
      </div>
    </div>
  </div>
  <div className='-mt-24 '>
    <img src="/dashboard.png" alt="" className='h-[400px] border-2 rounded-lg'/>
  </div>
</section>
  )
}

export default Hero
