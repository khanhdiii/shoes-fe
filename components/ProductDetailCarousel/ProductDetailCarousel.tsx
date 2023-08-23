import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

function ProductDetailCarousel({ images }: any) {
  return (
    <div className="text-white text-[20px] w-full max-w-[1280px] mx-auto sticky top-[50px]">
      <Carousel
        infiniteLoop={true}
        showIndicators={false}
        showStatus={false}
        thumbWidth={60}
        className="productCarousel"
      >
        {images?.map((img: any) => (
          <img
            key={img?.id}
            src={img?.attributes?.url}
            alt={img?.attributes?.name}
          />
        ))}
      </Carousel>
    </div>
  );
}

export default ProductDetailCarousel;
