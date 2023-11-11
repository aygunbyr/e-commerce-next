'use client';

import { useMemo, useState } from 'react';

import Card from '@/components/card';
import type { Product } from '@/types';
import { toCapitalCase } from '@/utils';

interface ProductListProps {
  products: Product[];
  categories: string[];
}

const ProductList = ({ products, categories }: ProductListProps) => {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    const filteredByCategory =
      filter === 'all'
        ? products
        : products.filter((item: Product) => item.category === filter);

    const searchLowerCase = search.toLowerCase();

    const filteredBySearchTerm = search
      ? filteredByCategory.filter(
          (item: Product) =>
            item.title.toLowerCase().includes(searchLowerCase) ||
            item.description.toLowerCase().includes(searchLowerCase),
        )
      : filteredByCategory;

    return filteredBySearchTerm;
  }, [filter, products, search]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <form
        id="filter-form"
        className="flex flex-col items-center justify-between gap-4 rounded-lg bg-zinc-900 p-2 text-lg sm:flex-row sm:gap-0"
        onSubmit={handleSubmit}
      >
        <div className="inline-flex items-center gap-2 self-start">
          <label htmlFor="filter-select" className="w-20 min-w-fit text-white">
            Filter by:
          </label>
          <select
            className="rounded p-1 focus:outline-none"
            id="filter-select"
            name="filter"
            onChange={(e) => setFilter(e.target.value)}
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
          <label
            htmlFor="search"
            className="w-20 min-w-fit text-white sm:hidden"
          >
            Search:
          </label>
          <input
            className="max-w-fit rounded px-1 py-0.5 focus:outline-none"
            id="search"
            name="search"
            type="text"
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>
      </form>
      <section id="products" className="flex flex-wrap">
        {filteredProducts?.map((product: Product) => {
          return (
            <div
              key={product.id}
              className="basis-full p-2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
            >
              <Card product={product} />
            </div>
          );
        })}
      </section>
    </>
  );
};

export default ProductList;
