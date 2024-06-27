

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Rating from "../Components/Rating";
import HomeBanner from "../Components/HomeBanner";
import Loader from "../Components/Loader/Loader";
const AllProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_BASE_URL = "http://localhost:2100";

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${API_BASE_URL}/api/randomproducts`);
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div><Loader /></div>;
  }

  return (
    <>
      <HomeBanner />
      <h2 className="text-center m-4">Feature Products..</h2>
      <div className="d-flex flex-wrap justify-content-center">

        {Array.isArray(products) && products.length > 0 ? (
          products.map((item) => (
            <div className="cards-wrapper m-4" key={item._id}>
              <Link to={`/product/${item._id}`}>
                <div className="card me-4">
                  <div className="image-wrapper">
                    <img src={item.image} alt={item.productName}
                      style={{ maxHeight: "200px", objectFit: "contain" }}
                    />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{item.Brand}</h5>
                    <p className="card-text">{item.productName}</p>
                    <Rating value={item.stars} text={`${item.count} reviews`} />
                    <div className="card-title mb-2">
                      <strong>${item.price}</strong>
                    </div>

                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div>No products available</div>
        )}
      </div>

    </>
  )
}

export default AllProduct;
