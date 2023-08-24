import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import Wrapper from '@/components/Wrapper/Wrapper';
import ProductCard from '@/components/ProductCard/ProductCard';

import { fetchDataApi } from '@/utils/api';

const maxResult = 3;

const Category = ({ category, products, slug }) => {
  const { data, isLoading } = useSWR(
    `/api/products?populate=*&[filters][categories][slug][$eq]=${slug}&pagination[page]=${pageIndex}&pagination[pageSize]=${maxResult}`,
    fetchDataApi,
    {
      fallbackData: products,
    },
  );

  const { query } = useRouter();
  const [pageIndex, setPageIndex] = useState(1);

  useEffect(() => {
    setPageIndex(1);
  }, [query]);

  return (
    <div className="w-full md:py-20 relative">
      <Wrapper>
        <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
          {category?.data[0]?.attributes?.name}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
          {data.length == 0 ? (
            <Image
              className="col-span-3 flex justify-center items-center"
              src="/img/empty-cart.jpg"
              alt="empty"
              width={500}
              height={500}
              style={{ margin: '0 auto' }}
            />
          ) : (
            data?.data?.map((product) => (
              <ProductCard key={product.id} data={product} />
            ))
          )}
        </div>
        {/* PAGINATION BUTTONS START */}
        {data?.meta?.pagination?.total > maxResult && (
          <div className="flex gap-3 items-center justify-center my-16 md:my-0">
            <button
              className={`rounded py-2 px-4 bg-black text-white disabled:bg-gray-200 disabled:text-gray-500`}
              disabled={pageIndex === 1}
              onClick={() => setPageIndex(pageIndex - 1)}
            >
              Previous
            </button>

            <span className="font-bold">{`${pageIndex} of ${
              data && data.meta.pagination.pageCount
            }`}</span>

            <button
              className={`rounded py-2 px-4 bg-black text-white disabled:bg-gray-200 disabled:text-gray-500`}
              disabled={pageIndex === (data && data.meta.pagination.pageCount)}
              onClick={() => setPageIndex(pageIndex + 1)}
            >
              Next
            </button>
          </div>
        )}
        {/* PAGINATION BUTTONS END */}
        {isLoading && (
          <div className="absolute top-0 left-0 w-full h-full bg-white/[0.5] flex flex-col gap-5 justify-center items-center">
            <span className="text-2xl font-medium">Loading...</span>
          </div>
        )}
      </Wrapper>
    </div>
  );
};
export default Category;

export async function getStaticPaths() {
  const category = await fetchDataApi('/api/categories?populate=*');
  const paths = category?.data?.map((cate) => ({
    params: {
      slug: cate?.attributes?.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const category = await fetchDataApi(
    `/api/categories?filters[slug][$eq]=${slug}`,
  );
  const products = await fetchDataApi(
    `/api/products?populate=*&[filters][categories][slug][$eq]=${slug}&pagination[page]=1&pagination[pageSize]=${maxResult}`,
  );

  return {
    props: {
      category,
      products,
      slug,
    },
  };
}
