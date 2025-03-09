import React, { useContext, useEffect, useState } from "react";
import "../css/users.css";
import axios from "axios";
import Avatar from "@mui/material/Avatar";

import { useAuth } from "../context/auth";
import img from "../assets/User-avatar-profile-icon-Graphics-17068385-1-1-580x386.jpg"
const Users = (props) => {
  const { api,auth, setPerson, socket, setActiveUsers } = useAuth();

  if (!auth || !auth.user) {
    console.error("Auth user data is not available");
    return null; // Prevent rendering if auth is undefined
  }


  const setConversation = async (data) => {
    try {
      await axios.post(`${api}/message/conversation/add`, data);
    } catch (error) {
      console.error("Error setting conversation:", error.message);
    }
  };

  const getUser = async () => {
    if (!props.val || !props.val._id) {
      console.error("Invalid user data:", props.val);
      return;
    }

    setPerson(props.val);
    await setConversation({
      senderId: auth.user._id,
      receiverId: props.val._id,
    });
  };

  useEffect(() => {
    if (!socket?.current) {
      console.error("Socket not initialized");
      return;
    }

    socket.current.emit("addUser", { id: auth.user._id });

    socket.current.on("getUsers", (users) => {
      setActiveUsers(users);
    });

    return () => {
      socket.current.off("getUsers");
    };
  }, [auth, socket, setActiveUsers]);

  return (
    <div style={{
      height: "60px",
    borderRadius: "40px",
    width: "100%",
    margin: "5px 0px",
    padding: "5px",
    display: "flex",
    backgroundColor: "#eeedeb",
alignItems:"center",
    borderRadius: "12px",

    boxShadow:"10px 10px 10px white" ,
marginBottom: "12px",  
}} onClick={getUser}>
      <Avatar
        src={
          !props.photo
            ? img
            : `http://localhost:8000/api/v1/user/photo/${props.val._id}`
        }
        alt={props.name || "User"}
      />
      <div style={{
        marginLeft:10
      }}>
        <div>{props.name || "Unknown"}</div>
        <div>{props.name || "Unknown"}</div>
      </div>
    </div>
  );
};

export default Users;
