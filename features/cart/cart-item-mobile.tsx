'use client';
import { memo } from 'react';
import Image from 'next/image';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';

import Button from '@/components/button';
import type { Product } from '@/models/product';
import { formatCurrency } from '@/utils';
import { useCart } from './cart-provider';

const CartItemMobile = ({ product }: { product: Product }) => {
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
          <Button
            aria-label={`Decrease quantity of product ${product.title}`}
            onClick={() =>
              dispatch({
                type: 'DECREASE_QUANTITY',
                payload: product,
              })
            }
          >
            <MinusIcon width={20} />
          </Button>
          <span>{product.quantity} Pcs.</span>
          <Button
            aria-label={`Increase quantity of product ${product.title}`}
            onClick={() =>
              dispatch({
                type: 'INCREASE_QUANTITY',
                payload: product,
              })
            }
          >
            <PlusIcon width={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

const memoizedCartItemMobile = memo(CartItemMobile);

export default memoizedCartItemMobile;
