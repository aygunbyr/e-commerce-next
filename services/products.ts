import axios from 'axios';
import type { Product } from '../types';

const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
});

/**
 * Generic function to get data from the API.
 * @template T The type of the data to be retrieved.
 * @param {string} endpoint The endpoint to be queried.
 * @returns {Promise<T>} A promise that resolves to the data retrieved, or rejects with an error.
 */
const getData = async <T>(endpoint: string): Promise<T> => {
  try {
    const response = await api.get<T>(endpoint);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Gets a list of all categories.
 *
 * @returns {Promise<string[]>} A list of all categories.
 */
export const getCategories = async (): Promise<string[]> => {
  return getData<string[]>('/products/categories');
};

/**
 * Gets a list of all products.
 *
 * @returns {Promise<Product[]>} A list of all products.
 */
export const getProducts = async (): Promise<Product[]> => {
  return getData<Product[]>('/products');
};

/**
 * Gets a product by its id.
 *
 * @param {number} id - The id of the product.
 *
 * @returns {Promise<Product>} The product with the given id.
 */
export const getProductById = async (id: number): Promise<Product> => {
  return getData<Product>(`/products/${id}`);
};
