'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { ShoppingCartIcon as ShoppingCartIconSolid } from '@heroicons/react/24/solid';
import { toast } from 'react-toastify';

import { useCart } from '@/context/cart-context';
import styles from '@/styles/card/styles.module.css';
import { Product } from '@/types';
import Image from 'next/image';

interface CardProps {
  product: Product;
}

const Card = ({ product }: CardProps) => {
  const { title, price, image } = product;
  const { state, dispatch } = useCart();
  const itemInCart = state.products?.some((item) => item.id === product.id);

  const toggleCartAction = () => {
    const actionType = itemInCart ? 'REMOVE_ITEM' : 'ADD_ITEM';
    itemInCart
      ? toast.error(`${title} removed from cart 🛒`)
      : toast.success(`${title} added to cart 🛒`);
    dispatch({ type: actionType, payload: product });
  };

  return (
    <div id="product-card" className={`${styles.card} group`}>
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
            {price} ₺
          </p>
        </div>
      </Link>
      <button
        className={`${styles['card-button']} group-hover:flex`}
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
