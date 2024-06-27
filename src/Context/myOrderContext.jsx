import React, { createContext, useReducer, useContext } from 'react';
import axios from 'axios';

// Action Types
const ORDER_HISTORY_REQUEST = 'ORDER_HISTORY_REQUEST';
const ORDER_HISTORY_SUCCESS = 'ORDER_HISTORY_SUCCESS';
const ORDER_HISTORY_FAIL = 'ORDER_HISTORY_FAIL';
const ORDER_HISTORY_RESET = 'ORDER_HISTORY_RESET';

// Initial State
const initialState = {
  orders: [],
  loading: false,
  error: null,
};

// Reducer
const orderReducer = (state, action) => {
  switch (action.type) {
    case ORDER_HISTORY_REQUEST:
      return { ...state, loading: true };
    case ORDER_HISTORY_SUCCESS:
      return { loading: false, orders: action.payload, error: null };
    case ORDER_HISTORY_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_HISTORY_RESET:
      return { ...initialState };
    default:
      return state;
  }
};

// Create Context
const MyOrderContext = createContext();

// Provider Component
export const MyOrderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(orderReducer, initialState);


  const fetchOrderHistory = async () => {
    try {
      dispatch({ type: ORDER_HISTORY_REQUEST });


      const userToken = localStorage.getItem('token');

      const config = {
        headers: {
          Authorization: `JWT ${userToken}`,
        },
      };

      const { data } = await axios.get('http://localhost:2100/api/myorders', config);
      dispatch({ type: ORDER_HISTORY_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: ORDER_HISTORY_FAIL, payload: error.response?.data?.message || error.message });
    }
  };

  const resetOrderHistory = () => {
    dispatch({ type: ORDER_HISTORY_RESET });
  };

  return (
    <MyOrderContext.Provider value={{ state, fetchOrderHistory, resetOrderHistory }}>
      {children}
    </MyOrderContext.Provider>
  );
};

// Custom Hook to use  Context
export const useMyOrderContext = () => {
  const context = useContext(MyOrderContext);
  if (context === undefined) {
    throw new Error('something went wrong.. ');
  }
  return context;
};
