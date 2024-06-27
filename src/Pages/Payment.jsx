import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePayment } from '../Context/PaymentContext';
const PaymentScreen = () => {
  const { paymentMethod, savePaymentMethod } = usePayment();
  const navigate = useNavigate();

  const handleSavePayment = (method) => {
    savePaymentMethod(method);
    navigate('/placeorder');
  };

  return (
    <div className='container text-center'>
      <h3>Select Payment Method</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSavePayment(paymentMethod);
        }}
      >
        <div>
          <input
            type="radio"
            id="paypal"
            name="payment"
            value="paypal"
            checked={paymentMethod === 'paypal'}
            onChange={() => savePaymentMethod('paypal')}
          />
          <label className='fs-4 m-3' htmlFor="paypal">PayPal or Credit Card</label>
        </div>

        <button className='btn btn-warning mt-3' type="submit">Save Payment Method</button>
      </form>
    </div>
  );
};

export default PaymentScreen;
