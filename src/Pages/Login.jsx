import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../Context/User.context";
import { Link } from "react-router-dom";
import Loader from '../Components/Loader/Loader';

function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = 'https://backend-4-z15j.onrender.com'
    ;

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when form is submitted
    try {
      console.log("Submitting form with:", { email, password });
      const res = await axios.post(`${API_BASE_URL}/api/login`, {
        email,
        password,
      });

      if (res.data.result) {
        const { token, user } = res.data.result;

        // Update localStorage with token and user info
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        // Update context state with setUser
        setUser({
          user,
          token,
        });

        toast.success("Login successful!");
        navigate(location.state || "/");
      } else {
        toast.error(res.data.error);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Invalid Email or Password please chek ");
    } finally {
      setLoading(false); // Set loading to false 
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className="container d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="col-md-6 border p-5">
          <h2 className="text-center mb-4">Log in</h2>
          <form className="d-flex flex-column" onSubmit={submit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-warning">
              Log in
            </button>
            <div className="d-flex ">
              <p className="mt-2 text-muted ">Don't have an account <Link to="/signup"> signup / register</Link></p>
              <p className="mt-2 mx-4 text-muted  ">Password lost..<Link to="/forgetPassword">Reset Password </Link></p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;


