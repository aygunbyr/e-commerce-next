import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setSearchBarText } from './productsSlice';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/services/productsApiService';
import { Product } from '@/models/product';

export default function Search() {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const { searchBarText } = useAppSelector((state) => state.products);

  const { data: products } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  const filteredProducts = useMemo(
    () =>
      products?.filter((product) =>
        product.title.toLowerCase().includes(searchBarText.toLowerCase()),
      ) || [],
    [products, searchBarText],
  );
  const dispatch = useAppDispatch();

  /**
   * Sets isFocused to false if the blur event is not triggered by an element
   * inside the search bar.
   * @param {React.FocusEvent<HTMLDivElement>} e The focus event.
   */
  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsFocused(false);
    }
  };

  return (
    <div
      className="relative mb-1 inline-flex w-full"
      tabIndex={-1}
      onBlur={handleBlur}
    >
      <input
        type="text"
        className="mt-1 w-full rounded px-2 py-1 outline-none"
        placeholder="Search"
        value={searchBarText}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          dispatch(setSearchBarText(e.target.value))
        }
        onFocus={() => setIsFocused(true)}
      />
      {isFocused && searchBarText && searchBarText.length >= 3 && (
        <div className="absolute left-0 top-full z-20 max-h-screen w-full overflow-y-auto rounded-bl-lg rounded-br-lg border-0 bg-white px-2 pb-4 pt-2 shadow shadow-gray-500">
          {filteredProducts.length === 0 && (
            <span className="inline-block w-full text-center">
              No product found.
            </span>
          )}
          {filteredProducts.length > 0 &&
            filteredProducts.map((product) => (
              <Link
                aria-label={`Go to product page ${product.title}`}
                key={product.id}
                href={`/products/${product.id}`}
                className="inline-flex w-full cursor-pointer items-center gap-2 p-2 hover:bg-gray-100"
                onClick={() => setIsFocused(false)}
              >
                <div className="relative h-8 w-8">
                  <Image
                    className="object-contain mix-blend-multiply"
                    fill
                    src={product.image}
                    alt={product.title}
                    aria-label={product.title}
                  />
                </div>
                <span className="line-clamp-1">{product.title}</span>
              </Link>
            ))}
          <span
            className="inline-flex w-full cursor-pointer items-center justify-end gap-2 rounded-lg p-2 hover:underline"
            onClick={() => setIsFocused(false)}
          >
            Close
          </span>
        </div>
      )}
    </div>
  );
}
