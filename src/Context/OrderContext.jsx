import React, { createContext, useReducer, useContext } from 'react';
import axios from 'axios';

// Initial state for order context
const initialState = {
  loading: false,
  error: null,
  success: false,
  order: null,
};

// Action types for order context
const ORDER_CREATE_REQUEST = 'ORDER_CREATE_REQUEST';
const ORDER_CREATE_SUCCESS = 'ORDER_CREATE_SUCCESS';
const ORDER_CREATE_FAIL = 'ORDER_CREATE_FAIL';

// Reducer function for managing state based on actions
const orderReducer = (state, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { ...state, loading: true, error: null, success: false };
    case ORDER_CREATE_SUCCESS:
      return { ...state, loading: false, success: true, order: action.payload, error: null };
    case ORDER_CREATE_FAIL:
      return { ...state, loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};

// Creating context for order operations
const OrderContext = createContext();

// Custom hook to consume order context
export const useOrderContext = () => {
  return useContext(OrderContext);
};


const addOrderItem = async (order) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await axios.post('http://localhost:2100/api/orders', order, config);
    console.log('Response data:', response.data);
    return response.data; // Return data received from API
  } catch (error) {
    console.error('Error in addOrderItem:', error);
    throw error; // Throw error for further handling
  }
};



// OrderProvider component to wrap application with order context
export const OrderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(orderReducer, initialState);

  // Function to create order by dispatching actions
  const createOrder = async (order) => {
    dispatch({ type: ORDER_CREATE_REQUEST }); // Dispatch action to indicate order creation request

    try {
      const data = await addOrderItem(order); // Call function to add order item
      dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
      return data;
    } catch (error) {
      dispatch({ type: ORDER_CREATE_FAIL, payload: error.message });
      throw error; // Throw error for further handling
    }
  };

  // Values to be provided by OrderContext.Provider
  const contextValues = {
    state,
    createOrder,
  };

  return (
    <OrderContext.Provider value={contextValues}>
      {children}
    </OrderContext.Provider>
  );
};
