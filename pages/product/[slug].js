import React from 'react';
import Wrapper from '@/components/Wrapper/Wrapper';
import ProductCard from '@/components/ProductCard/ProductCard';
import RelatedProducts from '@/components/RelatedProducts/RelatedProducts';
import ProductDetailCarousel from '@/components/ProductDetailCarousel/ProductDetailCarousel';
import { IoMdHeartEmpty } from 'react-icons/io';
import { fetchDataApi } from '@/utils/api';

const Product = ({product, products}) => {

  const p = product?.data?.[0]?.attributes;
  return (
    <div className="w-full md:py-20">
      <Wrapper>
        <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]">
          <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
            <ProductDetailCarousel />
          </div>

          <div className="flex-[1] py-3">
            <div className="text-[34x] font-semibold mb-2">
              Jordan Retro 6 G
            </div>
            <div className="text-LG font-semibold MB-5">
              Men&apos;s Golf Shoes
            </div>
            <div className="text-lg font-semibold">VND : 3.000.000</div>
            <div className="text-md font-semibold text-black/[0.5]">
              include of taxes
            </div>
            <div className="text-md font-medium text-black/[0.5] mb-20">
              {`(Also includes all applicable duties)`}
            </div>

            {/* Size */}
            <div className="mb-10">
              <div className="flex justify-between mb-2">
                <div className="text-md font-semibold">Select Size</div>
                <div className="text-md font-medium text-black/[0.5]">
                  Select Guide
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer">
                  UK 6
                </div>
                <div className="border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer">
                  UK 6
                </div>
                <div className="border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer">
                  UK 6
                </div>
                <div className="border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer">
                  UK 6
                </div>
                <div className="border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer">
                  UK 6
                </div>
                <div className="border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer">
                  UK 6
                </div>
                <div className="border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer">
                  UK 6
                </div>
                <div className="border rounded-md text-center py-3 font-medium cursor-not-allowed bg-black/[0.1] opacity-50">
                  UK 6
                </div>
                <div className="border rounded-md text-center py-3 font-medium cursor-not-allowed bg-black/[0.1] opacity-50">
                  UK 6
                </div>
              </div>

              {/* Show error */}
              <div className="text-red-600 mt-1">
                Size selection is required
              </div>

              {/* Add to cart */}
              <button className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75">
                Add to cart
              </button>
              <button className="w-full py-4 rounded-full border border-black text-lg font-medium transition-transform active:scale-95 flex items-center justify-center gap-2 hover:opacity-75">
                Whishlist
                <IoMdHeartEmpty size={20} />
              </button>

              {/* product detail */}
              <div>
                <div className="text-lg font-bold mb-5">Product Details</div>
                <div className="markdown text-md mb-5">
                  descrtiopndescrtiopn
                  descrtiopndescrtiopndescrtiopndescrtiopndescrtiopndescrtiopndescrtiopndescrtiopndescrtiopndescrtiopn
                </div>
              </div>
            </div>
          </div>
        </div>
        <RelatedProducts />
      </Wrapper>
    </div>
  );
};
export default Product;

export async function getStaticPaths() {
  const products = await fetchDataApi("/api/products?populate=*");
  const paths = products?.data?.map((p) => ({
      params: {
          slug: p.attributes.slug,
      },
  }));

  return {
      paths,
      fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const product = await fetchDataApi(
      `/api/products?populate=*&filters[slug][$eq]=${slug}`
  );
  const products = await fetchDataApi(
      `/api/products?populate=*&[filters][slug][$ne]=${slug}`
  );

  return {
      props: {
          product,
          products,
      },
  };
}
