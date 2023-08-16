import React from 'react';
import Wrapper from '@/components/Wrapper/Wrapper';
import ProductCard from'@/components/ProductCard/ProductCard';

const Category = () => {
  return <div className="w-full md:py-20">
    <Wrapper>
     <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">Running Shoes</div>
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
     <ProductCard />
     <ProductCard />
     <ProductCard />
     <ProductCard />
     <ProductCard />
     <ProductCard />
     <ProductCard />
     <ProductCard />
   </div>
     </Wrapper>
   
  </div>;
}
export default Category;

