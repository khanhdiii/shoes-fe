import { getDiscountPricePercent } from '@/utils/helper';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function ProductCard({ data: { attributes: params, id } }: any) {
  return (
    <Link
      href={`/product/${params?.slug}`}
      className="transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer"
    >
      <Image
        width={500}
        height={500}
        src={params?.thumbnail?.data?.attributes?.url}
        alt={params?.name}
      />
      <div className="p-4 text-black/[0.9]">
        <h2 className="text-lg font-medium">{params?.name}</h2>
        <div className="flex items-center text-black/[0.5]">
          <p className="mr-2 text-lg font-semibold">
            {params?.price.toLocaleString('it-IT', {
              currency: 'VND',
            })}
            &#8363;
          </p>
          {params.original_price && (
            <>
              <p className="text-base font-medium line-through">
                {params?.original_price.toLocaleString('it-IT', {
                  currency: 'VND',
                })}
                &#8363;
              </p>
              <p className="ml-auto text-base font-medium text-green-500">
                {getDiscountPricePercent(params.original_price, params.price)}%
                off
              </p>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
