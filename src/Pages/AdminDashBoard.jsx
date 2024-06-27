import { Link } from 'react-router-dom';
import { useAuth } from '../Context/User.context';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';
import AdminSideBar from './AdminSideBar';
import { useState, useEffect } from 'react';
const BASE_URL = 'https://backend-4-z15j.onrender.com'

// function admin dashboard 
function AdminDashBoard() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState(["Not accepted", "Processing", "Shipped", "Delivered", "Cancelled"]);

  // Fetch orders from the backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${BASE_URL}/api/allorders`, {
          headers: {
            Authorization: `JWT ${token}`
          }
        });
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error("Failed to fetch orders.");
      }
    };

    fetchOrders();
  }, []);

  // Handle status update
  const handleStatusUpdate = async (orderId, status) => {
    try {
      const token = localStorage.getItem('token'); // Or use `user.token` if available from `useAuth`
      await axios.put(`${BASE_URL}/api/orders/${orderId}/status`, { status }, {
        headers: {
          Authorization: `JWT ${token}`
        }
      });
      setOrders(orders.map(order => order._id === orderId ? { ...order, status } : order));
      toast.success("Order status updated successfully.");
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status.");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3 col-sm-4">
          <AdminSideBar />
        </div>
        <div className="col-md-9 col-sm-8">
          <h2 className="text-center">My Orders</h2>
          <div className="table-responsive">
            {orders.map(order => (
              <div key={order._id}>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>User</th>
                      <th>Order Date</th>
                      <th>Shipping Address</th>
                      <th>Total Price</th>
                      <th>Payment Status</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr key={`${order._id}-info`}>
                      <td>{order._id}</td>
                      <td>{order.user ? `${order.user.name} (${order.user.email})` : "Unknown"}</td>
                      <td>{moment(order.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
                      <td>{`${order.shippingDetails.address}, ${order.shippingDetails.city}, ${order.shippingDetails.postalCode}, ${order.shippingDetails.country}`}</td>
                      <td>{order.totalPrice}</td>
                      <td>{order.isPaid ? "Paid" : "Not Paid"}</td>
                      <td>
                        <select value={order.status} onChange={(e) => handleStatusUpdate(order._id, e.target.value)}>
                          {status.map((statusOption, idx) => (
                            <option key={statusOption} value={statusOption}>{statusOption}</option>
                          ))}
                        </select>
                      </td>

                    </tr>
                    <tr key={`${order._id}-details`}>
                      <td colSpan="8">
                        <table className="table table-sm">
                          <thead>
                            <tr>
                              <th>Item Image</th>
                              <th>Item Name</th>
                              <th>Item Quantity</th>
                            </tr>
                          </thead>
                          <tbody>
                            {order.orderItems.map((item, idx) => (
                              <tr key={idx}>
                                <td><img src={item.item_image} alt={item.item_name} width="50" /></td>
                                <td>{item.item_name}</td>
                                <td>{item.item_quantity}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashBoard;
