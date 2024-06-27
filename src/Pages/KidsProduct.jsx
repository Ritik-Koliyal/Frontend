import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Ensure axios is imported
import Rating from "../Components/Rating";
import Loader from "../Components/Loader/Loader";
import Message from "../Components/Loader/Message"
const KidsProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const API_BASE_URL = "http://localhost:2100";

  useEffect(() => {
    const fetchKidsProducts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/kids-products`, {
          params: { category: "Kids" },
        });
        console.log("API Response:", response.data);
        setProducts(response.data.products);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching kids products:", error);
        setError("Error fetching kids products");
        setLoading(false);
      }
    };

    fetchKidsProducts();
  }, []);

  if (loading) {
    return <div><Loader /></div>;
  }

  if (error) {
    return <Message variant="danger">{error}</Message>;
  }

  if (!Array.isArray(products) || products.length === 0) {
    return <Message variant="success">No products found</Message>;
  }

  return (
    <div className="">
      <h1 className="text-center my-4">Kids Products</h1>
      <div className="d-flex flex-wrap justify-content-center">
        {products.map((product) => (
          <div key={product._id} className="cards-wrapper m-4">
            <div className="card h-100">
              <Link to={`/product/${product._id}`} className="text-decoration-none">
                {product.image && (
                  <div className="image-wrapper">
                    <img
                      src={product.image}
                      alt={product.productName}
                      className="card-img-top"
                      style={{ maxHeight: "200px", objectFit: "contain" }}
                    />
                  </div>
                )}
                <div className="card-body">
                  <h5 className="card-title">{product.productName}</h5>
                  <p className="card-text">{product.Brand}</p>
                  <p className="card-text">{product.productDetails}</p>
                  <Rating value={product.stars} text={`${product.count} reviews`} />
                  <p className="card-text"><strong>${product.price}</strong></p>

                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KidsProduct;
