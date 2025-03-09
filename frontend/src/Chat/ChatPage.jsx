import React, { useEffect, useState } from "react";
import Menu from "./Menu.jsx";
import Message from "./Message.jsx";
import NotChat from "./NotChat.jsx";
import { useAuth } from "../context/auth.jsx";
import { useLocation } from "react-router-dom";
import axios from "axios";
const ChatPage = () => {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sellerId = searchParams.get("sellerid");

  const {api,auth,person,setPerson,setConversation} = useAuth();
  const [text,setText] = useState("");
 
  const getMessages = async () => {
    try {
      let res = await axios.get(
        `${api}/message/get/${sellerId}`
      );
      return res.data;
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(()=>{
    getMessages()
  },[auth,sellerId])
  
  return (
    <div style={{
      display:"flex",

    }}>
    <div style={{
      width:"20%"
    }}> <Menu text={text} setText={setText}/></div>
    <div style={{
      width:"80%",
      objectFit:"cover",
      transform:"translate(8em)"
    }}>{Object.keys(person).length>2?<> <Message /></>:<><NotChat/></>}</div>
    
        {/* <div className="space" />
        <div className="con_chat">
          <Menu text={text} setText={setText}/>
        {Object.keys(person).length>2?<> <Message /></>:<><NotChat/></>}
         
        </div> */}
    </div>
  );
};

export default ChatPage;