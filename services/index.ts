const CACHE_LIFETIME = 60 * 60;

const fetchData = async (url: string) => {
  let error = '';
  let data = null;

  try {
    const res = await fetch(url, {
      next: { revalidate: CACHE_LIFETIME },
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
  return await fetchData('https://fakestoreapi.com/products');
};

export const fetchProduct = async (productId: number) => {
  return await fetchData(`https://fakestoreapi.com/products/${productId}`);
};

export const fetchCategories = async () => {
  return await fetchData('https://fakestoreapi.com/products/categories');
};
