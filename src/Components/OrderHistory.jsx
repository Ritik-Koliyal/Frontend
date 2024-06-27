import React, { useEffect } from 'react';
import { Table, Button, Container } from 'react-bootstrap';
import { useMyOrderContext } from '../Context/myOrderContext';
import { Link } from 'react-router-dom';
// order history functional component 
const OrderHistory = () => {
  const { state, fetchOrderHistory } = useMyOrderContext();

  useEffect(() => {
    fetchOrderHistory();
  }, []);

  const { loading, error, orders } = state;

  return (
    <Container className="order-history">
      <h2>Order History</h2>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice}</td>
                <td>{order.isPaid ? 'Yes' : 'No'}</td>
                <td>{order.isDelivered ? 'Yes' : 'No'}</td>
                <td>
                  <Link to={`/orders/${order._id}`}>
                    <Button variant="primary">Details</Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <p>All Rights Reserved</p>
    </Container>
  );
};

export default OrderHistory;
