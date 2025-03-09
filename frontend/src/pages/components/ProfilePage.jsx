import { Avatar, Box, Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import CircleIcon from "@mui/icons-material/Circle";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const { auth, setAuth, api,so,o} = useAuth();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [about, setAbout] = useState("");
  const [address, setAddress] = useState("");
  const [photo, setPhoto] = useState("");
const navigate = useNavigate()
  const getUser = async () => {
    try {
      const res = await axios?.get(`${api}/user/myprofile`, {
        headers: {
          Authorization: auth?.token,
        },
      });
      setName(res.data.user.name);
      setPhone(res.data.user.phone);
      setEmail(res.data.user.email);
      setAbout(res.data.user.about);
      setAddress(res.data.user.address);
    } catch (error) {
      console.log(error);
    }
    
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      let newForm = new FormData();
      newForm.append("name", name);
      newForm.append("phone", phone);
      newForm.append("about", about);
      newForm.append("address", address);
      photo && newForm.append("photo", photo);

      const res = await axios.put(`${api}/user/updateprofile/${auth?.user?._id}`, newForm, {
        headers: {
          Authorization: auth?.token,
        },
      });

      if (res && res.data.success) {
        setAuth({ ...auth, user: res?.data.user });
        localStorage.setItem("auth", JSON.stringify({ ...auth, user: res?.data.user }));
        toast.success("Profile Updated Successfully");
        setOpen(false);
        so(!o);
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePhotoChange = (event) => {
    setPhoto(event.target.files[0]);
  };

  useEffect(() => {
    getUser();
  }, [auth, api,open,o]);

  return (
    <div style={{ display: "flex", marginTop: "20px", justifyContent: "space-between" }}>
      <div style={{ width: "25%", height: "80vh", padding: "10px" }}>
        <h2 style={{ margin: "5px 0px" }}>My Profile</h2>
        <div style={{ display: "flex" }}>
          <div>
            {photo ? (
              <Avatar alt="Profile Picture" src={URL.createObjectURL(photo)} sx={{ zIndex: 0, width: 170, height: 170, borderRadius: 2 }} />
            ) : (
              <Avatar
                alt="Profile Picture"
                src={!auth?.user?.photo ? auth?.user?.avatar : `${api}/user/photo/${auth?.user?._id}`}
                sx={{ zIndex: 0, width: 170, height: 170, borderRadius: 2 }}
              />
            )}
          </div>

          <div style={{ textAlign: "right", width: "100%" }}>
            <Button
              style={{ background: "#2196f3", color: "white", padding: 5 }}
              variant="outlined"
              onClick={handleClickOpen}
            >
              <EditRoundedIcon style={{ color: "white", height: 20 }} /> Edit
            </Button>
            <Dialog
              open={open}
              onClose={handleClose}
              PaperProps={{
                component: "form",
                onSubmit: handleUpdate,
              }}
            >
              <DialogTitle style={{ width: "30vw" }}>Update Your Profile</DialogTitle>
              <DialogContent>
                <p>Name : </p>
                <TextField
                  id="outlined-basic"
                  required
                  margin="dense"
                  name="name"
                  label="Name"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <p>Email : </p>
                <TextField
                  id="outlined-basic"
                  required
                  margin="dense"
                  name="email"
                  label="Email Address"
                  type="email"
                  fullWidth
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <p>Phone No. : </p>
                <TextField
                  id="outlined-basic"
                  required
                  margin="dense"
                  name="phone"
                  label="Phone No."
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <p>Address : </p>
                <TextField
                  id="outlined-basic"
                  margin="dense"
                  name="address"
                  label="Address"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <p>About : </p>
                <TextField
                  id="outlined-basic"
                  margin="dense"
                  name="about"
                  label="About"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
                <p>Photo : </p>
                <Box component="label" sx={{ display: "block", marginTop: "10px" }}>
                  <input
                    accept="image/*"
                    id="upload-photo"
                    type="file"
                    style={{ display: "none" }}
                    onChange={handlePhotoChange}
                  />
                  <Button variant="contained" component="span">
                    Upload Photo
                  </Button>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button variant="contained" color="error" onClick={handleClose}>
                  Cancel
                </Button>
                <Button type="submit" variant="contained" color="success">
                  Submit
                </Button>
              </DialogActions>
            </Dialog>

            <h5 style={{ textAlign: "left", margin: "15px 0px 0px 5px", opacity: "0.9", color: "green" }}>
              <CircleIcon style={{ height: "12px" }} color="success" />
              Active User
            </h5>
            <h5 style={{ textAlign: "left", margin: "15px 0px 0px 15px", opacity: "0.7" }}>
              First Name
            </h5>
            <p style={{ textAlign: "left", margin: "3px 15px" }}>{auth?.user?.name?.split(" ")[0]}</p>
            <h5 style={{ textAlign: "left", margin: "15px 0px 0px 15px", opacity: "0.7" }}>
              Last Name
            </h5>
            <p style={{ textAlign: "left", margin: "3px 15px" }}>{auth?.user?.name?.split(" ")[1]}</p>
          </div>
        </div>
      </div>
      <div style={{ width: "72%", padding: "10px" }}>
        <h2 style={{ margin: "5px 0px" }}>Basic Details</h2>

        <p>Name : </p>
                <TextField
                  id="outlined-basic"
                disabled
                  margin="dense"
                  name="name"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={name}
                />
                <p>Email : </p>
                <TextField
                  id="outlined-basic"
                  disabled
                  margin="dense"
                  name="email"
                  type="email"
                  fullWidth
                  variant="outlined"
                  value={email}
                />
                <p>Phone No. : </p>
                <TextField
                disabled
                  id="outlined-basic"
                  margin="dense"
                  name="phone"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={phone}
                />
                <p>Address : </p>
                <TextField
                disabled
                  id="outlined-basic"
                  margin="dense"
                  name="address"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={address}
                />
                <p>About : </p>
                <TextField
                disabled
                  id="outlined-basic"
                  margin="dense"
                  name="about"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={about}
                />
      </div>
    </div>
  );
};

export default Profile;
