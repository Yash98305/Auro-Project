import React, { useEffect, useState } from "react";
// import "../../css/edit.css";
import { useNavigate, useParams } from "react-router-dom";
import {  toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../../context/auth.js";
const Pro = ({ setEdit }) => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");
  const [about, setAbout] = useState("");
  const ls = JSON.parse(localStorage.getItem("auth"));

  const getUser = async () => {
      let ls = localStorage.getItem("auth");
      ls = JSON.parse(ls);
      const res = await axios.get(
        "http://localhost:8000/api/v1/user/myprofile",
        {
          headers: {
            Authorization: ls.token,
          },
        }
      );
      setName(res.data.user.name);
      setPhone(res.data.user.phone);
      setEmail(res.data.user.email);
      setAbout(res.data.user.about);
   
  };
  useEffect(() => {
    getUser();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      let newForm = new FormData();
      newForm.append("name", name);
      newForm.append("phone", phone);
      photo && newForm.append("photo", photo);
      about && newForm.append("about", about);
      // for (var key of newForm.entries()) {
      //   console.log(key[0] + ", " + key[1]);
      // }
      const res = await axios.put(
        `http://localhost:8000/api/v1/user/updateprofile/${ls.user._id}`,
        newForm
      );
      if (res && res.data.success) {
        setAuth({ ...auth, user: res?.data.user });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = res.data.user;
      
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
        window.location.reload();
        setEdit(false);
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };
  return (
    <>
      <div className="space"></div>
      <div className="pro_con">
      
        <div>
          {photo ? (
            <div className="text-center">
              <img
                src={URL.createObjectURL(photo)}
                alt="product_photo"
                height={"200px"}
                className="img img-responsive"
              />
            </div>
          ) : (
            <div className="text-center">
              <img
                src={
                  !ls.user.photo
                    ? ls.user.avatar
                    : `http://localhost:8000/api/v1/user/photo/${ls.user._id}`
                }
                alt="product_photo"
                height={"200px"}
                className="img img-responsive"
              />
            </div>
          )}
        </div>
        <div class="container">
          <div class="text">Update Profile</div>
        
          <form onSubmit={handleUpdate}>
            <div>
              <label
                className="button3"
                style={{ width: "190px", padding: "15px" }}
              >
                {photo ? (
                  <span class="button__text">Upload Photo</span>
                ) : (
                  <span class="button__text">Upload Photo</span>
                )}

                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                />

                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                />
              </label>
            </div>
            <div class="form-row">
              <div class="input-data">
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoFocus
                />
                <div class="underline"></div>
                <label for="">Your Name</label>
              </div>
            </div>
            <div class="form-row">
              <div class="input-data">
                <input
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div class="underline"></div>
                <label for="">Email Address</label>
              </div>
              <div class="input-data">
                <input
                  type="text"
                  placeholder="Phone"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <div class="underline"></div>
                <label for="">Contact No.</label>
              </div>
            </div>
            {/* <div class="form-row">
              <div class="input-data textarea">
                <textarea rows="8" cols="80" required></textarea>
                <br />
                <div class="underline"></div>
                <label for="">Write your message</label>
                <br />
                <div class="form-row submit-btn">
                  <div class="input-data">
                    <div class="inner"></div>
                    <input type="submit" value="submit" />
                  </div>
                </div>
              </div>
            </div> */}
            <div class="form-row">
              <div class="input-data">
                <input
                  type="text"
                  value={about}
                  placeholder="write a description"
                  className="form-control"
                  onChange={(e) => setAbout(e.target.value)}
                />
                <div class="underline"></div>
                <label for="">About</label>
              </div>
            </div>
            <button type="submit" className="button2">
              <div className="svg-wrapper-1">
                <div className="svg-wrapper">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path
                      fill="currentColor"
                      d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                    ></path>
                  </svg>
                </div>
              </div>
              <span>Update Profile</span>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Pro;
