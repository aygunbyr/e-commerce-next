import { useAppSelector } from '@/redux/hooks';
import Card from '@/components/card';

const ProductsList = () => {
  const paginatedProducts = useAppSelector(
    (state) => state.products.filteredProducts,
  );

  return (
    <section id="products" className="flex flex-wrap">
      {paginatedProducts?.length > 0 ? (
        paginatedProducts?.map((product) => {
          return (
            <div
              key={product.id}
              className="basis-full p-2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
            >
              <Card product={product} />
            </div>
          );
        })
      ) : (
        <p className="my-4 w-full text-center text-xl">
          No product found matching these criteria
        </p>
      )}
    </section>
  );
};

export default ProductsList;
