import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Rating from "../Components/Rating";
import Loader from "../Components/Loader/Loader";
import Message from "../Components/Loader/Message"
import '../App.css';

const MenProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const API_BASE_URL = 'https://backend-4-z15j.onrender.com'
    ;

  useEffect(() => {
    const fetchMenProducts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/men-products`, {
          params: { category: "Men" },
        });
        setProducts(response.data.products);
        setLoading(false);
      } catch (error) {
        setError("Error fetching men products");
        setLoading(false);
      }
    };

    fetchMenProducts();
  }, []);

  if (loading) {
    return <div><Loader /></div>;
  }

  if (error) {
    return <Message variant="danger">{error}</Message>;
  }

  if (!Array.isArray(products) || products.length === 0) {
    return <div>No products found</div>;
  }

  return (
    <div className="">
      <h1 className="text-center my-4">Men Products</h1>
      <div className="d-flex flex-wrap justify-content-center">
        {products.map((product) => (
          <div key={product._id} className="cards-wrapper m-4">
            <div className="card h-100">
              <Link to={`/product/${product._id}`} className="text-decoration-none">
                <div className="image-wrapper">
                  {product.image && (
                    <img
                      src={product.image}
                      alt={product.productName}
                      className="card-img-top"
                      style={{ maxHeight: "200px", objectFit: "contain" }}
                    />
                  )}
                </div>
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

export default MenProduct;
