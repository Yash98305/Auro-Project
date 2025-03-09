import * as React from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { useAuth } from "../../../context/auth";
import { useEffect } from "react";

const AccountRight = () => {
  const [name, setName] = React.useState("");
  const { auth,api } = useAuth();



  const handleSub =async ()=>{
    try {
        const res = await axios.get(`${api}/account/create`, {
          headers: {
            Authorization: auth?.token,
          }
        });
      } catch (e) {
        console.error(e);
      }
  }
useEffect(() => {

  }, [auth,name]);


  return (
    <React.Fragment>
      <Button
        sx={{ float: "right", margin: "30px 40px", display: "flex" }}
        variant="contained"
        color="success"
        onClick={handleSub}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "15px",
          }}
        >
          <AddCircleOutlineOutlinedIcon
            sx={{ fontSize: "23px", marginRight: "4px" }}
          />
          Add Account
        </div>
      </Button>
    </React.Fragment>
  );
};

export default AccountRight;
