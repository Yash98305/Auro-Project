import React from "react";
import "../css/message.css";
import { useAuth } from "../context/auth";
// import Search from "./Search"
import img from "../assets/User-avatar-profile-icon-Graphics-17068385-1-1-580x386.jpg"
const MessageHeader = ({personi}) => {
    const{activeUsers} = useAuth();

 
    return (
    <div className="messageheader">
      <div>
        <img src={!personi.photo?img:`http://localhost:8000/api/v1/user/photo/${personi._id}`} alt="" className="dp" />
        <div>
            <p className="user_name">{personi.name}</p>
            <p className="user_status">{activeUsers?.find(user => user.id === personi._id)?"Online":"Offline"}</p>
        </div>
      </div>
     
    </div>
  );
};

export default MessageHeader;