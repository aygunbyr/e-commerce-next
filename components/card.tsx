'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { ShoppingCartIcon as ShoppingCartIconSolid } from '@heroicons/react/24/solid';
import { toast } from 'react-toastify';

import { CartActionType, useCart } from '@/context/cart-context';
import { Product } from '@/types';

interface CardProps {
  product: Product;
}

const Card = ({ product }: CardProps) => {
  const { title, price, image } = product;
  const { state, dispatch } = useCart();
  const itemInCart = state.products?.some((item) => item.id === product.id);

  const toggleCartAction = () => {
    const actionType = itemInCart
      ? CartActionType.REMOVE_ITEM
      : CartActionType.ADD_ITEM;
    itemInCart
      ? toast.error(`${title} removed from cart 🛒`)
      : toast.success(`${title} added to cart 🛒`);
    dispatch({ type: actionType, payload: product });
  };

  return (
    <div
      id="product-card"
      className="group relative flex min-h-[270px] w-full flex-col gap-1 rounded border border-primary-light bg-primary-light p-2 shadow-sm transition-all duration-200 xl:hover:shadow-md xl:hover:shadow-primary"
    >
      <Link
        aria-label={product.title}
        className="mt-2 flex flex-col"
        key={product.id}
        href={`/product/${product.id}`}
      >
        <div className="relative h-36">
          <Image
            className="self-center object-contain mix-blend-multiply"
            fill
            src={image}
            alt={product.title}
            aria-label={product.title}
          />
        </div>
        <div className="absolute top-44">
          <h2 className="line-clamp-2 text-[18px] font-medium leading-tight">
            {title}
          </h2>
        </div>
        <div className="absolute top-56">
          <p className="whitespace-nowrap text-[28px] font-bold leading-tight">
            ${price}
          </p>
        </div>
      </Link>
      <button
        className="absolute right-2 top-2 items-center justify-center rounded-full border bg-primary-dark p-1.5 text-primary-light transition-all duration-200 group-hover:flex xl:hidden xl:hover:bg-white xl:hover:text-primary-dark xl:hover:shadow-md xl:hover:shadow-primary-dark"
        aria-label={
          itemInCart ? 'Remove product from cart' : 'Add product to cart'
        }
        onClick={toggleCartAction}
      >
        {itemInCart ? (
          <>
            <ShoppingCartIconSolid aria-hidden="true" width={20} />
          </>
        ) : (
          <>
            <ShoppingCartIcon aria-hidden="true" width={20} />
          </>
        )}
      </button>
    </div>
  );
};

export default Card;
