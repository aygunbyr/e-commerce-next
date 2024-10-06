'use client';

import { useMemo } from 'react';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import ToastService from '@/services/toastService';

import { useCart } from './cart-provider';
import type { Product } from '@/models/product';
import Loading from '@/components/loading';
import { formatCurrency } from '@/utils';
import CartItemDesktop from './cart-item-desktop';
import CartItemMobile from './cart-item-mobile';
import Button from '@/components/button';

const Cart = () => {
  const { state: cart, dispatch } = useCart();

  const orderItems = () => {
    dispatch({ type: 'EMPTY_CART' });
    ToastService.success('Your products have been shipped');
  };

  const totalPrice = useMemo(() => {
    return cart.products.reduce(
      (acc: number, product: Product) =>
        acc + product.price * product.quantity!,
      0,
    );
  }, [cart.products]);

  if (cart.loading) {
    return <Loading />;
  }

  return (
    <section id="page-cart" className="mt-8">
      <h2 className="text-2xl font-semibold">My Cart</h2>
      <h3 className="text-lg font-medium">
        {cart.products.length > 0
          ? `${cart.products.length} product(s) in cart.`
          : 'Cart is empty.'}
      </h3>

      {cart.products.length > 0 && (
        <>
          <div className="mt-3 hidden overflow-auto rounded-lg shadow md:block">
            <table className="mb-4 w-full border border-primary-dark text-left">
              <thead className="bg-primary-dark text-gray-100">
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
                  <CartItemDesktop key={index} product={product} />
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 gap-4 md:hidden">
            {cart.products.map((product, index) => (
              <CartItemMobile key={index} product={product} />
            ))}
          </div>

          <div className="my-5">
            <p className="text-xl font-bold">Total:</p>
            <h2 className="text-2xl font-bold">
              ${formatCurrency(totalPrice)}
            </h2>
            <Button
              aria-label="Order items"
              className="my-5 p-2 font-semibold"
              onClick={() => orderItems()}
            >
              <ShoppingBagIcon width={20} aria-hidden="true" />
              <span className="text-md">Order Products</span>
            </Button>
          </div>
        </>
      )}
    </section>
  );
};

export default Cart;
