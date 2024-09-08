'use client';

import Image from 'next/image';
import { ShoppingCartIcon, TrashIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';

import { useCart } from '@/features/cart/cart-provider';
import { formatCurrency } from '@/utils';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useEffect, useMemo } from 'react';
import { getProductById } from '@/features/products/productsSlice';
import Loading from '../../components/loading';
import Button from '@/components/button';

interface ProductDetailProps {
  productId: number;
}

const ProductDetail = ({ productId }: ProductDetailProps) => {
  const { state, dispatch: contextDispatch } = useCart();
  const dispatch = useAppDispatch();

  const { product, productError, productLoading } = useAppSelector(
    (state) => state.products,
  );

  useEffect(() => {
    const getThisProduct = async () => {
      await dispatch(getProductById(productId));
    };
    getThisProduct();
  }, []);

  const itemInCart = useMemo(
    () => state.products.some((item) => item.id === product?.id),
    [state.products, product],
  );

  const toggleCartAction = () => {
    if (!product) return;
    if (itemInCart) {
      contextDispatch({
        type: 'REMOVE_ITEM',
        payload: { id: product?.id },
      });
      toast.error(`${product?.title} removed from cart 🛒`);
    } else if (!itemInCart) {
      contextDispatch({ type: 'ADD_ITEM', payload: product });
      toast.success(`${product?.title} added to cart 🛒`);
    }
  };

  if (productLoading) {
    return <Loading />;
  }

  if (productError) {
    return <p>Failed fetching product. Error: {productError}</p>;
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
