import { useAppSelector } from '@/redux/hooks';
import Card from '@/components/card';
import Loading from '@/components/loading';

const ProductsList = () => {
  const { filteredProducts, productsLoading, productsError } = useAppSelector(
    (state) => state.products,
  );

  if (productsLoading) {
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
          {productsError
            ? 'An error occured while getting products'
            : 'No product found matching these criteria'}
        </p>
      )}
    </section>
  );
};

export default ProductsList;
