import React, { createContext, useReducer, useContext, useEffect } from 'react';

const CartContext = createContext();
// reducer file 
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.find((item) => item.product === action.payload.product);
      if (existingItem) {
        return state.map((item) =>
          item.product === action.payload.product ? { ...item, qty: action.payload.qty } : item
        );
      } else {
        return [...state, action.payload];
      }
    case 'REMOVE_FROM_CART':
      return state.filter((item) => item.product !== action.payload);
    case 'UPDATE_CART_QTY':
      return state.map((item) =>
        item.product === action.payload.productId ? { ...item, qty: action.payload.quantity } : item
      );
    case 'SET_CART':
      return action.payload;
    case 'CLEAR_CART':
      return [];
    default:
      return state;
  }
};
// cart provider 
const CartProvider = ({ children }) => {
  const [cartItems, dispatch] = useReducer(cartReducer, [], (initial) => {
    const localData = localStorage.getItem('cartItems');
    return localData ? JSON.parse(localData) : initial;
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider value={{ cartItems, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

export { CartProvider, useCart };

