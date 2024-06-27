import React, { useState, useEffect } from 'react';
import { useProduct } from '../Context/product.context';
import AdminSideBar from '../Pages/AdminSideBar';
// function comp create product 
function CreateProduct() {
  const { products, fetchProducts, addProduct, updateProduct, deleteProduct } = useProduct();
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [avlStock, setAvlStock] = useState('');
  const [productDetails, setProductDetails] = useState('');
  const [Brand, setBrand] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  // calling fetchprduct
  useEffect(() => {
    fetchProducts();
  }, []);
  // handle submit order 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = new FormData();
    productData.append('productName', productName);
    productData.append('price', price);
    productData.append('category', category);
    productData.append('avlStock', avlStock);
    productData.append('productDetails', productDetails);
    productData.append('Brand', Brand);
    if (image) {
      productData.append('image', image);
    }

    try {
      if (editingProduct) {
        await updateProduct(editingProduct._id, productData);
      } else {
        await addProduct(productData);
      }
      resetForm();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const resetForm = () => {
    setProductName('');
    setPrice('');
    setCategory('');
    setAvlStock('');
    setProductDetails('');
    setBrand('');
    setImage(null);
    setImagePreview(null);
    setEditingProduct(null);
  };
  // hdandle edit 
  const handleEdit = (product) => {
    setProductName(product.productName);
    setPrice(product.price);
    setCategory(product.category);
    setAvlStock(product.avlStock);
    setProductDetails(product.productDetails);
    setBrand(product.Brand);
    setEditingProduct(product);
  };
  // handle delete
  const handleDelete = async (id) => {
    await deleteProduct(id);
  };
  // handle image change 
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);


    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    if (selectedImage) {
      reader.readAsDataURL(selectedImage);
    }
  };

  return (
    <div className="container d-flex">
      <div className="col-md-2 col-sm-4">
        <AdminSideBar />
      </div>

      <div className="col-md-12 border mt-4 d-flex justify-content-around">
        <form className='col-md-5 p-3' onSubmit={handleSubmit}>
          <h1>{editingProduct ? 'Update Product' : 'Add new product from here....'}</h1>
          <div className="mb-3">
            <label htmlFor="productName" className="form-label">Product Name</label>
            <input
              type="text"
              className="form-control"
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="price" className="form-label">Price</label>
            <input
              type="number"
              className="form-control"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="category" className="form-label">Category</label>
            <select
              className="form-select"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="avlStock" className="form-label">Available Stock</label>
            <input
              type="number"
              className="form-control"
              id="avlStock"
              value={avlStock}
              onChange={(e) => setAvlStock(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="productDetails" className="form-label">Product Details</label>
            <textarea
              className="form-control"
              id="productDetails"
              value={productDetails}
              onChange={(e) => setProductDetails(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="Brand" className="form-label">Brand</label>
            <input
              type="text"
              className="form-control"
              id="Brand"
              value={Brand}
              onChange={(e) => setBrand(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="image" className="form-label">Product Image</label>
            <input
              type="file"
              className="form-control"
              id="image"
              onChange={handleImageChange}
            />
            <label>Image size should be less then 1 mb .</label>
          </div>


          {imagePreview && (
            <div className="mb-3">
              <img src={imagePreview} alt="Preview" className="img-fluid" style={{ maxWidth: '100px', maxHeight: '100px' }} />
            </div>
          )}

          <button type="submit" className="btn btn-primary">
            {editingProduct ? 'Update Product' : 'Add Product'}
          </button>
        </form>

        <div className="col-md-5 mt-4 me-5">
          <h1>Product List</h1>
          <table className="table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products && products.length > 0 ? (
                products.map((product) => (
                  <tr key={product._id}>
                    <td>{product.productName}</td>
                    <td>{product.price}</td>
                    <td>{product.category}</td>
                    <td>
                      <button className="btn btn-warning" onClick={() => handleEdit(product)}>Edit</button>
                      <button className="btn btn-danger" onClick={() => handleDelete(product._id)}>Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No products available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CreateProduct;
