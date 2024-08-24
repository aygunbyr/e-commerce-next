'use client';

import { useMemo } from 'react';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';

import { useCart } from './cart-provider';
import type { ProductWithQuantity } from '@/types';
import Loading from '@/components/loading';
import { formatCurrency } from '@/utils';
import CartItemDesktop from './cart-item-desktop';
import CartItemMobile from './cart-item-mobile';

const Cart = () => {
  const { state: cart, dispatch } = useCart();

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
                  <CartItemDesktop key={index} product={product} />
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 gap-4 md:hidden">
            {cart?.products?.map((product, index) => (
              <CartItemMobile key={index} product={product} />
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
