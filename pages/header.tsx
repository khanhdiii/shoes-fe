import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import Wrapper from '@/components/Wrapper/Wrapper';
import Menu from '@/components/Menu/Menu';
import MenuMobile from '@/components/MenuMobile/MenuMobile';
import UserProfile from '@/components/UserProfile/UserProfile';

import { fetchDataApi } from '@/utils/api';

import { BsCart } from 'react-icons/bs';
import { CgMenuRight } from 'react-icons/cg';

import { VscChromeClose } from 'react-icons/vsc';

function Header() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showCatMenu, setShowCatMenu] = useState(false);
  const [show, setShow] = useState('translate-y-0');
  const [lastScrollY, setLastScrollY] = useState(0);
  const [categories, setCategories] = useState(null);

  const { cartItems } = useSelector((state: any) => state.cart);

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow('-translate-y-[80px]');
      } else {
        setShow('shadow-sm');
      }
    } else {
      setShow('translate-y-0');
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  const fetchCategories = async () => {
    const { data } = await fetchDataApi('/api/categories?populate=*');
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <header
      className={`w-full h-[50px] md:h-[80px] bg-white flex items-center justify-between z-20 sticky top-0 transition-transform duration-300 ${show}`}
    >
      <Wrapper className="h-[60px] flex justify-between items-center">
        <Link href="/" onClick={() => setShowCatMenu(false)}>
          <img src="/img/logo.svg" className="w-[40px] md:w-[60px]" alt="" />
        </Link>
        <Menu
          showCatMenu={showCatMenu}
          setShowCatMenu={setShowCatMenu}
          categories={categories}
        />
        {mobileMenu && (
          <MenuMobile
            showCatMenu={showCatMenu}
            setShowCatMenu={setShowCatMenu}
            setMobileMenu={setMobileMenu}
            categories={categories}
          />
        )}

        <div className="flex items-center gap-2 text-black">
          {/* <div className="w-8 md:h-12 h-8 md:w-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
            <BsHeart className="text-[15px] md:text-[20px]" />
            <div className="h-[14x] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[12px] md:px-[5px]">
              15
            </div>
          </div> */}

          <Link href="/cart">
            <div className="w-8 md:h-12 h-8 md:w-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
              <BsCart className="text-[15px] md:text-[20px]" />
              {cartItems.length > 0 && (
                <div className="h-[14x] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[12px] md:px-[5px]">
                  {cartItems.length}
                </div>
              )}
            </div>
          </Link>

          <UserProfile />
          <div className="w-8 md:h-12 h-8 md:w-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative sm:text-sm md:text-md lg:text-md">
            {mobileMenu ? (
              <VscChromeClose
                className="text-[16px]"
                onClick={() => setMobileMenu(false)}
              />
            ) : (
              <CgMenuRight
                className="text-[20px]"
                onClick={() => setMobileMenu(true)}
              />
            )}
          </div>
        </div>
      </Wrapper>
    </header>
  );
}

export default Header;
