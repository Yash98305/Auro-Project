import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import { useAuth } from "../../../context/auth";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ExportData from "../yash/ExportData";
import { useEffect } from "react";

const BudgetPageRight = ({open,setOpen}) => {
  const [title, setTitle] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [account, setAccount] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [value, setValue] = React.useState(dayjs(new Date()));
  const [data, setData] = React.useState();
  const [error, setError] = React.useState("");
  const [getAccount,setGetAccount] = React.useState()
  const {auth, api } = useAuth();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getCategoryData = async () => {
    try {
      const res = await axios.get(`${api}/category/getincomecategory`, {
        headers: {
          Authorization: auth?.token,
        },
      });

      setData(res.data.categories);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
      setError("Failed to load categories");
    }
  };
  const getAccountData = async () => {
    try {
      const res = await axios.get(`${api}/account/get`, {
        headers: {
          Authorization: auth?.token,
        },
      });
      setGetAccount(res.data.account);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
      setError("Failed to load categories");
    }
  };
  const Submit = async (event) => {
    event.preventDefault();
    const data = {
      title,
      accountId: account,
      amount,
      categoryId: category,
      income_date: value,
    };
    try {
      await axios.post(`${api}/income/create`, data, {
        headers: {
          Authorization: auth?.token,
        },
      });
      // setName("");
      // setType("");
    } catch (e) {
      console.error(e);
    }
    
    handleClose();
  };
  useEffect(() => {
     getAccountData();
     getCategoryData();
   }, [api,auth]);
  
  return (
    <>
<ExportData/>
     {/* <Button
      style={{ float: "right", margin: "30px 40px", display: "flex",backgroundColor: "#d9d9d9",color:"#2e335b" }}
        sx={{ float: "right", margin: "30px 40px", display: "flex" }}
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
                  <AddCircleOutlineOutlinedIcon sx={{fontSize: "23px",marginRight:"4px"}} />

        Set Goles
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

        >Set Your Goles</DialogTitle>
        <DialogContent>
          <TextField
          sx={{marginTop:"20px"}}
            autoFocus
            required
            margin="dense"
            id="title"
            name="tile"
            label="Title"
            type="text"
            fullWidth
            value={title}
            variant="standard"
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextField
            autoFocus
            required
            sx={{ marginTop: "20px" }}
            margin="dense"
            id="amount"
            name="amount"
            label="Amount"
            type="number"
            fullWidth
            value={amount}
            variant="standard"
            onChange={(e) => setAmount(e.target.value)}
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
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={account}
                sx={{ marginTop: "20px" }}
                label="Account"
                onChange={(e) => setAccount(e.target.value)}
              >
             {getAccount?.length > 0
                  ? getAccount.map((data, index) => (
                      <MenuItem key={data._id} value={data._id} onChange={(e)=>setData()}>{data.name}</MenuItem>
                    ))
                  : error || "No categories found"}

                
              </Select>
            </FormControl>
          </Box>

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
                value={category}
                label="Category"
                onChange={(e) => setCategory(e.target.value)}
              >
              
                {data?.length > 0
                  ? data.map((data, index) => (
                      <MenuItem key={data._id} value={data._id} onChange={(e)=>setData()}>{data.name}</MenuItem>
                    ))
                  : error || "No categories found"}
              </Select>
            </FormControl>
          </Box>
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            sx={{ width: "100%" }}
          >
            <DemoContainer
              components={["DatePicker"]}
              sx={{ marginTop: "10px", width: "100%" }}
            >
              <DatePicker
                value={value}
                sx={{ width: "100%" }}
                onChange={(newValue) => setValue(newValue)}
              />
            </DemoContainer>
          </LocalizationProvider>
        </DialogContent>

        <DialogActions>
        <Button  variant="contained"
        color="warning" onClick={handleClose}>Cancel</Button>
          <Button  variant="contained"
        color="success" type="submit">Submit</Button>
        </DialogActions>
      </Dialog> */}
    </>
  );
};

export default BudgetPageRight

