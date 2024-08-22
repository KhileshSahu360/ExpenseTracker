import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ClerkProvider, SignedIn, SignedOut, SignIn } from '@clerk/clerk-react'
import { createBrowserRouter,  RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import DashboardCont from './components/DashboardCont.jsx'
import Header from './components/Header.jsx'
import Budget from './pages/Budget.jsx'
import Expences from './pages/Expences.jsx'
import Dashboard from './pages/Dashboard.jsx'
import { Provider } from 'react-redux'
import store from './Store/Store.js'
import NotFound from './pages/NotFound.jsx'
import MangageBudget from './pages/MangageBudget.jsx'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[
      {
        path : '/',
        element : <Home/>
      }
    ]
  },
      {
        path:'/dashboard',
        element:<>
          <SignedIn>
            <DashboardCont/>
          </SignedIn>
          <SignedOut>
            <SignIn/>
          </SignedOut>
        </>,
        children:[
          { path : '/dashboard', element:<Dashboard/>},
          { path : '/dashboard/budget', element:<Budget/>},
          { path : '/dashboard/budget/:budgetId', element:<MangageBudget/>},
          { path : '/dashboard/expenses', element:<Expences/>}
        ]
      },
      {path : '*', element:<NotFound/>},
])


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
      <Provider store={store}>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
    <RouterProvider router={router} />
    </ClerkProvider>
      </Provider>

  // {/* </React.StrictMode>, */}
)
