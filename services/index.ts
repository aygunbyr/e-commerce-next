export const fetchProducts = async () => {
  const res = await fetch('https://fakestoreapi.com/products', {
    next: { revalidate: 300 },
  });
  if (!res.ok) {
    throw new Error('Faile to fetch data');
  }

  return res.json();
};

export const fetchProduct = async (productId: number) => {
  const res = await fetch(`https://fakestoreapi.com/products/${productId}`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) {
    throw new Error('Faile to fetch data');
  }

  return res.json();
};

export const fetchCategories = async () => {
  const res = await fetch('https://fakestoreapi.com/products/categories', {
    next: { revalidate: 300 },
  });
  if (!res.ok) {
    throw new Error('Faile to fetch data');
  }

  return res.json();
};
