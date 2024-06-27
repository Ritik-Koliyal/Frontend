import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
import { useAuth } from '../Context/User.context';
import { toast } from 'react-toastify';
// cart page ... 
const Cart = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cartItems, dispatch } = useCart();

  const updateCartQty = (productId, quantity) => {
    dispatch({ type: 'UPDATE_CART_QTY', payload: { productId, quantity } });
  };

  const removeItem = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
    toast.success('Item remove from Cart ')
  };


  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);


  const totalPrice = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);


  React.useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);


  const handleProceedToCheckout = () => {
    if (user.user) {
      navigate('/shipping');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="row m-3">
      <div className="col-md-8">
        {cartItems.length === 0 ? (
          <p>Please add items to the cart. <Link to='/'>Go Back</Link></p>
        ) : (
          <ul>
            {cartItems.map(item => (
              <div key={item.product} className="row mb-3 border">
                <div className="col-md-2 col-sm-2 border p-4">
                  <img className="img-fluid" src={item.image} alt={item.name} />
                </div>
                <div className="col-md-3">
                  <h3><Link className="text-decoration-none fs-5" to={`/product/${item.product}`}>{item.name}</Link></h3>
                  <h5>{item.detail}</h5>
                </div>
                <div className="col-md-2">
                  $ {item.price}
                </div>
                <div className="col-md-2">
                  <div className="row border">
                    <div className="col border">
                      <label htmlFor="quantity" className="form-label">Quantity</label>
                    </div>
                    <div className="col border">
                      <select
                        id="quantity"
                        className="form-select"
                        value={item.qty}
                        onChange={(e) => updateCartQty(item.product, Number(e.target.value))}
                      >
                        {[...Array(item.avlStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-md-2">
                  <button onClick={() => removeItem(item.product)} className="btn btn-danger">Remove</button>
                </div>
              </div>
            ))}
          </ul>
        )}
      </div>
      <div className="col-md-4">
        <div className="card">
          <h2 className="text-center">Cart Summary</h2>
          <div className="row d-flex">
            <div className="col-md-6">
              <h3>Total items</h3>
            </div>
            <div className="col-md-6">
              {totalItems}
            </div>
          </div>
          <div className="row">
            <h4>Total amount:</h4>
            <h5>$ {totalPrice.toFixed(2)}</h5>
          </div>
        </div>
        <button onClick={handleProceedToCheckout} className="btn btn-warning mt-3">Proceed To Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
