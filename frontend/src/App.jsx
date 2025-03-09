import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx" 
import Item from "./pages/Item.jsx" 
import Message from "./pages/Message.jsx" 
import Login from "./pages/Login.jsx" 
import Register from "./pages/Register.jsx" 
// import Header from "./pages/Header";
import ErrorPage from "./pages/ErrorPage.jsx";
import Forgot from "./pages/Forgot.jsx";
import Profile from "./pages/Profile.jsx";
import { ToastContainer } from "react-toastify";
import ItemDetail from "./pages/ItemDetail.jsx";
import Chat from "./pages/Chat.jsx";

const App = () => {
  return (
<>
    <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/create-items" element={<Item/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/item/:id" element={<ItemDetail />} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/message" element={<Chat/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/forgot" element={<Forgot/>}/>
    
        <Route path="*" element={<ErrorPage/>}/>
      </Routes>
<ToastContainer/>
   </>
  );
};

export default App;
