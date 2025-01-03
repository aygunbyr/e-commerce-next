'use client';

import { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';
import { ShoppingCartIcon as ShoppingCartIconSolid } from '@heroicons/react/24/solid';
import ToastService from '@/services/toastService';

import { useCart } from '@/features/cart/cart-provider';
import { Product } from '@/models/product';
import Button from '../../components/button';
import { formatCurrency } from '@/utils';

interface CardProps {
  product: Product;
  isVisible: boolean;
}

const Card = ({ product, isVisible }: CardProps) => {
  const { title, price, image } = product;
  const { state, dispatch } = useCart();
  const itemInCart = state.products.some((item) => item.id === product.id);

  const toggleCartAction = () => {
    if (itemInCart) {
      dispatch({
        type: 'REMOVE_ITEM',
        payload: { id: product.id },
      });
      ToastService.error(`${product.title} removed from cart 🛒`);
    } else if (!itemInCart) {
      dispatch({ type: 'ADD_ITEM', payload: product });
      ToastService.success(`${product.title} added to cart 🛒`);
    }
  };

  return (
    <>
      <div className={`${!isVisible && 'h-0 w-0 overflow-hidden'}`}>
        <div
          id="product-card"
          className="group relative flex h-[250px] w-full flex-col gap-1 overflow-hidden rounded border border-gray-100 bg-white p-2 shadow transition-all duration-200 xl:hover:shadow-md xl:hover:shadow-gray-500"
        >
          <Link
            aria-label={`Go to product page ${product.title}`}
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
                ${formatCurrency(price)}
              </p>
            </div>
          </Link>
          <Button
            className="absolute right-2 top-2 hidden gap-0 rounded-full p-1.5 max-lg:inline-flex group-hover:lg:inline-flex"
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
      </div>
    </>
  );
};

const memoizedCard = memo(Card);

export default memoizedCard;
