import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import BigCalendar from './Components/Bigcalendar.jsx'
import CustomerList from './Components/Customerlist.jsx'
import Error from './Components/Error.jsx'
import Trainingslist from './Components/Trainingslist.jsx'
import Stats from './Components/Charts.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<CustomerList />} />
          <Route path="trainings" element={<Trainingslist />} />
          <Route path="customers" element={<CustomerList />} />
          <Route path="calendar" element={<BigCalendar />} />
          <Route path="stats" element={<Stats />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>
);