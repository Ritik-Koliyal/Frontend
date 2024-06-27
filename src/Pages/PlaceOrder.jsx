import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
import { useShipping } from '../Context/ShippingContext';
import { usePayment } from '../Context/PaymentContext';
import { Link } from 'react-router-dom';
import BreadCrum from '../Components/BreadCrum';
import { useOrderContext } from '../Context/OrderContext';
import { useProduct } from '../Context/product.context';

const PlaceOrder = () => {
  const { cartItems } = useCart();
  const { shippingAddress } = useShipping();
  const { paymentMethod } = usePayment();
  const { createOrder } = useOrderContext();
  const { products } = useProduct();
  const navigate = useNavigate();



  // Calculate prices
  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 10 : 20;
  const taxPrice = 0.15 * itemsPrice;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const handlePlaceOrder = async () => {
    const orderItems = cartItems.map(item => {
      const product = products.find(prod => prod._id === item.product);

      if (!product) {

        return null; // Handle the case where product is not found
      }

      return {
        item_name: product.productName,
        item_detail: product.description,
        item_image: item.image,
        item_quantity: item.qty,
        product: item.product,
      };
    }).filter(orderItem => orderItem !== null); // Filter out null values

    if (orderItems.length === 0) {
      console.error('No valid order items found.');
      return; // Exit if no valid order items
    }

    const order = {
      orderItems: orderItems,
      shippingDetails: {
        address: shippingAddress.address,
        city: shippingAddress.city,
        postalCode: shippingAddress.postalCode,
        country: shippingAddress.country,
      },
      paymentMethod: paymentMethod,
      itemsPrice: itemsPrice,
      shippingPrice: shippingPrice,
      taxPrice: taxPrice,
      totalPrice: totalPrice,
    };

    try {
      const createdOrder = await createOrder(order);
      navigate(`/orders/${createdOrder._id}`);
    } catch (error) {
      toast.error('Please login first.. ');
      console.error('Error placing order:', error);
    }
  };

  return (
    <div className="container mt-5">
      <BreadCrum step1 step2 step3 step4 />
      <div className="row">
        <div className="col-md-8">
          <h1>Preview Order</h1>
          <div className="card mb-4">
            <div className="card-body">
              <h3>Shipping</h3>
              <p>
                <strong>Name:</strong> {shippingAddress.fullName}<br />
                <strong>Address:</strong> {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.postalCode}, {shippingAddress.country}
              </p>
              <Link to="/shipping-address">Edit</Link>
            </div>
          </div>
          <div className="card mb-4">
            <div className="card-body">
              <h3>Payment</h3>
              <p>
                <strong>Method:</strong> {paymentMethod}
              </p>
              <Link to="/payment">Edit</Link>
            </div>
          </div>
          <div className="card mb-4">
            <div className="card-body">
              <h3>Order Items</h3>
              {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
              ) : (
                <ul className="list-group">
                  {cartItems.map((item) => (
                    <li key={item.product} className="list-group-item d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <img src={item.image} alt={item.name} className="img-fluid" style={{ width: '50px', marginRight: '10px' }} />
                        <Link to={`/products/${item.product}`}>{item.name}</Link>
                      </div>
                      <div>
                        {item.qty} x ${item.price} = ${item.qty * item.price}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h3>Order Summary</h3>
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <div>Items</div>
                  <div>${itemsPrice.toFixed(2)}</div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <div>Shipping</div>
                  <div>${shippingPrice.toFixed(2)}</div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <div>Tax</div>
                  <div>${taxPrice.toFixed(2)}</div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <div>Total</div>
                  <div>${totalPrice.toFixed(2)}</div>
                </li>
                <li className="list-group-item">
                  <button className="btn btn-primary btn-block" onClick={handlePlaceOrder}>
                    Place Order
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
