'use client';
import { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

import type { ProductWithQuantity } from '@/types';
import { formatCurrency } from '@/utils';
import { useCart } from './cart-provider';
import { toast } from 'react-toastify';

const CartItemDesktop = ({ product }: { product: ProductWithQuantity }) => {
  const { dispatch } = useCart();

  const removeItem = (product: ProductWithQuantity) => {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: { id: product?.id },
    });
    toast.error(`${product.title} removed from cart 🛒`);
  };

  return (
    <tr className="border border-primary-light text-lg font-bold xl:hover:bg-primary-light">
      <td className="w-32">
        <Link aria-label={product.title} href={`/products/${product.id}`}>
          <div className="relative h-32 w-32">
            <Image
              src={product.image}
              alt={product.title}
              aria-label={product.title}
              fill
              className="mx-auto object-contain p-4 mix-blend-multiply transition-all duration-200 xl:hover:scale-125"
            />
          </div>
        </Link>
      </td>
      <td className="w-100 p-4">{product.title}</td>
      <td className="w-32 p-4 text-center">${formatCurrency(product.price)}</td>
      <td className="w-60 gap-4 p-4 text-center">
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
      </td>
      <td className="w-32 p-4">
        <button
          aria-label={`Remove product from cart`}
          className="min-w-content inline-flex w-full items-center justify-center gap-2 rounded bg-primary-dark p-2 text-white transition-colors duration-200 xl:hover:bg-secondary-light xl:hover:text-primary-dark"
          onClick={() => removeItem(product)}
        >
          <TrashIcon width={24} aria-hidden="true" />
          Remove
        </button>
      </td>
    </tr>
  );
};

const memoizedCartItemDesktop = memo(CartItemDesktop);

export default memoizedCartItemDesktop;
