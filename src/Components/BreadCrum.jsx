
import React from "react";
import { Link } from 'react-router-dom';
import './breadcrum.css';

function BreadCrum({ step1, step2, step3, step4 }) {
  return (
    <>
      <nav className="breadcrumb-container mb-4">
        <ul className="breadcrumb justify-content-center">
          <li className={`breadcrumb-item ${step1 ? 'active' : 'disabled'}`}>
            {step1 ? (
              <Link to='/login'>Sign In</Link>
            ) : (
              <span>Sign In</span>
            )}
          </li>

          <li className={`breadcrumb-item ${step2 ? 'active' : 'disabled'}`}>
            {step2 ? (
              <Link to='/shipping-address'>Shipping</Link>
            ) : (
              <span>Shipping</span>
            )}
          </li>

          <li className={`breadcrumb-item ${step3 ? 'active' : 'disabled'}`}>
            {step3 ? (
              <Link to='/payment'>Payment</Link>
            ) : (
              <span>Payment</span>
            )}
          </li>

          <li className={`breadcrumb-item ${step4 ? 'active' : 'disabled'}`}>
            {step4 ? (
              <Link to='/placeorder'>Place Order</Link>
            ) : (
              <span>Place Order</span>
            )}
          </li>
        </ul>
      </nav>

    </>
  );
}

export default BreadCrum;
