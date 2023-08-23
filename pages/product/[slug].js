import React, { useState } from 'react';
import Wrapper from '@/components/Wrapper/Wrapper';
import ProductCard from '@/components/ProductCard/ProductCard';
import RelatedProducts from '@/components/RelatedProducts/RelatedProducts';
import ProductDetailCarousel from '@/components/ProductDetailCarousel/ProductDetailCarousel';
import { IoMdHeartEmpty } from 'react-icons/io';
import { fetchDataApi } from '@/utils/api';
import { getDiscountPricePercent } from '@/utils/helper';
import ReactMarkdown from 'react-markdown';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/cartSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Product = ({ product, products }) => {
  const p = product?.data?.[0]?.attributes;

  const [selectedSize, setSelectedSize] = useState();
  const [showError, setShowError] = useState(false);

  const dispatch = useDispatch();

  const notify = () => {
    toast.success('Add to cart is successfully!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
  };

  return (
    <div className="w-full md:py-20">
      <ToastContainer />
      <Wrapper>
        <div className="flex flex-col w-full lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]">
          {/* left column start */}
          <div className="w-full md:w-auto flex-[1.5] max-w-[500px] mx-auto lg:mx-0">
            <ProductDetailCarousel images={p.imag.data} />
          </div>

          {/* right column start */}
          <div className="flex-[1] py-3">
            <div className="text-[34x] font-semibold mb-2">{p.name}</div>
            <div className="text-LG font-semibold MB-5">{p.subtitle}</div>
            <div className="flex items-center text-black/[0.5]">
              <p className="mr-2 text-lg font-semibold">
                {p?.price.toLocaleString('it-IT', {
                  currency: 'VND',
                })}
                &#8363;
              </p>
              {p.original_price && (
                <>
                  <p className="text-base font-medium line-through">
                    {p?.original_price.toLocaleString('it-IT', {
                      currency: 'VND',
                    })}
                    &#8363;
                  </p>
                  <p className="ml-auto text-base font-medium text-green-500">
                    {getDiscountPricePercent(p.original_price, p.price)}% off
                  </p>
                </>
              )}
            </div>
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

              <div id="sizesGrid" className=" grid grid-cols-3 gap-2">
                {p?.size?.data.map((size, index) => (
                  <div
                    key={index}
                    className={`border rounded-md text-center py-3 font-medium ${
                      size?.enabled
                        ? 'hover:border-black cursor-pointer'
                        : 'cursor-not-allowed bg-black/[0.1] opacity-50'
                    } ${selectedSize === size?.size ? 'border-black' : ''}`}
                    onClick={() => {
                      if (size?.enabled) {
                        setSelectedSize(size.size);
                        setShowError(false);
                      }
                    }}
                  >
                    {size?.size}
                  </div>
                ))}
              </div>

              {/* Show error */}
              {showError && (
                <div className="text-red-600 mt-1">
                  Size selection is required
                </div>
              )}

              {/* Add to cart */}
              <button
                className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75"
                onClick={() => {
                  if (!selectedSize) {
                    setShowError(true);
                    document.getElementById('sizesGrid').scrollIntoView({
                      block: 'center',
                      behavior: 'smooth',
                    });
                  } else {
                    const id = `${product?.data?.[0]?.id}`;
                    dispatch(
                      addToCart({
                        ...product?.data?.[0],
                        selectedSize,
                        id,
                        oneQuantityPrice: p.price,
                      }),
                    );
                    notify();
                  }
                }}
              >
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
                  <ReactMarkdown>{p.description}</ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        </div>
        <RelatedProducts products={products} />
      </Wrapper>
    </div>
  );
};
export default Product;

export async function getStaticPaths() {
  const products = await fetchDataApi('/api/products?populate=*');
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
    `/api/products?populate=*&filters[slug][$eq]=${slug}`,
  );
  const products = await fetchDataApi(
    `/api/products?populate=*&[filters][slug][$ne]=${slug}`,
  );

  return {
    props: {
      product,
      products,
    },
  };
}
