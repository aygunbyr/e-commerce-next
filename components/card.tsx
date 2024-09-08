'use client';

import { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShoppingCartIcon,
  PlusIcon,
  MinusIcon,
} from '@heroicons/react/24/outline';
import { ShoppingCartIcon as ShoppingCartIconSolid } from '@heroicons/react/24/solid';
import { toast } from 'react-toastify';

import { useCart } from '@/features/cart/cart-provider';
import { Product } from '@/types';
import Button from './button';

interface CardProps {
  product: Product;
}

const Card = ({ product }: CardProps) => {
  const { title, price, image } = product;
  const { state, dispatch } = useCart();
  const itemInCart = state.products?.some((item) => item.id === product.id);

  const toggleCartAction = () => {
    if (!product) return;
    if (itemInCart) {
      dispatch({
        type: 'REMOVE_ITEM',
        payload: { id: product?.id },
      });
      toast.error(`${product?.title} removed from cart 🛒`);
    } else if (!itemInCart) {
      dispatch({ type: 'ADD_ITEM', payload: product });
      toast.success(`${product?.title} added to cart 🛒`);
    }
  };

  return (
    <div
      id="product-card"
      className="group relative flex h-[250px] w-full animate-landing flex-col gap-1 overflow-hidden rounded border border-primary-light bg-white p-2 shadow transition-all duration-200 xl:hover:shadow-md xl:hover:shadow-primary"
    >
      <Link
        aria-label={product.title}
        className="flex flex-col"
        key={product.id}
        href={`/products/${product.id}`}
      >
        <div className="relative -mt-1 mb-1 h-40 overflow-hidden">
          <Image
            className="self-center object-contain mix-blend-multiply transition-all duration-200 group-hover:scale-125"
            fill
            src={image}
            alt={product.title}
            aria-label={product.title}
          />
        </div>
        <div className="absolute top-40 pt-1">
          <h2 className="line-clamp-2 text-[18px] font-medium leading-tight">
            {title}
          </h2>
        </div>
        <div className="absolute top-52">
          <p className="whitespace-nowrap text-[28px] font-bold leading-tight">
            ${price}
          </p>
        </div>
      </Link>
      <Button
        className="absolute right-2 top-2 hidden gap-0 rounded-full p-1.5 group-hover:inline-flex"
        aria-label={
          itemInCart ? 'Remove product from cart' : 'Add product to cart'
        }
        onClick={toggleCartAction}
      >
        <>
          <ShoppingCartIconSolid aria-hidden="true" width={20} />
          {itemInCart ? (
            <MinusIcon aria-hidden="true" width={20} />
          ) : (
            <PlusIcon aria-hidden="true" width={20} />
          )}
        </>
      </Button>
    </div>
  );
};

const memoizedCard = memo(Card);

export default memoizedCard;
