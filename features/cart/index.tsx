'use client';

import React, { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  MinusIcon,
  PlusIcon,
  ShoppingBagIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';

import { useCart } from './cart-provider';
import type { ProductWithQuantity } from '@/types';
import Loading from '@/components/loading';
import { formatCurrency } from '@/utils';

const Cart = () => {
  const { state: cart, dispatch } = useCart();

  const removeItem = (product: ProductWithQuantity) => {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: { id: product?.id },
    });
    toast.error(`${product.title} removed from cart 🛒`);
  };

  const orderItems = () => {
    dispatch({ type: 'EMPTY_CART' });
    toast.success('Your products have been shipped');
  };

  const totalPrice = useMemo(() => {
    return cart.products.reduce(
      (acc: number, product: ProductWithQuantity) =>
        acc + product.price * product.quantity,
      0,
    );
  }, [cart.products]);

  if (cart.loading) {
    return <Loading />;
  }

  return (
    <section id="page-cart" className="mt-8">
      <h2 className="mb-4 text-3xl font-semibold">My Cart</h2>
      <h3 className="mb-4 text-xl">
        {cart.products.length > 0
          ? `${cart.products.length} product(s) in cart.`
          : 'Cart is empty.'}
      </h3>

      {cart?.products?.length > 0 && (
        <>
          <div className="hidden overflow-auto rounded-lg shadow md:block">
            <table className="mb-4 w-full border border-primary-dark text-left">
              <thead className="bg-primary-dark text-primary-light">
                <tr className="border-primary-dark text-center">
                  <th className="w-32 p-4">Photo</th>
                  <th className="w-100 p-4 text-start">Product</th>
                  <th className="w-32 p-4">Price</th>
                  <th className="w-60 p-4">Quantity</th>
                  <th className="w-32  p-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.products.map((product, index) => (
                  <tr
                    key={index}
                    className="border border-primary-light text-lg font-bold xl:hover:bg-primary-light"
                  >
                    <td className="w-32">
                      <Link
                        aria-label={product.title}
                        href={`/products/${product.id}`}
                      >
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
                    <td className="w-32 p-4 text-center">
                      ${formatCurrency(product.price)}
                    </td>
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
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 gap-4 md:hidden">
            {cart?.products?.map((product, index) => (
              <div key={index} className="rounded-lg bg-white p-4 shadow">
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
            ))}
          </div>

          <div className="my-5 px-5">
            <p className="text-xl font-bold">Total:</p>
            <h2 className="text-3xl font-bold">
              ${formatCurrency(totalPrice)}
            </h2>
            <button
              aria-label="Order items"
              className="my-5 flex items-center justify-center gap-2 rounded-md border border-transparent bg-primary-dark px-4 py-2 font-semibold  text-primary-light shadow-sm shadow-primary-dark transition-all duration-200 xl:hover:bg-secondary-light xl:hover:text-primary-dark"
              onClick={() => orderItems()}
            >
              <ShoppingBagIcon width={24} aria-hidden="true" />
              <span className="text-lg">Order Products</span>
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default Cart;
