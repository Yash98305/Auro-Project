import React from 'react'
import Robot from "../assets/robot.gif"
import { useAuth } from '../context/auth';
const NotChat = () => {
    const {auth} = useAuth();
const user = localStorage.getItem("auth");

  return (
    <div style={{
      display:"flex",
      flexDirection:"column",
      width:"100vh",
      justifyContent:"center",
      alignItems:"center"
    }}>
       <img src={Robot} alt="sorry" style={{
        height:"30em",
        width:"30em"
       }} />
      <h1>
        Welcome, <span>{JSON.parse(user).user.name}!</span>
      </h1>
      <p>Please select a chat to Start messaging.</p>
    </div>
  )
}

export default NotChat