'use client';
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
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
            dispatch(setCategory(event.target.value))
          }
          value={category}
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
