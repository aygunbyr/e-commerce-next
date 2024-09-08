'use client';
import {
  MagnifyingGlassIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/outline';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setCategory, setSearchText } from '@/features/products/productsSlice';
import { toCapitalCase } from '@/utils';

const ProductsForm = () => {
  const { categories, category, searchText } = useAppSelector(
    (state) => state.products,
  );
  const dispatch = useAppDispatch();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form
      id="filter-form"
      className="mt-1 flex flex-col items-center justify-between gap-3 rounded-md bg-primary-light px-2 py-1 text-lg text-primary-dark sm:flex-row sm:gap-0"
      onSubmit={handleSubmit}
    >
      <div className="inline-flex items-center gap-2 self-start">
        <label htmlFor="filter-select" className="sr-only">
          Filter by:
        </label>
        <ShoppingBagIcon aria-hidden="true" width={20} />
        <select
          className="rounded-sm border border-transparent p-1 text-primary-dark focus:outline-none"
          id="filter-select"
          name="filter"
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
            dispatch(setCategory(event.target.value))
          }
          value={category}
        >
          <option value="all">All Products</option>?
          {categories?.map((category: string, index: number) => (
            <option key={index} value={category}>
              {toCapitalCase(category)}
            </option>
          ))}
        </select>
      </div>

      <div className="inline-flex items-center gap-1 self-start">
        <label htmlFor="search" className="sr-only">
          Search:
        </label>
        <span>
          <MagnifyingGlassIcon aria-hidden="true" width={20} />
        </span>
        <input
          className="rounded-sm border border-transparent bg-white p-0.5 text-primary-dark placeholder:text-primary focus:outline-none"
          id="search"
          name="search"
          type="text"
          placeholder="Search..."
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            dispatch(setSearchText(event.target.value))
          }
          value={searchText}
        />
      </div>
    </form>
  );
};

export default ProductsForm;
