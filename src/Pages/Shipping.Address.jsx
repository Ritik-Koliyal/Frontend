import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShipping } from '../Context/ShippingContext';
import BreadCrum from '../Components/BreadCrum';

function ShippingAddress() {
  const { saveShippingAddress } = useShipping();
  const [address, setAddress] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveShippingAddress(address);
    navigate('/payment');
  };

  return (
    <>
      <BreadCrum step1 step2 />
      <div className="container d-flex justify-content-center">
        <div className="col-md-6">
          <div className="row">
            <h1>Shipping Address</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="fullName" className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="fullName"
                  name="fullName"
                  value={address.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="address" className="form-label">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  name="address"
                  value={address.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="city" className="form-label">City</label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  name="city"
                  value={address.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="postalCode" className="form-label">Postal Code</label>
                <input
                  type="number"
                  className="form-control"
                  id="postalCode"
                  name="postalCode"
                  value={address.postalCode}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="country" className="form-label">Country</label>
                <input
                  type="text"
                  className="form-control"
                  id="country"
                  name="country"
                  value={address.country}
                  onChange={handleChange}
                  required
                />
              </div>
              <button className="btn btn-primary" type="submit">Save Address</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShippingAddress;
