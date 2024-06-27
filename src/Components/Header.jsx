import React, { useState, useEffect } from 'react';
import { useAuth } from '../Context/User.context';
import { useProduct } from '../Context/product.context';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCart } from '../Context/CartContext';
// header component 
function Header() {
  const { user, setUser } = useAuth();
  const { dispatch, cartItems } = useCart();
  const { setSearchQuery } = useProduct();
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {

    if (cartItems) {
      const itemCount = cartItems.length;

    }
  }, [cartItems]);

  const handleLogout = async () => {
    setLoading(true);

    try {
      setUser({ user: null, token: "" });

      console.log("Before removing items: ", localStorage.getItem("token"), localStorage.getItem("user"), localStorage.getItem("cartItems"), localStorage.getItem("shippingAddress"));

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("cartItems"); // Ensure correct key
      localStorage.removeItem("shippingAddress"); // Ensure correct key

      console.log("After removing items: ", localStorage.getItem("token"), localStorage.getItem("user"), localStorage.getItem("cartItems"), localStorage.getItem("shippingAddress"));

      toast.success("Logout successfully...");
      dispatch({ type: "CLEAR_CART" });

      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  }


  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    navigate('/search');
  };

  return (
    <>
      <nav className="navbar bg-dark p-3">
        <div className="container-fluid d-flex justify-content-between">
          <Link to="/" className="navbar-brand mx-2 text-white">E-commerce</Link>
          <form className="d-flex align-items-center" role="search" onSubmit={handleSearch}>
            <input
              className="form-control search-box"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button className="btn btn-success search-btn" type="submit">Search</button>
          </form>
          <div className='me-5 cart-btn d-flex align-items-center'>
            {!user.user ? (
              <Link to="/login">
                <button className="btn btn-success me-4">Login</button>
              </Link>
            ) : (
              <>
                <li className="nav-item dropdown text-light" style={{ listStyle: 'none' }}>
                  <a className="nav-link dropdown-toggle text-color-black me-5" role="button" data-bs-toggle="dropdown">
                    {user?.user?.name}
                  </a>
                  <ul className="dropdown-menu">
                    <li><Link to="/dashboard/user" className="dropdown-item">User Profile</Link></li>
                    <li><Link to="/dashboard/order-history" className="dropdown-item">Order History</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><Link to="/login" className="dropdown-item" onClick={handleLogout}>Logout</Link></li>
                  </ul>
                </li>
                {user?.user?.isAdmin && (
                  <li className="nav-item dropdown text-light me-5" style={{ listStyle: 'none' }}>
                    <Link to="/dashboard/admin" className="dropdown-item">Dashboard</Link>
                  </li>
                )}
              </>
            )}
            <li className="nav-item dropdown d-flex align-items-center text-light me-5" style={{ listStyle: 'none' }}>
              <Link to="cart" className="dropdown-item">Cart</Link>
              <p className='m-2'>{cartItems.length}</p>
            </li>
          </div>
        </div>
      </nav>

      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 items d-flex justify-content-center align-items-center w-100">
              <li className="nav-item">
                <Link to="/" className="nav-link active">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/allproduct" className="nav-link">All Products</Link>
              </li>
              <li className="nav-item">
                <Link to="/women" className="nav-link">Women</Link>
              </li>
              <li className="nav-item">
                <Link to="/menproduct" className="nav-link">Men</Link>
              </li>
              <li className="nav-item">
                <Link to="/kids" className="nav-link">Kids</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
