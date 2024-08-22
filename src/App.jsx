import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/button'
import Header from './components/Header'
import Hero from './components/Hero'
import { Outlet } from 'react-router-dom'
import Home from './pages/Home'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <>
      <Header/>
      <Outlet/>
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
    </>
  )
}

export default App
