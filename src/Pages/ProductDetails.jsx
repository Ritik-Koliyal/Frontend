import React, { useState, useEffect } from "react";
import { Row, Col, Image, ListGroup, ListGroupItem, Button, Form, Alert } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Rating from "../Components/Rating";
import { useAuth } from "../Context/User.context";
import { useCart } from "../Context/CartContext";
import Toast from "react-bootstrap/Toast";
import { toast } from 'react-toastify';
import Loader from "../Components/Loader/Loader";


const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const { id } = useParams();
  const API_BASE_URL = 'https://backend-4-z15j.onrender.com'
    ;
  const { user } = useAuth();
  const { cartItems, dispatch } = useCart();
  const navigate = useNavigate()

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${API_BASE_URL}/api/product/${id}`);
        setProduct(data.product);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCart = () => {
    if (product.avlStock > 0) {
      dispatch({
        type: "ADD_TO_CART",
        payload: {
          product: product._id,
          qty: 1, // Default quantity
          name: product.productName,
          price: product.price,
          image: product.image,
          detail: product.productDetails,
          avlStock: product.avlStock,
        },
      });
      toast.success("Item added to cart")
      navigate('/cart');
    } else {
      setShowAlert(true); // Show out of stock alert
    }
  };

  const submitReviewHandler = async (e) => {
    e.preventDefault();
    try {
      const hasReviewed = product.reviews.find((rev) => rev.user === user.user._id);
      if (hasReviewed) {
        setShowToast(true);
        toast.error('review already submitted... ')
        return;
      }
      await axios.post(
        `${API_BASE_URL}/api/product/${id}/review`,
        { rating, comment }
      );
      toast.success('Review submitted successfully');
      setRating(0);
      setComment('');
      // Re-fetch the product to update the reviews
      const { data } = await axios.get(`${API_BASE_URL}/api/product/${id}`);
      setProduct(data.product);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  if (loading) {
    return <div><Loader /></div>;
  }

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <Row>
      <Col md={4} className="d-flex justify-content-center align-items-center p-4">
        <Image src={product.image} alt={product.productName} fluid className="Item-image" />
      </Col>
      <Col md={3} className="mt-4">
        <ListGroup>
          <ListGroupItem>
            <h2>{product.productName}</h2>
          </ListGroupItem>
          <ListGroupItem>
            <Rating value={product.stars} text={`${product.count} reviews`} />
          </ListGroupItem>
          <ListGroupItem>
            <h4>${product.price}</h4>
          </ListGroupItem>
          <ListGroupItem>
            {product.Brand}
          </ListGroupItem>
          <ListGroupItem>
            Description: {product.productDetails}
          </ListGroupItem>
        </ListGroup>
      </Col>

      <Col md={3}>
        <div className="card mt-4">
          <ListGroup variant="flush">
            <ListGroupItem>
              <Row>
                <Col>Status</Col>
                <Col>{product.avlStock > 0 ? "In stock" : "Out of stock"}</Col>
              </Row>
            </ListGroupItem>
            <ListGroupItem>
              <Row>
                <Col> Price:</Col>
                <Col> ${product.price}</Col>
              </Row>
            </ListGroupItem>
          </ListGroup>
          <Button className="btn-block-warning mt-3" type="button" onClick={addToCart}>
            Add to Cart
          </Button>
        </div>
      </Col>

      <div className="container d-flex justify-content-center ms-5 col-md-12">
        <Col md={5} className="mt-4">
          <h2>Write a customer review</h2>
          {showAlert && <Alert variant="danger">You have already submitted a review.</Alert>}
          <Form onSubmit={submitReviewHandler}>
            <Form.Group controlId="rating">
              <Form.Label>Rating</Form.Label>
              <Form.Control
                as="select"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              >
                <option value="">Select...</option>
                <option value="1">1 - Poor</option>
                <option value="2">2 - Fair</option>
                <option value="3">3 - Good</option>
                <option value="4">4 - Very Good</option>
                <option value="5">5 - Excellent</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="comment" className="mt-3">
              <Form.Label>Comments</Form.Label>
              <Form.Control
                as="textarea"
                row="3"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button type="submit" className="mt-3">
              Submit
            </Button>
          </Form>
        </Col>
        <Col md={5} className="mt-4">
          <h2>Reviews</h2>
          {product.reviews.length === 0 ? (
            <Alert variant="info">There is no review</Alert>
          ) : (
            <ListGroup variant="flush">
              {product.reviews.map((review) => (
                <ListGroupItem key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating value={review.rating} />
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </ListGroupItem>
              ))}
            </ListGroup>
          )}
        </Col>
      </div>

      <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
        <Toast.Body>You have already submitted a review.</Toast.Body>
      </Toast>
    </Row>
  );
};

export default ProductDetails;
