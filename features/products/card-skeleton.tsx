import React from 'react';

const CardSkeleton: React.FC = () => {
  return (
    <div className="z-[999] h-[250px] w-full animate-pulse overflow-hidden rounded bg-gray-300 p-4 shadow-md">
      {/* Image skeleton */}
      <div className="mb-2 h-36 w-full rounded bg-gray-400"></div>

      {/* Title skeleton */}
      <div className="mt-1 h-5 w-full rounded bg-gray-400"></div>
      <div className="mt-1 h-5 w-full rounded bg-gray-400"></div>
      <div className="mt-1 h-5 w-1/2 rounded bg-gray-400"></div>
    </div>
  );
};

export default CardSkeleton;
