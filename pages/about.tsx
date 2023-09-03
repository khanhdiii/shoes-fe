import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const About: React.FC = () => {
  const sections = [
    {
      id: 'section1',
      bgColor: 'bg-yellow-100',
      name: 'Nike',
      title: 'NIKE READY PACK',
      subTitle: 'Just in',
      description:
        'The season is here. Start yours prepared with the best in touch, agility, precision and speed.',
    },
    {
      id: 'section2',
      bgColor: 'bg-blue-100',
      name: 'Converse',
      title: 'Converse X ADER ERROR',
      subTitle: 'Available Now',
      title1: 'First Day,',
      title1_1: 'Your Way',
      subTitle1:
        'Make a statement with your initials, sport your team number, or wear your school colours with pride—all designed by you.',
      description:
        'The Seoul-based brand blurs the line between old and new on the Chuck 70 and clothing.',
    },
    {
      id: 'section3',
      bgColor: 'bg-pink-100',
      name: 'Vans',
      title: 'YOUR NEW FAVORITE: THE KNU SKOOL',
      subTitle: 'Available Now',
      title1: 'First Day,',
      title1_1: 'Your Way',
      subTitle1:
        'Make a statement with your initials, sport your team number, or wear your school colours with pride—all designed by you.',
      description:
        'The Seoul-based brand blurs the line between old and new on the Old-school and clothing.',
    },
  ];

  const [activeSection, setActiveSection] = useState(sections[0].id);

  const handleScroll = () => {
    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        const rect = element.getBoundingClientRect();
        const isVisible =
          rect.top <= window.innerHeight / 2 &&
          rect.bottom >= window.innerHeight / 2;
        if (isVisible) {
          setActiveSection(section.id);
        }
      }
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const elementsToAnimate = document.querySelectorAll('.transition-opacity');
    elementsToAnimate.forEach((element) => {
      if (element.id === activeSection) {
        element.classList.remove('opacity-0');
      } else {
        element.classList.add('opacity-0');
      }
    });
  }, [activeSection]);

  return (
    <div>
      {sections.map((section) => (
        <div
          key={section.id}
          id={section.id}
          className={`min-h-screen ${
            section.bgColor
          } transition-all duration-300 ${
            activeSection !== section.id ? 'opacity-50' : ''
          }`}
        >
          {section.name === 'Nike' && (
            <>
              <div className="flex flex-col justify-center text-center my-2">
                <h5 className="mt-2 font-normal">{section?.subTitle}</h5>
                <h1 className="text-5xl text-center font-extrabold py-4">
                  {section?.title}
                </h1>
                <p>{section?.description}</p>
              </div>
              <div className="flex justify-center items-center gap-1">
                <div className="relative w-5/12 ">
                  <img
                    className={`w-full transition-opacity ${
                      activeSection !== section.id ? 'opacity-0' : 'opacity-100'
                    }`}
                    src="/img/thumb/nike-thumb.webp"
                    alt=""
                  />

                  <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-white bg-black bg-opacity-50">
                    <h3 className="text-3xl font-semibold p-3">Street wear</h3>
                    <p className="text-sm">{section.description}</p>
                  </div>
                </div>
                <div className="relative w-5/12">
                  <img
                     className={`w-full transition-opacity ${
                      activeSection !== section.id ? 'opacity-0' : 'opacity-100'
                    }`}
                    src="/img/thumb/nike-thumb-1.webp"
                    alt=""
                  />
                  <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-white bg-black bg-opacity-50">
                    <h3 className="text-3xl font-semibold p-3">Sport</h3>
                    <p className="text-sm">{section.description}</p>
                    <div className="absolute bottom-5 right-5 border rounded-lg p-1 hover:border-yellow-200 cursor-pointer">
                      <Link href={`/category/jordan`}>
                        <button>Go to Product</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          {section.name === 'Converse' && (
            <div className="flex flex-col justify-center items-center">
              <div className="flex justify-center items-center text-black">
                <div className="relative w-10/12 h-full flex my-10">
                  <img
                    className={`w-full justify-center items-center transition-opacity ${
                      activeSection !== section.id ? 'opacity-0' : 'opacity-100'
                    }`}
                    src="/img/thumb/converse-thumb.jpg"
                    alt=""
                  />
                  <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-center my-2">
                    <h5 className="mt-2 font-normal">{section?.subTitle}</h5>
                    <h1 className="text-2xl text-center font-extrabold py-4">
                      {section?.title}
                    </h1>
                    <p className="sm:text-sm md:text-md lg:text-lg">
                      {section?.description}
                    </p>
                    <div className="border rounded-lg p-1 bg-black text-white cursor-pointer inline-block w-[300px]">
                      <Link href={`/category/converse`}>
                        <button>Go to Product</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center text-white bg-[#1c318a] w-10/12">
                <div className="relative w-4/12 h-full flex my-10">
                  <img
                    className={`w-full justify-center items-center transition-opacity ${
                      activeSection !== section.id ? 'opacity-0' : 'opacity-100'
                    }`}
                    src="/img/thumb/converse-thumb-1.gif"
                    alt=""
                  />
                </div>
                <div className="relative w-4/12 h-full flex my-10 !bg-white">
                  <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-center my-2">
                    <h1 className="text-2xl text-center font-extrabold py-10 w-2/3 sm:text-sm md:text-md lg:text-lg">
                      {section?.title1} <br /> {section?.title1_1}
                    </h1>
                    <p className="sm:text-sm md:text-md lg:text-lg">
                      {section?.subTitle1}
                    </p>
                    <div className="border rounded-lg m-5 p-1 hover:bg-blue bg-white text-black text-md font-medium cursor-pointer inline-block w-[300px]">
                      <Link href={`/category/converse`}>
                        <button>Go to Product</button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="relative w-4/12 h-full flex my-10">
                  <img
                    className={`w-full justify-center items-center transition-opacity ${
                      activeSection !== section.id ? 'opacity-0' : 'opacity-100'
                    }`}
                    src="/img/thumb/converse-thumb-2.jpg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          )}
          {section.name === 'Vans' && (
            <>
              <div className="flex flex-col justify-center text-center my-2">
                <h5 className="mt-2 font-normal">{section?.subTitle}</h5>
                <h1 className="text-5xl text-center font-extrabold py-4">
                  {section?.title}
                </h1>
                <p>{section?.description}</p>
              </div>
              <div className="flex flex-col justify-center items-center gap-1">
                <div className="relative w-10/12 ">
                  <img
                     className={`w-full transition-opacity ${
                      activeSection !== section.id ? 'opacity-0' : 'opacity-100'
                    }`}
                    src="/img/thumb/vans-thumb.jpg"
                    alt=""
                  />
                  <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-white bg-black bg-opacity-50">
                    <h3 className="text-3xl font-semibold p-3">Street wear</h3>
                    <p className="text-sm">{section.description}</p>
                  </div>
                </div>
                <div className="flex justify-center items-center border rounded-lg p-1 my-5 cursor-pointer border-black bg-white text-black w-[300px] hover:bg-pink-100 ">
                  <Link href={`/category/vans`}>
                    <button>Go to Product</button>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default About;
