import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from './App.jsx'
import { dashboardAdmin } from './pages/dashboard.admin.jsx';
import { dashboardSales } from './pages/dashboard.sales.jsx';
import { loginPage } from './pages/auth/login.jsx';
import { regisgerPage } from './pages/auth/register.jsx';

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index Component={App}></Route>
        <Route path='/login' Component={loginPage}></Route>
        <Route path='/register' Component={regisgerPage}></Route>
        <Route path='/dashboard/admin' Component={dashboardAdmin}></Route>
        <Route path='/dashboard/sales' Component={dashboardSales}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
