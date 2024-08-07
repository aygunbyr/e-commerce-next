'use client';

import Image from 'next/image';
import { ShoppingCartIcon, TrashIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';

import { CartActionType, useCart } from '@/context/cart-context';
import { formatCurrency } from '@/utils';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useEffect } from 'react';
import { getProductById } from '@/redux/productsSlice';

interface ProductDetailProps {
  productId: number;
}

const ProductDetail = ({ productId }: ProductDetailProps) => {
  const { state, dispatch: ctxDispatch } = useCart();
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

  useEffect(() => {}, []);

  const itemInCart = state.products.some((item) => item.id === product?.id);

  const toggleCartAction = () => {
    const actionType = itemInCart
      ? CartActionType.REMOVE_ITEM
      : CartActionType.ADD_ITEM;
    itemInCart
      ? toast.error(`${product?.title} removed from cart 🛒`)
      : toast.success(`${product?.title} added to cart 🛒`);
    ctxDispatch({ type: actionType, payload: product });
  };

  if (productLoading) {
    return <p>Product is loading...</p>;
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
          <div className="flex flex-1 flex-col gap-5">
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
            <button
              aria-label="Go to cart page"
              className="mx-2 mb-2 mt-auto flex w-80 items-center justify-center gap-1 rounded-md border border-primary-dark bg-primary-dark p-1 text-sm font-bold uppercase text-primary-light shadow-sm shadow-primary-dark transition-all duration-200 xl:hover:border-secondary xl:hover:bg-secondary"
              onClick={toggleCartAction}
            >
              {itemInCart ? (
                <>
                  <TrashIcon aria-hidden="true" width={24} /> Remove from Cart
                </>
              ) : (
                <>
                  <ShoppingCartIcon aria-hidden="true" width={24} /> Add to Cart
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductDetail;
