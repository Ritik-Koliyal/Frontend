import './App.css'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import UserProfile from './Pages/UserProfile';
import VerifyRoute from './Components/Verify';
import ForgetPassword from './Pages/ForgetPassword';
import VerifyAdmin from './Components/verifyAdmin';
import AdminDashBoard from './Pages/AdminDashBoard';
import CreateProduct from './Components/CreateProduct';
import OrderHistory from './Components/OrderHistory';
import AllProduct from './Pages/AllProduct';
import ProductDetails from './Pages/ProductDetails';
import MenProduct from './Pages/MenProduct';
import WomenProduct from './Pages/WomenProduct';
import KidsProduct from './Pages/KidsProduct';
import SearchResults from './Components/SearchRes';
import Cart from './Pages/Cart';
import { useEffect } from 'react';
import Footer from './Components/Footer';
import ShippingAddress from './Pages/Shipping.Address';
import PaymentScreen from './Pages/Payment';
import PlaceOrder from './Pages/PlaceOrder';
import OrderDetails from './Pages/OrderDetails';
import UsersList from './Components/AllUsers';

function App() {



  return (

    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/dashboard' element={<VerifyRoute />}>
          <Route path="user" element={<UserProfile />} />
          <Route path="order-history" element={<OrderHistory />} />
        </Route>
        <Route path='/dashboard' element={<VerifyAdmin />}>
          <Route path="admin" element={<AdminDashBoard />} />
          <Route path="admin/addproduct" element={<CreateProduct />} />
          <Route path="admin/allusers" element={<UsersList />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/allproduct" element={<AllProduct />} />
        <Route path="/menproduct" element={<MenProduct />} />
        <Route path="/women" element={<WomenProduct />} />
        <Route path="/kids" element={<KidsProduct />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/shipping" element={<ShippingAddress />} />
        <Route path="/payment" element={<PaymentScreen />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/orders/:id" element={<OrderDetails />} />
      </Routes>
      <Footer />
    </Router>

  );




}



export default App;

