import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { BsChevronDown } from 'react-icons/bs';
import useAuth from '../../hooks/useAuth';

const data = [
  { id: 1, name: 'Home', url: '/' },
  { id: 2, name: 'About', url: '/about' },
  { id: 3, name: 'Categories', subMenu: true },
  { id: 4, name: 'Contact', url: '/contact' },
  { id: 5, name: 'Logout' },
];

function MenuMobile({
  showCatMenu,
  setShowCatMenu,
  setMobileMenu,
  categories,
}: any) {
  const { logOut } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logOut();
    router.push('/'); // Redirect to home page after logout
  };
  return (
    <ul className="flex flex-col md:hidden font-bold absolute top-[50px] left-0 w-full h-[calc(100vh-50px)] bg-white border-t text-black">
      {data?.map?.((item) => {
        return (
          <React.Fragment key={item.id}>
            {!!item.subMenu ? (
              <li
                className="cursor-pointer py-4 px-5 border-b flex flex-col relative"
                onClick={() => setShowCatMenu(!showCatMenu)}
              >
                <div className="flex justify-between items-center">
                  {item?.name}
                  <BsChevronDown />
                </div>
                {showCatMenu && (
                  <ul className="bg-black/[0.05] -mx-5 mt-4 -mb-4">
                    {categories?.map((category: any) => {
                      return (
                        <Link
                          key={category?.id}
                          href={`/category/${category?.attributes?.slug}`}
                          onClick={() => {
                            setMobileMenu(false);
                            setShowCatMenu(false);
                          }}
                        >
                          <li className="py-4 px-8 border-t flex justify-between">
                            {category?.attributes?.name}
                            <span className="opacity-50 text-sm">
                              {category?.attributes?.products?.data.length}
                            </span>
                          </li>
                        </Link>
                      );
                    })}
                  </ul>
                )}
              </li>
            ) : (
              <li className="py-4 px-5 border-b ">
                {item?.name === 'Logout' ? (
                  <button onClick={handleLogout}>{item.name}</button>
                ) : (
                  <Link
                    href={item?.url || ''}
                    onClick={() => setMobileMenu(false)}
                  >
                    {item?.name}
                  </Link>
                )}
              </li>
            )}
          </React.Fragment>
        );
      })}
    </ul>
  );
}

export default MenuMobile;
