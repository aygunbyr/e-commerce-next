import ProductDetail from '@/components/product-detail';
import { fetchProduct } from '@/services';
import React from 'react';

const ProductDetailPage = async (props: { params: { id: number } }) => {
  const productId = props.params.id;
  const { error, data: product } = await fetchProduct(productId);

  if (error) {
    return <p>Failed to fetch product data: {error}</p>;
  }

  return <ProductDetail product={product} />;
};

export default ProductDetailPage;
