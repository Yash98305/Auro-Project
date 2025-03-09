import React, { useEffect, useState } from "react";
import "../css/menu.css";
import Users from "./Users";
import axios from "axios";
import img from "../assets/User-avatar-profile-icon-Graphics-17068385-1-1-580x386.jpg"
import { useAuth } from "../context/auth";
// import Search from "./Search";

const Menu = ({setText,text}) => {

  const {api,auth} = useAuth();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        let data = await getUsers();
        let fiteredData = data.filter(user => user.name.toLowerCase().includes(text.toLowerCase()));
        setUsers(fiteredData);
    }
    fetchData();
}, [text]);

  const getUsers = async () => {
    try {
      const res = await axios.post(
        `${api}/user/getallusers`,{
          _id : auth?.user?._id
        }
      );
      return res.data.users
    } catch (e) {
      console.log("Error while fetching all user data");
    }
  };



  
  return (
   
      
      <div style={{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center"
      }}>
        {users.map((val) => {
        return(
            val._id!==auth?.user?._id &&
            <Users
              key={val._id}
              name={val.name}
              photo={val.photo}
              val={val}
             
            />
       
       ) })}
      </div>
  );
};

export default Menu;