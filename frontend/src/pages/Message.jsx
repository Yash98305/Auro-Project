import React, { useEffect } from "react";
import Body from "./Layout/Body.jsx";
import MessagePage from "./components/MessagePage.jsx"
import Animate from "../Animate.jsx";
import { useAuth } from "../context/auth.jsx";
import { useNavigate } from "react-router-dom";
const Message = () => {
  const navigate = useNavigate();
const {auth} = useAuth();

useEffect(() => {
  if (!auth?.token) {
    navigate('/login');
  }
}, [navigate, auth?.token]);
  return (
    <><Animate app={<Body obj={<MessagePage/>}/>}/>
    </>
    
  );
};

export default Message;
