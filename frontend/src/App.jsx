import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx" 
import Login from "./pages/Login.jsx" 
import Register from "./pages/Register.jsx" 
// import Header from "./pages/Header";
import ErrorPage from "./pages/ErrorPage.jsx";
import Forgot from "./pages/Forgot.jsx";
import Profile from "./pages/Profile.jsx";
import Category from "./pages/Category.jsx";
import Expenses from "./pages/Expenses.jsx";
import Income from "./pages/Income.jsx";
import Budget from "./pages/Budget.jsx";
import Statistic from "./pages/Statistic.jsx";
import Account from "./pages/Account.jsx";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
<>
    <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/forgot" element={<Forgot/>}/>
        <Route path="/category" element={<Category/>}/>
        <Route path="/expenses" element={<Expenses/>}/>
        <Route path="/income" element={<Income/>}/>
        <Route path="/budget" element={<Budget/>}/>
        <Route path="/statistic" element={<Statistic/>}/>
        <Route path="/account" element={<Account/>}/>
        <Route path="*" element={<ErrorPage/>}/>
      </Routes>
<ToastContainer/>
   </>
  );
};

export default App;
