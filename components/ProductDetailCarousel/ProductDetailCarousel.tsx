import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

function ProductDetailCarousel() {
  return (
    <div className="text-white text-[20px] w-full max-w-[1360px] mx-auto sticky top-[50px]">
      <Carousel
        infiniteLoop={true}
        showIndicators={false}
        showStatus={false}
        thumbWidth={60}
        className="productCarousel"
      >
        <img src="/img/p1.png" alt="" />
        <img src="/img/p2.png" alt="" />
        <img src="/img/p3.png" alt="" />
        <img src="/img/p4.png" alt="" />
        <img src="/img/p5.png" alt="" />
        <img src="/img/p6.png" alt="" />
        <img src="/img/p7.png" alt="" />
      </Carousel>
    </div>
  );
}

export default ProductDetailCarousel;
