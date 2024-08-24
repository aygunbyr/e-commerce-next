'use client';

import React from 'react';
import Link from 'next/link';
import { HomeIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';

import { useCart } from '@/features/cart/cart-provider';

const Header = () => {
  const { state } = useCart();

  const itemCount = state.products.length;

  return (
    <header className="sticky top-0 z-10 bg-primary-dark bg-opacity-95 text-secondary-light shadow-sm shadow-primary-dark">
      <div className="container max-xl:w-96">
        <div className="flex flex-col items-center space-x-6 px-1 py-1 sm:flex-row">
          <Link
            href="/"
            aria-label="e-commerce"
            className="text-3xl font-bold text-primary-light"
          >
            e-commerce
          </Link>
          <nav className="my-2 flex-1 text-xl sm:my-0">
            <ul className="ml-5 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-6">
              <li className="inline-flex">
                <Link
                  className="inline-flex items-center justify-center gap-1"
                  href="/"
                  aria-label="Go to home page"
                >
                  <HomeIcon width={24} />
                  <span className="text-lg font-medium">Home</span>
                </Link>
              </li>
              <li className="inline-flex">
                <Link
                  className="inline-flex items-center justify-center gap-1"
                  aria-label="Go to cart page"
                  href="/cart"
                >
                  <ShoppingCartIcon width={24} />
                  <span className="text-lg font-medium">Cart</span>
                  {itemCount > 0 && (
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary-light text-base font-bold text-primary-dark">
                      {itemCount}
                    </span>
                  )}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
