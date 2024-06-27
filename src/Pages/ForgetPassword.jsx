import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';
// forget password ..
function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const API_BASE_URL = 'https://backend-4-z15j.onrender.com'
    ;
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE_URL}/api/forgetPassword`, {
        answer,
        email,
        newPassword,
      });
      console.log(res, "res");

      if (res.data.success) {
        toast.success("Password reset successful!");
        navigate('/login');
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error('Something went wrong..');
    }
  };

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="col-md-6 border p-5">
          <h2 className="text-center mb-4">Forget Password</h2>
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
                New password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="answer" className="form-label">
                Answer the question: Who is your favorite cricketer...
              </label>
              <input
                type="text"
                className="form-control"
                id="answer"
                placeholder="Who is your favorite cricketer..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-warning">
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ForgetPassword;
