import React, { createContext, useReducer, useContext } from 'react';
import axios from 'axios';

// Action Types
const ORDER_PAY_REQUEST = 'ORDER_PAY_REQUEST';
const ORDER_PAY_SUCCESS = 'ORDER_PAY_SUCCESS';
const ORDER_PAY_FAIL = 'ORDER_PAY_FAIL';

// Initial State
const initialState = {
  loading: false,
  success: false,
  error: null,
};

// Reducer
const orderPayReducer = (state, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
        error: null,
      };
    case ORDER_PAY_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case ORDER_PAY_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Create Context
const OrderPayContext = createContext();

// Provider Component
export const OrderPayProvider = ({ children }) => {
  const [state, dispatch] = useReducer(orderPayReducer, initialState);

  const orderPayment = async (orderId, paymentResult, token) => {
    try {
      dispatch({ type: ORDER_PAY_REQUEST });

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${token}`,
        },
      };

      const { data } = await axios.put(`http://localhost:2100/api/${orderId}/pay`, paymentResult, config);


      dispatch({
        type: ORDER_PAY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ORDER_PAY_FAIL,
        payload: error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      });
    }
  };

  return (
    <OrderPayContext.Provider value={{ ...state, orderPayment }}>
      {children}
    </OrderPayContext.Provider>
  );
};

// Custom Hook for using the context
export const useOrderPayContext = () => useContext(OrderPayContext);
