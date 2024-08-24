import axios from 'axios';
import type { Product } from '../types';

const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
});

const getData = async <T>(endpoint: string): Promise<T> => {
  try {
    const response = await api.get<T>(endpoint);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCategories = async (): Promise<string[]> => {
  return getData<string[]>('/products/categories');
};

export const getProducts = async (): Promise<Product[]> => {
  return getData<Product[]>('/products');
};

export const getProductById = async (id: number): Promise<Product> => {
  return getData<Product>(`/products/${id}`);
};
