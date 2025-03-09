import { useState, useEffect, useContext, createContext, useRef } from "react";
import axios from "axios";

const AuthContext = createContext(null);
const api = "https://scaler-project.onrender.com/api/v1"
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });
  const [mot,setmot] = useState(true)
  const [person, setPerson] = useState({});
  const [activeUsers, setActiveUsers] = useState([]);
  const [newMessageFlag, setNewMessageFlag] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const[o,so]=useState(true)
  const [data,setData] = useState([])
  const [filtered, setFiltered] = useState([]);
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


  return (
    <AuthContext.Provider
      value={{
        api,
        auth,
        setAuth,
        person,
        setPerson, 
        activeUsers,
        setActiveUsers,
        newMessageFlag,
        setNewMessageFlag,showEmojiPicker,setShowEmojiPicker,mot,setmot,o,so,data,setData,filtered, setFiltered
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// custom hook
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider};
