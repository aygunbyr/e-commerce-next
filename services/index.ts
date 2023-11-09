import axios from 'axios';

export const fetchProducts = async () => {
  const data = await axios.get('https://fakestoreapi.com/products');
  return data;
};

export const fetchProduct = async (productId: number) => {
  const data = await axios.get(
    `https://fakestoreapi.com/products/${productId}`,
  );
  return data;
};

export const fetchCategories = async () => {
  const data = await axios.get('https://fakestoreapi.com/products/categories');
  return data;
};
