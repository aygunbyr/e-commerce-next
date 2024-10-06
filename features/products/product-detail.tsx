'use client';

import Image from 'next/image';
import { ShoppingCartIcon, TrashIcon } from '@heroicons/react/24/outline';
import ToastService from '@/services/toastService';

import { useCart } from '@/features/cart/cart-provider';
import { formatCurrency } from '@/utils';
import { useMemo } from 'react';
import Loading from '../../components/loading';
import Button from '@/components/button';
import { Product } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { getProductById } from '@/services/productsApi';

interface ProductDetailProps {
  productId: number;
}

const ProductDetail = ({ productId }: ProductDetailProps) => {
  const { state, dispatch } = useCart();

  const {
    data: product,
    error,
    isError,
    isLoading,
  } = useQuery<Product>({
    queryKey: ['product', productId],
    queryFn: () => getProductById(productId),
  });

  const itemInCart = useMemo(
    () => state.products.some((item) => item.id === product?.id),
    [state.products, product],
  );

  const toggleCartAction = () => {
    if (!product) return;
    if (itemInCart) {
      dispatch({
        type: 'REMOVE_ITEM',
        payload: { id: product?.id },
      });
      ToastService.error(`${product?.title} removed from cart 🛒`);
    } else if (!itemInCart) {
      dispatch({ type: 'ADD_ITEM', payload: product });
      ToastService.success(`${product?.title} added to cart 🛒`);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <p>Failed fetching product. Error: {error.message}</p>;
  }

  return (
    <section id="page-product-detail" className="flex w-full">
      {product && (
        <div className="mt-10 flex flex-1 flex-col items-start gap-10 sm:flex-row">
          <div className="relative h-80 w-80 p-4">
            <Image
              src={product.image}
              alt="product"
              className="object-contain mix-blend-multiply"
              fill
            />
          </div>
          <div className="flex flex-1 flex-col items-start gap-5">
            <h2 className="text-3xl">{product.title}</h2>
            <p className="text-2xl font-bold">
              ${formatCurrency(product.price)}
            </p>
            <p>{product.description}</p>
            <p>Category: {product.category}</p>
            <p>
              Rating: <span className="font-bold">{product.rating.rate}</span> (
              {product.rating.count} votes)
            </p>
            <Button aria-label="Go to cart page" onClick={toggleCartAction}>
              {itemInCart ? (
                <>
                  <TrashIcon aria-hidden="true" width={20} /> Remove from Cart
                </>
              ) : (
                <>
                  <ShoppingCartIcon aria-hidden="true" width={20} /> Add to Cart
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductDetail;
