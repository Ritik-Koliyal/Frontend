import { useState, useEffect } from "react";
import { useAuth } from '../Context/User.context';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import Spinner from './Loader/Spinner';
// verify adimin .
export default function VerifyAdmin() {
  const API_BASE_URL = 'https://backend-4-z15j.onrender.com'
    ;
  const [ok, setOk] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const verifyCheck = async () => {
      try {
        if (!user?.token) {
          setOk(false);
          return;
        }
        const result = await axios.get(`${API_BASE_URL}/api/verify-admin`, {
          headers: {
            Authorization: `JWT ${user.token}`
          }
        });

        if (result.data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (error) {
        console.error("Verification failed:", error);
        setOk(false);
      }
    };

    verifyCheck();
  }, [user?.token]);

  return ok ? <Outlet /> : <Spinner path="login" />;
}
