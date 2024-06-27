
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ProductContext = createContext();

export const useProduct = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const API_BASE_URL = "http://localhost:2100";

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const filtered = products.filter(product =>
        product.productName.toLowerCase().includes(lowerCaseQuery) ||
        product.Brand.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [searchQuery, products]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API_BASE_URL}/api/allProduct`);
      setProducts(data.products);
      setFilteredProducts(data.products);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (productData) => {
    try {
      const { data } = await axios.post(`${API_BASE_URL}/api/addProduct`, productData);
      setProducts((prevProducts) => [...prevProducts, data.product]);
      setFilteredProducts((prevProducts) => [...prevProducts, data.product]);
      toast.success("Product added successfully");
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product");
    }
  };
  // contexxt update prodduct
  const updateProduct = async (id, productData) => {
    try {
      const { data } = await axios.put(
        `${API_BASE_URL}/api/updateProduct/${id}`,
        productData
      );
      setProducts((prevProducts) =>
        prevProducts.map((p) => (p._id === id ? data.product : p))
      );
      setFilteredProducts((prevProducts) =>
        prevProducts.map((p) => (p._id === id ? data.product : p))
      );
      toast.success("Product updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update product");
    }
  };
  // context delet product
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/delete/${id}`);
      setProducts((prevProducts) =>
        prevProducts.filter((p) => p._id !== id)
      );
      setFilteredProducts((prevProducts) =>
        prevProducts.filter((p) => p._id !== id)
      );
      toast.success("Product deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete product");
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        filteredProducts,
        loading,
        fetchProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        setSearchQuery,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
