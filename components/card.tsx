'use client';

import { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
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
      className="group relative flex min-h-[270px] w-full animate-landing flex-col gap-1 rounded border border-primary-light bg-white p-2 shadow transition-all duration-200 xl:hover:shadow-md xl:hover:shadow-primary"
    >
      <Link
        aria-label={product.title}
        className="mt-2 flex flex-col"
        key={product.id}
        href={`/products/${product.id}`}
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
      <Button
        className="absolute right-2 top-2 rounded-full p-1.5 group-hover:flex"
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
      </Button>
    </div>
  );
};

const memoizedCard = memo(Card);

export default memoizedCard;
