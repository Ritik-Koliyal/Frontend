import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Loader from '../Components/Loader/Loader';

function Signup() {
  const API_BASE_URL = 'http://localhost:2100';
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("Submitting form with:", { fullName, email, password, phone, address, answer, isAdmin });
      const res = await axios.post(`${API_BASE_URL}/api/signup`, {
        name: fullName,
        email,
        password,
        phone,
        address,
        answer,
        isAdmin,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className="container d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="col-md-6 border p-5">
          <h2 className="text-center mb-4">Register...</h2>
          <form className="d-flex flex-column" onSubmit={submit}>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter full name here"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
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
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Number" className="form-label">Number</label>
              <input
                type="Number"
                className="form-control"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Address." className="form-label">Address</label>
              <input
                type="text"
                className="form-control"
                placeholder="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Answer" className="form-label">Question</label>
              <input
                type="text"
                className="form-control"
                placeholder="Who is your favorite player in cricket?"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="isAdmin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="isAdmin">Register as Admin...?</label>
            </div>
            <button type="submit" className="btn btn-warning">Sign up</button>
            <p className="text-muted p-2">Already have an account <Link to="/login">Login </Link></p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
