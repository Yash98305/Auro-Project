import { useState, useEffect, useContext, createContext, useRef } from "react";
import axios from "axios";
import { io } from 'socket.io-client';
const AuthContext = createContext(null);
const api = "https://auro-project.onrender.com/api/v1"
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });
    const [searchQuery, setSearchQuery] = useState("");
  const [mot,setmot] = useState(true)
  const [person, setPerson] = useState({});
  const [activeUsers, setActiveUsers] = useState([]);
  const [newMessageFlag, setNewMessageFlag] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const[o,so]=useState(true)

  const socket = useRef();


  //default axios
  axios.defaults.headers.common["Authorization"] = auth?.token;

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        ...auth,
        user: parseData.user,
        token: parseData.token,
      });
    }

    //eslint-disable-next-line
  }, []);
  useEffect(() => {
    socket.current = io("ws://localhost:8000");
  }, []);

  return (
    <AuthContext.Provider
      value={{
        api,
        auth,socket,
        setAuth,
        person,
        setPerson, 
        activeUsers,
        setActiveUsers,
        newMessageFlag,searchQuery, setSearchQuery,
        setNewMessageFlag,showEmojiPicker,setShowEmojiPicker,mot,setmot,o,so
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// custom hook
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider};
