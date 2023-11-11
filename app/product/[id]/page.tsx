import ProductDetail from '@/components/product-detail';
import { fetchProduct } from '@/services';
import React from 'react';

const ProductDetailPage = async (props: { params: { id: number } }) => {
  const productId = props.params.id;
  const product = await fetchProduct(productId);

  return <ProductDetail product={product} />;
};

export default ProductDetailPage;
