import img from "../Layout/Mobile login-pana.png"
import { TextField } from '@mui/material'
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {  toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../context/auth";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { IconButton, OutlinedInput } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [password, setpassword] = useState("");

  const {api,auth} = useAuth();
const [showPassword, setShowPassword] = React.useState(false);
const handleClickShowPassword = () => setShowPassword((show) => !show);
const handleMouseDownPassword = (event) => {
  event.preventDefault();
};


//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const res = await axios.post(
//         `${api}/user/register`,
//         {
//           name,
//           email,
//           phone,
//           password,
//           avatar : photoapi
//         }
//       );
//       if (res && res.data.success) {
//         toast.success(res.data && res.data.message);
//         navigate("/login");
//       } else {
//         toast.error(res.data.message);
//       }
//     } catch (error) {
//       toast.error("Something went wrong");
//     }
//   };
//   const photoapi = `https://api.multiavatar.com/4645646/${Math.round(Math.random() * 1000)}.png`;
//   useEffect(()=>{
//     if(auth){
//       toast.success(`you already logged in`)
//       navigate("/home")}
//       },[navigate,auth])


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        `${api}/user/register`,
        {
          name,
          email,
          phone,
          password,
          avatar : photoapi
        }
      );
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
    const photoapi = `https://api.multiavatar.com/4645646/${Math.round(Math.random() * 1000)}.png`;

  useEffect(()=>{
    if(auth.token){
      toast.success(`you already logged in`)
      navigate("/home")}
      },[navigate,auth])
  return (
    <div style={{display:"flex",}} >
    <div style={{width:"70%"}}>
      <img src={img} style={{ width: "88%", height: "100%" }} />
    </div>
    <div style={{width:"50%"}}><form onSubmit={handleSubmit} style={{width:"400px"}}>
    <h1 style={{textAlign:"center",padding:"40px"}}>Register Yourself</h1>
    <TextField
          id="outlined-multiline-flexible"
          label="Name"
          value={name}
                name="name"
                required
                onChange={(e) => {
                  setname(e.target.value);
                }}
          multiline
       style={{ width:"100%",borderColor:"red",marginBottom:"40px"}} 
        />
    <TextField
          id="outlined-multiline-flexible"
          label="Email"
          value={email}
                name="email"
                required
                onChange={(e) => {
                  setemail(e.target.value);
                }}
          multiline
       style={{ width:"100%",borderColor:"red",marginBottom:"40px"}} 
        />
    <TextField
          id="outlined-multiline-flexible"
          label="Phone"
          value={phone}
                required
                name="phone"
                onChange={(e) => {
                  setphone(e.target.value);
                }}
          multiline
       style={{ width:"100%",borderColor:"red",marginBottom:"40px"}} 
        />
   <FormControl
              sx={{ m: 1, width: "400px", marginLeft: "-0.1px" }}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                value={password}
                name="password"
                required
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
        <button type="submit" style={{width:"100%",padding:"17px",backgroundColor:"black",color:"white",fontSize:"15px",borderRadius:"7px"}}>
            SUBMIT
        </button>
    </form>

    </div>
      </div>
  )
}

export default RegisterPage