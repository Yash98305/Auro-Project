import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { useAuth } from "../../../context/auth";
import PieChart from "./PieChart";
import { useEffect } from "react";

const CategoryCreate = ({ open, setOpen, categories }) => {
  const [type, setType] = React.useState("");
  const [name, setName] = React.useState("");
  const { auth, api } = useAuth();
  const handleChange = (event) => {
    setType(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const Submit = async (event) => {
    event.preventDefault();
    const data = {
      type,
      name,
    };
    try {
      await axios.post(`${api}/category/create`, data, {
        headers: {
          Authorization: auth?.token,
        },
      });
      setName("");
      setType("");
    } catch (e) {
      console.error(e);
    }
    handleClose();
  };
    useEffect(() => {
      
    }, [name, auth]);
  return (
    <>
      <div>
        <Button
          style={{
            float: "right",
            marginTop: "50px",
            marginRight: "280px",
            margin: "30px 40px",
            display: "flex",
            backgroundColor: "#d9d9d9",
          }}
          variant="contained"
          color="success"
          onClick={handleClickOpen}
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
            Add Category
          </div>
        </Button>

        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: "form",
            onSubmit: Submit,
          }}
        >
          <DialogTitle
            sx={{ minWidth: "400px", backgroundColor: "green", color: "white" }}
          >
            Add Category
          </DialogTitle>
          <DialogContent>
            <TextField
              sx={{ marginTop: "20px" }}
              autoFocus
              required
              margin="dense"
              id="category"
              name="category"
              label="Category Name"
              type="text"
              fullWidth
              value={name}
              variant="standard"
              onChange={(e) => setName(e.target.value)}
            />

            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel
                  sx={{ marginTop: "20px" }}
                  id="demo-simple-select-label"
                >
                  Type
                </InputLabel>
                <Select
                  sx={{ marginTop: "20px" }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={type}
                  label="Type"
                  onChange={handleChange}
                >
                  <MenuItem value={"income"}>Income</MenuItem>
                  <MenuItem value={"expense"}>Expense</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </DialogContent>

          <DialogActions>
            <Button variant="contained" color="warning" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" color="success" type="submit">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div style={{ height: "100%", display: "flex", alignItems: "end" }}>
        <PieChart sx={{ border: "2px solid red" }} categories={categories} />
      </div>
    </>
  );
};

export default CategoryCreate;
