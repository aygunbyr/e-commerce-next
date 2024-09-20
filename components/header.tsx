'use client';
import Link from 'next/link';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

import { useCart } from '@/features/cart/cart-provider';
import Search from '@/features/products/search';

const Header = () => {
  const { state } = useCart();

  const itemCount = state.products.length;

  return (
    <header className="sticky top-0 z-10 bg-primary-dark bg-opacity-95 shadow-sm shadow-primary-dark">
      <div className="container max-xl:w-96">
        <div className="flex flex-col items-center justify-between px-1 py-1 sm:flex-row sm:gap-6">
          <Link
            href="/"
            aria-label="e-commerce"
            className="text-3xl font-bold text-gray-100"
          >
            e-commerce
          </Link>
          {/* Search */}
          <div className="inline-flex flex-1 items-center max-sm:order-3 max-sm:w-full sm:max-w-[600px]">
            <Search />
          </div>
          {/* Navigation Bar */}
          <nav className="my-2 text-xl text-secondary-light sm:my-0">
            <ul className="ml-5 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-6">
              <li className="inline-flex">
                <Link
                  className="inline-flex items-center justify-center gap-1"
                  aria-label="Go to cart page"
                  href="/cart"
                >
                  <ShoppingCartIcon width={24} />
                  <span className="text-lg font-medium">Cart</span>
                  <span
                    className={`inline-flex h-5 w-5 items-center justify-center rounded-full bg-gray-100 text-base font-bold text-primary-dark ${
                      itemCount > 0 ? 'visible' : 'invisible'
                    }`}
                  >
                    {itemCount}
                  </span>
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
