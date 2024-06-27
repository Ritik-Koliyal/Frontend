import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../Context/User.context";

function ChangePassword() {
  const { user } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentPassword || !newPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:2100/api/changepassword",
        { currentPassword, newPassword },
        {
          headers: {
            Authorization: `JWT ${token}`,
          },
        }
      );
      toast.success("Password changed successfully");
      setCurrentPassword("");
      setNewPassword("");
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error("Failed to change password");
    }
  };

  return (

    <div className="change-password-container ">
      <div className="col md-4 container">
        <div className="col">Name : {user?.user?.name}</div>
        <div className="col">Email : {user?.user?.email}</div>
        <div className="col">Phone : {user?.user?.phone}</div>
      </div>
      <div className="container col-md-6 ">



        <h2>Change Password</h2>
        <form className="m3 p-4" onSubmit={handleSubmit}>
          <div className="form-group mb-2 ">
            <label>Current Password</label>
            <input
              type="password"
              className="form-control mt-3"
              placeholder="Enter old password here"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              className="form-control mt-3 "
              placeholder="Enter New password here"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-warning mt-3">
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
