import ProductDetail from '@/features/products/product-detail';

const ProductDetailPage = (props: { params: { id: number } }) => {
  const productId = props.params.id;

  return (
    <>
      <ProductDetail productId={productId} />
    </>
  );
};

export default ProductDetailPage;
