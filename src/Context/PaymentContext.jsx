import React, { createContext, useState, useContext, useEffect } from 'react';

const PaymentContext = createContext();

export const usePayment = () => useContext(PaymentContext);

export const PaymentProvider = ({ children }) => {
  const initialPaymentMethod = localStorage.getItem('paymentMethod') || '';

  const [paymentMethod, setPaymentMethod] = useState(initialPaymentMethod);

  useEffect(() => {

    localStorage.setItem('paymentMethod', paymentMethod);
  }, [paymentMethod]);

  const savePaymentMethod = (method) => {
    setPaymentMethod(method);
  };

  const clearPaymentMethod = () => {
    setPaymentMethod('');
    localStorage.removeItem('paymentMethod');
  };

  return (
    <PaymentContext.Provider value={{ paymentMethod, savePaymentMethod, clearPaymentMethod }}>
      {children}
    </PaymentContext.Provider>
  );
};
