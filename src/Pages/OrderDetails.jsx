import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './OrderDetail.css';
import { useAuth } from '../Context/User.context';
import { useOrderPayContext } from '../Context/OrderPayCOntext';
import Loader from '../Components/Loader/Loader';
import Message from '../Components/Loader/Message';
import { toast } from 'react-toastify';

const OrderDetails = () => {
  const [orderData, setOrderData] = useState(null);
  const { id } = useParams();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { loading: loadingPay, success: successPay, orderPayment } = useOrderPayContext();
  const [sdkReady, setSdkReady] = useState(false);

  useEffect(() => {

    const addPayPalScript = async () => {

      try {
        const { data: clientId } = await axios.get('/api/config/paypal');
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
        script.async = true;
        script.onload = () => {
          setSdkReady(true);
        };
        document.body.appendChild(script);
      } catch (error) {
        console.error('Error loading PayPal script:', error);
      }
    };

    const fetchOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:2100/api/orders/${id}`, {
          headers: {
            Authorization: `JWT ${user.token}`,
          },
        });

        setOrderData(response.data.order);
        setLoading(false);

        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.log('something went wrong');
        } else {
          console.error('Error fetching order:', error);
          setError('Failed to fetch order details');
        }
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, user.token, successPay]);

  const successPayment = (paymentResult) => {

    orderPayment(id, paymentResult, user.token);
    setOrderData((prevState) => ({
      ...prevState,
      isPaid: true,
      paymentDate: new Date().toISOString()
    }));
    toast.success('Payment successful!');
  };

  useEffect(() => {
    if (sdkReady) {
      window.paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: orderData.totalPrice
              }
            }]
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then(successPayment);
        }
      }).render('#paypal-button-container');
    }
  }, [sdkReady, orderData]);

  if (loading) {
    return <div className="container"><Loader /></div>;
  }

  if (error) {
    return <Message variant="danger" className="container">Error: {error}</Message>;
  }

  if (!orderData) {
    return <div className="container">Order not found</div>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <div className="order-details">
            <div className="order-header">
              <h2>Order ID: {orderData._id}</h2>
            </div>

            <div className="card p-3">
              <div className="order-section">
                <h4>Shipping</h4>
                <p><strong>Name:</strong> {orderData.shippingDetails.address}</p>
                <p><strong>Address:</strong> {orderData.shippingDetails.city}, {orderData.shippingDetails.postalCode}, {orderData.shippingDetails.country}</p>
                <div><strong>Status:</strong> {orderData.isDelivered ? <Message variant="success">Delivered</Message> : <Message variant="danger">Not Delivered</Message>}</div>
              </div>
            </div>

            <div className="card mt-3 p-3">
              <div className="order-section">
                <h4>Payment</h4>
                <p><strong>Method:</strong> {orderData.paymentMethod}</p>
                <div><strong>Status:</strong> {orderData.isPaid ? <Message variant="success">Paid</Message> : <Message variant="danger">Not Paid</Message>}</div>
                {orderData.isPaid && <p><strong>Payment Date:</strong> {orderData.createdAt}</p>}
              </div>
            </div>

            <div className="card mt-3 p-3">
              <div className="order-section">
                <h4>Items</h4>
                {orderData.orderItems.map((item, index) => (
                  <div key={index} className="d-flex flex-row align-items-center mb-2">
                    <img src={item.item_image} alt={item.name} className="img-fluid mr-2" style={{ width: '50px' }} />
                    <p>{item.item_name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="order-summary card m-4 p-4">
            <h4>Order Summary</h4>
            <table className="table">
              <tbody>
                <tr>
                  <th>Items</th>
                  <td>${orderData.itemsPrice}</td>
                </tr>
                <tr>
                  <th>Shipping</th>
                  <td>${orderData.shippingPrice}</td>
                </tr>
                <tr>
                  <th>Tax</th>
                  <td>${orderData.taxPrice}</td>
                </tr>
                <tr>
                  <th className="total">Order Total</th>
                  <td className="total">${orderData.totalPrice}</td>
                </tr>
              </tbody>
            </table>

            {!orderData.isPaid && (
              <div id="paypal-button-container"></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
