import { toCapitalCase } from '@/utils';
import React from 'react';

interface ProductsFormProps {
  categories: string[];
  filter: string;
  setFilter: (filter: string) => void;
  searchText: string;
  setSearchText: (searchText: string) => void;
}

const ProductsForm = ({
  categories,
  filter,
  setFilter,
  searchText,
  setSearchText,
}: ProductsFormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form
      id="filter-form"
      className="mt-1 flex flex-col items-center justify-between gap-4 rounded-sm bg-primary-light p-2 text-lg text-primary-dark sm:flex-row sm:gap-0"
      onSubmit={handleSubmit}
    >
      <div className="inline-flex items-center gap-2 self-start">
        <label htmlFor="filter-select" className="w-20 min-w-fit">
          Filter by:
        </label>
        <select
          className="rounded-sm border p-1 text-primary-dark focus:outline-none"
          id="filter-select"
          name="filter"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setFilter(e.target.value)
          }
          value={filter}
        >
          <option value="all">All Categories</option>?
          {categories?.map((category: string, index: number) => (
            <option key={index} value={category}>
              {toCapitalCase(category)}
            </option>
          ))}
        </select>
      </div>
      <div className="inline-flex items-center gap-2 self-start">
        <label htmlFor="search" className="w-20 sm:hidden">
          Search:
        </label>
        <input
          className="rounded-sm border px-1 py-0.5 text-primary-dark placeholder:text-primary focus:outline-none"
          id="search"
          name="search"
          type="text"
          placeholder="Search..."
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchText(e.target.value)
          }
          value={searchText}
        />
      </div>
    </form>
  );
};

export default ProductsForm;
