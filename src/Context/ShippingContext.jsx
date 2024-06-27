import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { useAuth } from './User.context';
// shipping order context .. 
const ShippingContext = createContext();

export const useShipping = () => useContext(ShippingContext);

const shippingReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SHIPPING_ADDRESS':
      return {
        ...state,
        address: action.payload,
      };
    case 'CLEAR_SHIPPING_ADDRESS':
      return {
        ...state,
        address: {},
      };
    default:
      return state;
  }
};

export const ShippingProvider = ({ children }) => {
  const { user } = useAuth();
  const [shippingState, dispatch] = useReducer(shippingReducer, { address: {} });

  useEffect(() => {
    const savedAddress = JSON.parse(localStorage.getItem(`shippingAddress_${user?.user?._id}`)) || {};
    dispatch({ type: 'SET_SHIPPING_ADDRESS', payload: savedAddress });
  }, [user]);

  const saveShippingAddress = (address) => {
    dispatch({
      type: 'SET_SHIPPING_ADDRESS',
      payload: address,
    });
    localStorage.setItem(`shippingAddress_${user?.user?._id}`, JSON.stringify(address));
  };

  const clearShippingAddress = () => {
    dispatch({ type: 'CLEAR_SHIPPING_ADDRESS' });
    localStorage.removeItem(`shippingAddress_${user?.user?._id}`);
  };

  return (
    <ShippingContext.Provider value={{ shippingAddress: shippingState.address, saveShippingAddress, clearShippingAddress }}>
      {children}
    </ShippingContext.Provider>
  );
};



