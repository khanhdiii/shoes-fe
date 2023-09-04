import React, { useState } from 'react';

function Recommend({ filterProducts }: any) {
  const [selectedCategory, setSelectedCategory] = useState('All products');

  const handleFilter = (category: string) => {
    setSelectedCategory(category);
    filterProducts(category);
  };

  return (
    <div>
      <h2 className="m-3 text-lg font-semibold">Category</h2>
      <div className="flex ml-5 md:text-sm lg:text-lg sm:text-[10px]">
        <button
          className={`px-[20px] py-[10px] mr-2 border-transparent cursor-pointer ${
            selectedCategory === 'All products'
              ? 'bg-gray-400 text-white rounded-lg'
              : 'bg-transparent border-[0.6px] border-gray-300 text-[#323232]'
          }`}
          onClick={() => handleFilter('All products')}
        >
          All products
        </button>
        <button
          className={`px-[20px] py-[10px] mr-2 border-transparent cursor-pointer ${
            selectedCategory === 'Jordan'
              ? 'bg-gray-400 text-white rounded-lg'
              : 'bg-transparent border-[0.6px] border-gray-300 text-[#323232]'
          }`}
          onClick={() => handleFilter('Jordan')}
        >
          Jordan
        </button>
        <button
          className={`px-[20px] py-[10px] mr-2 border-transparent cursor-pointer ${
            selectedCategory === 'Sneaker'
              ? 'bg-gray-400 text-white rounded-lg'
              : 'bg-transparent border-[0.6px] border-gray-300 text-[#323232]'
          }`}
          onClick={() => handleFilter('Sneaker')}
        >
          Sneaker
        </button>
        <button
          className={`px-[20px] py-[10px] mr-2 border-transparent cursor-pointer ${
            selectedCategory === 'Vans'
              ? 'bg-gray-400 text-white rounded-lg'
              : 'bg-transparent border-[0.6px] border-gray-300 text-[#323232]'
          }`}
          onClick={() => handleFilter('Vans')}
        >
          Vans
        </button>
        <button
          className={`px-[20px] py-[10px] border-transparent cursor-pointer ${
            selectedCategory === 'Converse'
              ? 'bg-gray-400 text-white rounded-lg'
              : 'bg-transparent border-[0.6px] border-gray-300 text-[#323232]'
          }`}
          onClick={() => handleFilter('Converse')}
        >
          Converse
        </button>
        <button
          className={`px-[20px] py-[10px] border-transparent cursor-pointer ${
            selectedCategory === 'Converse'
              ? 'bg-gray-400 text-white rounded-lg'
              : 'bg-transparent border-[0.6px] border-gray-300 text-[#323232]'
          }`}
          onClick={() => handleFilter('New Balance')}
        >
          New Balance
        </button>
        <button
          className={`px-[20px] py-[10px] border-transparent cursor-pointer ${
            selectedCategory === 'Puma'
              ? 'bg-gray-400 text-white rounded-lg'
              : 'bg-transparent border-[0.6px] border-gray-300 text-[#323232]'
          }`}
          onClick={() => handleFilter('New Balance')}
        >
          Puma
        </button>
      </div>
    </div>
  );
}

export default Recommend;
