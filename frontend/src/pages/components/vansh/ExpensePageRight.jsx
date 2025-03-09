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
import { useAuth } from "../../../context/auth";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { toast } from "react-toastify";

const ExpensePageRight = ({ open, setOpen }) => {
  const [title, setTitle] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [account, setAccount] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [date, setDate] = React.useState(dayjs());
  const [data, setData] = React.useState([]);
  const [error, setError] = React.useState("");
  const [getAccount, setGetAccount] = React.useState([]);
  const { auth, api } = useAuth();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getCategoryData = async () => {
    try {
      const res = await axios.get(`${api}/category/getexpensecategory`, {
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
      console.error("Failed to fetch accounts:", err);
      setError("Failed to load accounts");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const expenseData = {
      title,
      accountId: account,
      amount,
      categoryId: category,
      expense_date: date,
    };
    try {
      const res = await axios.post(`${api}/expense/create`, expenseData, {
        headers: {
          Authorization: auth?.token,
        },
      });
      console.log(res);
      setTitle("");
      setAccount("");
      setAmount("");
      setCategory("");
      setDate(dayjs());
      toast.success("Expense recorded successfully");
    } catch (e) {
      toast.error(e.response.data.message);
    }

    handleClose();
  };

  React.useEffect(() => {
    getAccountData();
    getCategoryData();
  }, [auth]);

  return (
    <React.Fragment>
      <Button
        style={{ float: "right", margin: "30px 40px", display: "flex", backgroundColor: "#d9d9d9" }}
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
          <AddCircleOutlineOutlinedIcon sx={{ fontSize: "23px", marginRight: "4px" }} />
          Add Expense
        </div>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle sx={{ minWidth: "400px", backgroundColor: "green", color: "white" }}>
          Record Expense
        </DialogTitle>
        <DialogContent>
          <TextField
            sx={{ marginTop: "20px" }}
            autoFocus
            required
            margin="dense"
            id="title"
            name="title"
            label="Title"
            type="text"
            fullWidth
            value={title}
            variant="standard"
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextField
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
              <InputLabel sx={{ marginTop: "20px" }} id="account-label">
                Account
              </InputLabel>
              <Select
                labelId="account-label"
                id="account-select"
                value={account}
                sx={{ marginTop: "20px" }}
                label="Account"
                onChange={(e) => setAccount(e.target.value)}
              >
                {getAccount?.length > 0
                  ? getAccount.map((data) => (
                      <MenuItem key={data._id} value={data._id}>
                        {data.name}
                      </MenuItem>
                    ))
                  : error || "No accounts found"}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel sx={{ marginTop: "20px" }} id="category-label">
                Category
              </InputLabel>
              <Select
                labelId="category-label"
                id="category-select"
                value={category}
                sx={{ marginTop: "20px" }}
                label="Category"
                onChange={(e) => setCategory(e.target.value)}
              >
                {data?.length > 0
                  ? data.map((cat) => (
                      <MenuItem key={cat._id} value={cat._id}>
                        {cat.name}
                      </MenuItem>
                    ))
                  : error || "No categories found"}
              </Select>
            </FormControl>
          </Box>
          <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ width: "100%" }}>
            <DatePicker
              value={date}
              sx={{ width: "100%", marginTop: "20px" }}
              onChange={(newValue) => setDate(newValue)}
            />
          </LocalizationProvider>
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
    </React.Fragment>
  );
};

export default ExpensePageRight;
