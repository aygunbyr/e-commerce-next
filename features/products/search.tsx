import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAppSelector } from '@/redux/hooks';

export default function Search() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const { products } = useAppSelector((state) => state.products);
  const filteredProducts = useMemo(
    () =>
      products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [products, searchTerm],
  );

  return (
    <div className="relative mb-1 inline-flex w-full">
      <input
        type="text"
        className="mt-1 w-full rounded px-2 py-1 outline-none"
        value={searchTerm}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchTerm(e.target.value)
        }
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {isFocused && searchTerm && searchTerm.length >= 3 && (
        <div className="absolute left-0 top-full z-10 max-h-screen w-full overflow-y-auto rounded-bl-lg rounded-br-lg border-0 bg-white px-2 pb-4 pt-2 shadow shadow-gray-500">
          {filteredProducts.length === 0 && (
            <span className="inline-block w-full text-center">
              No product found.
            </span>
          )}
          {filteredProducts.length > 0 &&
            filteredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="inline-flex w-full cursor-pointer items-center gap-2 rounded-lg p-2 hover:bg-gray-100"
                onClick={() => setSearchTerm('')}
              >
                <Image
                  src={product.image}
                  width={20}
                  height={20}
                  alt={product.title}
                />
                <span>{product.title}</span>
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
