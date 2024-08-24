'use client';
import { memo } from 'react';
import Image from 'next/image';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';

import type { ProductWithQuantity } from '@/types';
import { formatCurrency } from '@/utils';
import { useCart } from './cart-provider';

const CartItemMobile = ({ product }: { product: ProductWithQuantity }) => {
  const { dispatch } = useCart();

  return (
    <div className="rounded-lg bg-white p-4 shadow">
      <div className="flex flex-col items-center gap-2 space-x-2 text-lg font-medium">
        <div className="relative h-32 w-32">
          <Image
            src={product.image}
            alt={product.title}
            aria-label={product.title}
            fill
            className="mx-auto object-contain p-4 mix-blend-multiply transition-all duration-200 xl:hover:scale-125"
          />
        </div>
        <span>{product.title}</span>
        <span>${formatCurrency(product.price)}</span>
        <div className="inline-flex items-center gap-4">
          <button
            aria-label={`Decrease quantity of product ${product.title}`}
            className="rounded-sm bg-red-700 p-0.5 text-white shadow-red-700 transition-all duration-200 xl:hover:bg-red-600 xl:hover:shadow-red-600"
            onClick={() =>
              dispatch({
                type: 'DECREASE_QUANTITY',
                payload: product,
              })
            }
          >
            <MinusIcon width={24} />
          </button>
          <span>{product.quantity} Pcs.</span>
          <button
            aria-label={`Increase quantity of product ${product.title}`}
            className="rounded-sm bg-green-700 p-0.5 text-white shadow shadow-green-700 transition-all duration-200 xl:hover:bg-green-600 xl:hover:shadow-green-600"
            onClick={() =>
              dispatch({
                type: 'INCREASE_QUANTITY',
                payload: product,
              })
            }
          >
            <PlusIcon width={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

const memoizedCartItemMobile = memo(CartItemMobile);

export default memoizedCartItemMobile;
