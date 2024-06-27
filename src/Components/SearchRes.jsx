import React from 'react';
import { useProduct } from '../Context/product.context';
import { Link } from 'react-router-dom';

import Rating from '../Components/Rating';
// search result page .
function SearchResults() {
  const { filteredProducts } = useProduct();

  if (!filteredProducts || filteredProducts.length === 0) {
    return <div>No products found</div>;
  }
  return (
    <div className="container">
      <h1 className="text-center my-4">Search Results</h1>
      <div className="d-flex flex-wrap justify-content-center">
        {filteredProducts.map((product) => (
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
}

export default SearchResults;
