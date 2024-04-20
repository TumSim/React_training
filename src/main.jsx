import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CustomerList from './Components/Customerlist.jsx'
import Trainingslist from './Components/Trainingslist.jsx'
import BigCalendar from './Components/Bigcalendar.jsx'
import Error from './Components/Error.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element:<App />,
    errorElement: <Error />,
    children:[
      {
        element: <CustomerList />,
        index: true
      },
      {
        path: "trainings",
        element: <Trainingslist />
      },
      {
        path: "customers",
        element: <CustomerList />
      },
      {
        path: "calendar",
        element: <BigCalendar />
      }
    ]
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);