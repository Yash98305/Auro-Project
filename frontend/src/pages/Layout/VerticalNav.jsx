import React, { useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import AccountBoxRoundedIcon from "@mui/icons-material/AccountBoxRounded";
import PaidRoundedIcon from "@mui/icons-material/PaidRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ArchiveRoundedIcon from "@mui/icons-material/ArchiveRounded";
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";
import InventoryRoundedIcon from "@mui/icons-material/InventoryRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import { useAnimationFrame } from 'framer-motion';
import { useAuth } from '../../context/auth';

const VerticalNav = ({handleLogout}) => {
  const location= useLocation();
    const {so} = useAuth()
    const lpath = location.pathname
    useEffect(()=>{
    },[location])
   return (
    <><ul onClick={()=>so?.(false)}>
    <NavLink to="/home" >
      <li style={{backgroundColor:`${lpath=="/home" ? '#ccc' : ''}` }}>
        <HomeRoundedIcon color="#2E335B" />
        <span style={{ paddingLeft: "10px" }}>Overview</span>
      </li>
    </NavLink>
    
      <NavLink to="/create-items">

    <li style={{backgroundColor:`${lpath=="/expenses" ? '#ccc' : ''}` }}>
      <ArchiveRoundedIcon color="#2E335B" />
      <span>Items</span>
    </li>
    </NavLink>
      <NavLink to="/message">

    <li style={{backgroundColor:`${lpath=="/expenses" ? '#ccc' : ''}` }}>
      <InventoryRoundedIcon color="#2E335B" />
      <span>Messages</span>
    </li>
    </NavLink>
   
    
   
   
  </ul>
  <ul>
  <NavLink to="/profile">
    <li style={{width:"150px", backgroundColor:`${lpath=="/profile" ? '#ccc' : ''}` }}>
      <AccountBoxRoundedIcon color="#2E335B" />
      <span>Profile</span>
      
    </li>
    </NavLink>
      <NavLink to="/login" onClick={handleLogout}>
    <li>
      <LogoutRoundedIcon color="#2E335B" />
      <span>Log Out</span> 
    </li>
      </NavLink>
  </ul></>
  )
}

export default VerticalNav