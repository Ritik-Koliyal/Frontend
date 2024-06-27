import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from './Context/User.context.jsx';
import { ProductProvider } from './Context/product.context.jsx';
import { CartProvider } from './Context/CartContext.jsx';
import { ShippingProvider } from './Context/ShippingContext.jsx';
import { PaymentProvider } from './Context/PaymentContext.jsx';
import { OrderProvider } from './Context/OrderContext.jsx';
import { OrderPayProvider } from './Context/OrderPayCOntext.jsx';
import { MyOrderProvider } from './Context/myOrderContext.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <UserProvider>
      <CartProvider>
        <ProductProvider>
          <ShippingProvider>
            <PaymentProvider>
              < OrderProvider>
                <OrderPayProvider>
                  <MyOrderProvider>
                    <App />
                    <ToastContainer />
                  </MyOrderProvider>
                </OrderPayProvider>
              </OrderProvider>
            </PaymentProvider>
          </ShippingProvider>
        </ProductProvider>
      </CartProvider>
    </UserProvider>
  </React.StrictMode>


);

