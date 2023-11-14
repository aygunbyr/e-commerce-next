const BASE_URL = 'https://fakestoreapi.com';
const CACHE_LIFETIME = 60 * 60;

const fetchData = async (endpoint: string, options: RequestInit = {}) => {
  let error = null;
  let data = null;

  try {
    const res = await fetch(`${BASE_URL}/${endpoint}`, {
      next: { revalidate: CACHE_LIFETIME },
      ...options,
    });
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    data = await res.json();
  } catch (err) {
    error = (err as Error).message;
  }

  return { error, data };
};

export const fetchProducts = async () => {
  return fetchData('products');
};

export const fetchProduct = async (productId: number) => {
  return fetchData(`products/${productId}`);
};

export const fetchCategories = async () => {
  return fetchData('products/categories');
};
