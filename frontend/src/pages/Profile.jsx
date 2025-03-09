import React, { useEffect, useState } from "react";
import ProfilePage from "./components/ProfilePage";
import { useAuth } from "../context/auth";
import Body from "./Layout/Body";
import { useNavigate } from "react-router-dom";
const Profile = () => {
const {auth,api} = useAuth();
const navigate = useNavigate();

  useEffect(() => {
   
  }, [navigate, auth,api]);
 
  return (
    <>
          <Body obj={<ProfilePage/>}/>   
    </>
  );
};

export default Profile;
