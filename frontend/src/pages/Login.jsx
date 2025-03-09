import React, { useEffect, useState } from "react";
import Body from "./Layout/Body.jsx";
import Animate from "../Animate.jsx";
import LoginPage from "./components/LoginPage.jsx"
const Login = () => {
 

  return (
    <>
    <Animate app={<Body obj={<LoginPage/>}/>}/>

      
    </>
    
  );
};

export default Login;
