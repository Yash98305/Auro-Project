import React, { useEffect, useState } from "react";
import "../../css/login.css";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {  toast } from "react-toastify";
import img from "../Layout/Secure login-amico.png";
import { IconButton, OutlinedInput, TextField } from "@mui/material";
import { useAuth } from "../../context/auth";

const LoginPage = () => {
  const location = useLocation();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const { auth, setAuth, api } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${api}/user/login`, {
        email,
        password,
      });
      if (res) {
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        toast.success("Login successfully");
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate("/home");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  useEffect(() => {
    if (auth.token) {
      toast.success(`you already logged in`);
      navigate("/home");
    }
  }, [navigate, auth,location]);

  return (
    <>
   <div style={{display:"flex",}} >
    <div style={{width:"70%"}}>
      <img src={img} style={{ width: "85%", height: "100%" }} />
    </div>
    <div style={{width:"50%"}}>
          <form onSubmit={handleSubmit} style={{ width: "400px" }}>
            <h1 style={{ textAlign: "center", padding: "40px" }}>
              Login Yourself
            </h1>

            <TextField
              id="outlined-multiline-flexible"
              label="Email"
              value={email}
              name="email"
              required
              
              onChange={(e) => {
                setemail(e.target.value);
              }}
              style={{
                width: "100%",
                borderColor: "red",
                marginBottom: "40px",
              }}
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

            <button
              style={{
                width: "100%",
                padding: "17px",
                backgroundColor: "black",
                color: "white",
                fontSize: "15px",
                borderRadius: "7px",
              }}
            >
              Submit
            </button>
            <p
              style={{
                marginTop: "30px",
                textAlign: "right",
                marginRight: "7px",
              }}
            >
              Don't have an account yet?{" "}
              <NavLink to="/register">Sign up</NavLink>
            </p>
          </form>
        </div>
        </div>
    </>
  );
};

export default LoginPage;
