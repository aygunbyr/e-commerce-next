import React from 'react';

const CardSkeleton: React.FC = () => {
  return (
    <div className="z-[999] h-[250px] w-full animate-pulse overflow-hidden rounded bg-gray-200 p-4 shadow-md">
      {/* Image skeleton */}
      <div className="mb-2 h-40 w-full rounded bg-gray-300"></div>

      {/* Title skeleton */}
      <div className="mt-1 h-4 w-full rounded bg-gray-300"></div>
      <div className="mt-1 h-4 w-3/4 rounded bg-gray-300"></div>
    </div>
  );
};

export default CardSkeleton;
