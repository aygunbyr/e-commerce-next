'use client';
import React, { useMemo } from 'react';
import Link from 'next/link';
import {
  MinusIcon,
  PlusIcon,
  ShoppingBagIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';

import styles from './styles.module.css';
import useCart from '../../context/CartContext/hook';
import type { ProductWithQuantity } from '@/types';

function CartPage() {
  const { state: cart, dispatch } = useCart();

  const removeItem = (product: ProductWithQuantity) => {
    dispatch({ type: 'REMOVE_ITEM', payload: product });
    toast.error(`${product.title} removed from cart 🛒`);
  };

  const checkout = () => {
    dispatch({ type: 'EMPTY_CART' });
    toast.success('Your products have been shipped');
  };

  const totalPrice = useMemo(() => {
    return cart.products
      .reduce(
        (acc: number, product: ProductWithQuantity) =>
          acc + product.price * product.quantity,
        0,
      )
      .toFixed(2);
  }, [cart.products]);

  return (
    <section id="page-cart" className="mt-8">
      <h2 className="mb-4 text-3xl font-semibold">My Cart</h2>
      <h3 className="mb-4 text-xl">
        {cart.products.length > 0
          ? `You have ${cart.products.length} product(s) in your cart`
          : `Your cart is empty.`}
      </h3>

      {cart.products.length > 0 && (
        <>
          <table className="mb-4 w-full overflow-hidden rounded-md border border-zinc-500 text-left md:shadow-md md:shadow-zinc-500">
            <thead className="bg-zinc-900 text-zinc-100">
              <tr className="flex">
                <th className="flex-1 p-4 text-center max-md:hidden">Photo</th>
                <th className="flex-1 p-4 text-start max-md:hidden">Product</th>
                <th className="flex-1 p-4 text-center max-md:hidden">Price</th>
                <th className="flex-1 p-4 text-center max-md:hidden">
                  Quantity
                </th>
                <th className="flex-1 p-4 text-start max-md:hidden">Action</th>
              </tr>
            </thead>
            <tbody className="flex flex-col">
              {cart.products.map((product, index) => (
                <tr
                  key={index}
                  className="flex items-center border border-b-gray-300 max-md:flex-col max-md:gap-2"
                >
                  <td className="flex-1 p-4">
                    <Link
                      aria-label={product.title}
                      href={`/product/${product.id}`}
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        aria-label={product.title}
                        className="mx-auto w-32 self-center p-4 mix-blend-multiply xl:hover:scale-105"
                      />
                    </Link>
                  </td>
                  <td className="flex-1 p-4 text-lg font-bold">
                    {product.title}
                  </td>
                  <td className="flex-1 p-4 text-center text-lg font-bold">
                    {product.price} ₺
                  </td>
                  <td className="flex flex-1 items-center justify-center gap-4 p-4 text-center text-lg font-bold">
                    <button
                      aria-label={`Decrease quantity of product ${product.title}`}
                      className="rounded-sm bg-red-700 p-0.5 text-white shadow-red-700 transition-all duration-200 xl:hover:bg-red-600 xl:hover:shadow-red-600"
                      onClick={() =>
                        dispatch({ type: 'DECREASE_QTY', payload: product.id })
                      }
                    >
                      <MinusIcon width={24} />
                    </button>
                    {product.quantity} Pcs.
                    <button
                      aria-label={`Increase quantity of product ${product.title}`}
                      className="rounded-sm bg-green-700 p-0.5 text-white shadow shadow-green-700 transition-all duration-200 xl:hover:bg-green-600 xl:hover:shadow-green-600"
                      onClick={() =>
                        dispatch({ type: 'INCREASE_QTY', payload: product.id })
                      }
                    >
                      <PlusIcon width={24} />
                    </button>
                  </td>
                  <td className="flex-1 p-4">
                    <button
                      aria-label={`Remove product from cart`}
                      className="min-w-content flex w-full items-center justify-center gap-2 rounded bg-zinc-900 p-2 text-white transition-colors duration-200 xl:hover:bg-rose-900"
                      onClick={() => removeItem(product)}
                    >
                      <TrashIcon width={24} aria-hidden="true" />
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex flex-wrap items-start justify-between gap-5 rounded bg-gray-50 p-4 align-baseline max-xl:flex-wrap-reverse max-xl:justify-center max-xl:gap-10">
            <button
              aria-label="Checkout"
              className={styles['empty-cart-button']}
              onClick={() => checkout()}
            >
              <ShoppingBagIcon width={32} aria-hidden="true" />
              <span className="text-lg text-gray-100">Checkout</span>
            </button>
            <div className="flex w-full flex-col items-center justify-center sm:w-1/3 md:items-end">
              <p className="text-end text-xl font-bold">Total:</p>
              <h2 className="text-end text-3xl font-bold">{totalPrice} ₺</h2>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default CartPage;
