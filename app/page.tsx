import Hero from '@/components/hero';
import Products from '@/components/products';
import Slider from '@/components/slider';
import { fetchCategories, fetchProducts } from '@/services';

export default async function Home() {
  const [
    { error: errorProducts, data: products },
    { error: errorCategories, data: categories },
  ] = await Promise.all([fetchProducts(), fetchCategories()]);

  if (errorProducts) {
    return <p>Failed to fetch products data: {errorProducts}</p>;
  }

  if (errorCategories) {
    return <p>Failed to fetch categories data: {errorCategories}</p>;
  }

  return (
    <div className="overflow-auto">
      {/* <Slider /> */}
      <Hero />
      <Products products={products} categories={categories} />
    </div>
  );
}
