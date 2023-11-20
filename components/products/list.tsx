import Card from '@/components/card';
import Loading from '@/components/loading';
import type { Product } from '@/types';

interface ProductListProps {
  isLoading: string;
  paginatedProducts: Product[];
}

const ProductsList = ({ isLoading, paginatedProducts }: ProductListProps) => {
  return (
    <section id="products" className="flex flex-wrap">
      {paginatedProducts?.length > 0 ? (
        paginatedProducts?.map((product: Product) => {
          return (
            <div
              key={product.id}
              className="basis-full p-2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
            >
              <Card product={product} />
            </div>
          );
        })
      ) : isLoading === 'loading' ? (
        <Loading />
      ) : (
        <p className="my-4 w-full text-center text-xl">
          No product found matching these criteria
        </p>
      )}
    </section>
  );
};

export default ProductsList;
