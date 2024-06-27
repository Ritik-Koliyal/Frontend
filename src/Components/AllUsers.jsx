import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import AdminSideBar from '../Pages/AdminSideBar';
import moment from 'moment';
const BASE_URL = 'https://backend-4-z15j.onrender.com'
// allusers component 
const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${BASE_URL}/allusers`, {
          headers: {
            Authorization: `JWT ${token}`
          }
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to fetch users.");
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3 col-sm-4">
          <AdminSideBar />
        </div>
        <div className="col-md-9 col-sm-8">
          <h2 className="text-center">Users List</h2>
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Phone</th>
                  <th>Admin</th>
                  <th>Created At</th>
                  <th>Updated At</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.address}</td>
                    <td>{user.phone}</td>
                    <td>{user.isAdmin ? "Yes" : "No"}</td>
                    <td>{moment(user.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
                    <td>{moment(user.updatedAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersList;
