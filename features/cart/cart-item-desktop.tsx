'use client';
import { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

import Button from '@/components/button';
import type { Product } from '@/models/product';
import { formatCurrency } from '@/utils';
import { useCart } from './cart-provider';
import ToastService from '@/services/toastService';

const CartItemDesktop = ({ product }: { product: Product }) => {
  const { dispatch } = useCart();

  const removeItem = (product: Product) => {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: { id: product.id },
    });
    ToastService.error(`${product.title} removed from cart 🛒`);
  };

  return (
    <tr className="text-md border border-gray-100 font-bold xl:hover:bg-gray-200">
      <td className="w-32">
        <Link
          aria-label={`Go to product page ${product.title}`}
          href={`/products/${product.id}`}
        >
          <div className="relative h-28 w-28">
            <Image
              src={product.image}
              alt={product.title}
              aria-label={product.title}
              fill
              className="mx-auto object-contain p-4 mix-blend-multiply transition-all duration-200 xl:hover:scale-110"
            />
          </div>
        </Link>
      </td>
      <td className="w-100 p-4">{product.title}</td>
      <td className="w-32 p-4 text-center">${formatCurrency(product.price)}</td>
      <td className="w-60 gap-4 p-4 text-center">
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
          <span className="whitespace-nowrap">{product.quantity} Pcs.</span>
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
      </td>
      <td className="px-2 py-1">
        <Button
          aria-label="Remove product from cart"
          onClick={() => removeItem(product)}
        >
          <>
            <TrashIcon width={20} aria-hidden="true" />
            <span className="text-[16px] font-[400]">Remove</span>
          </>
        </Button>
      </td>
    </tr>
  );
};

const memoizedCartItemDesktop = memo(CartItemDesktop);

export default memoizedCartItemDesktop;
