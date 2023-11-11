import ProductList from '@/components/product-list';
import Slider from '@/components/slider';
import { fetchCategories, fetchProducts } from '@/services';

export default async function Home() {
  const [products, categories] = await Promise.all([
    fetchProducts(),
    fetchCategories(),
  ]);

  return (
    <>
      <Slider />
      <ProductList products={products} categories={categories} />
    </>
  );
}
