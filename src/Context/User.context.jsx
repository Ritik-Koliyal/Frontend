import { useState, useEffect, useContext, createContext } from "react";
import axios from 'axios';
// user context
const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    user: null,
    token: "",
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    const tokenData = localStorage.getItem('token');

    if (userData && tokenData) {
      const parsedUser = JSON.parse(userData);
      setUser({
        user: parsedUser,
        token: tokenData
      });
    }
  }, []);

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = user?.token;
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

const useAuth = () => useContext(UserContext);

export { useAuth, UserProvider };
