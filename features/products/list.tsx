import { useAppSelector } from '@/redux/hooks';
import Card from '@/features/products/card';
import Loading from '@/components/loading';
import { useQuery } from '@tanstack/react-query';
import { Product } from '@/types';
import { getProducts } from '@/services/products';

const ProductsList = () => {
  const { filteredProducts } = useAppSelector((state) => state.products);

  const { error, isError, isLoading } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section id="products" className="flex flex-wrap">
      {filteredProducts?.length > 0 ? (
        filteredProducts?.map((product) => {
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
          {isError
            ? `An error occured: ${error}`
            : 'No product found matching these criteria'}
        </p>
      )}
    </section>
  );
};

export default ProductsList;
