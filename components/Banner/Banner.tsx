import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { BiArrowBack } from 'react-icons/bi';

function Banner() {
  return (
    <div className="relative text-white text-[20px] w-full max-w-[1060px] mx-auto">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        renderArrowPrev={(clickHandler) => (
          <div
            onClick={clickHandler}
            className="absolute rounded-md right-[31px] md:right-[51px] bottom-0 w-[30px]
        md:w-[50px] h-[30px] md:h-[50px] bg-black z-10 flex items-center justify-center cursor-pointer hover:opacity-90"
          >
            <BiArrowBack className="text-sm md:text-lg text-white" />
          </div>
        )}
        renderArrowNext={(clickHandler) => (
          <div
            onClick={clickHandler}
            className="absolute rounded-md right-0 bottom-0 w-[30px]
        md:w-[50px] h-[30px] md:h-[50px] bg-black z-10 flex items-center justify-center cursor-pointer hover:opacity-90"
          >
            <BiArrowBack className="rotate-180 text-sm md:text-lg text-white" />
          </div>
        )}
      >
        <div>
          <img
            src="/img/slide-1.png"
            className="aspect-[16/10] md:aspect-auto object-cover"
          />
          <div
            className="px-[15px] md:px-[40px] py-10px] md:py-[25px] font-oswald
          bg-white absolute bottom-[25px] md:bottom-[75px] left-0 text-black/[0.9]
          text-[15px] md:text-[30px] uppercase font-medium cursor-pointer hover:opacity-90"
          >
            Show
          </div>
        </div>
        <div>
          <img
            src="/img/slide-2.png"
            className="aspect-[16/10] md:aspect-auto object-cover"
          />
          <div
            className="px-[15px] md:px-[40px] py-10px] md:py-[25px] font-oswald
          bg-white absolute bottom-[25px] md:bottom-[75px] left-0 text-black/[0.9]
          text-[15px] md:text-[30px] uppercase font-medium cursor-pointer hover:opacity-90"
          >
            Show
          </div>
        </div>
        <div>
          <img
            src="/img/slide-3.png"
            className="aspect-[16/10] md:aspect-auto object-cover"
          />
          <div
            className="px-[15px] md:px-[40px] py-10px] md:py-[25px] font-oswald
          bg-white absolute bottom-[25px] md:bottom-[75px] left-0 text-black/[0.9]
          text-[15px] md:text-[30px] uppercase font-medium cursor-pointer hover:opacity-90"
          >
            Show
          </div>
        </div>
      </Carousel>
    </div>
  );
}

export default Banner;
