import { useEffect, useState } from 'react';
// import useAuth from '@/hooks/useAuth';
import { Input } from 'antd';

import SideBarMenu from '../components/SideBarMenu/SideBarMenu';
import Banner from '../components/Banner/Banner';
import Wrapper from '../components/Wrapper/Wrapper';
import Recommend from '../components/Recommend/Recommend';
import Price from '../components/Sidebar/Price/Price';
import ProductCard from '../components/ProductCard/ProductCard';
import { fetchDataApi } from '../utils/api';

export default function Home({ products }: any) {
  // const { user } = useAuth();

  const [selectedCategory, setSelectedCategory] = useState('All products');
  const [selectedPriceRange, setSelectedPriceRange] = useState(1);
  const [selectedSexRange, setSelectedSexRange] = useState(1);
  const [filterType, setFilterType] = useState('category');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchQueryChange = (e: any) => {
    setSearchQuery(e.target.value);
  };

  const filterProducts = (category: string) => {
    setSelectedCategory(category);
    setFilterType('category');
  };

  const filterByPriceRange = (priceRange: number) => {
    setSelectedPriceRange(priceRange);
    setFilterType('price');
  };

  const filterBySex = (sexRange: number) => {
    setSelectedSexRange(sexRange);
    setFilterType('sex');
  };

  const filteredProducts = products.data.filter((product: any) => {
    const productName = product.attributes.name.toLowerCase();
    const searchQueryLower = searchQuery.toLowerCase();

    if (filterType === 'category') {
      // Chỉ áp dụng lọc theo danh mục nếu loại lọc là 'category'
      if (selectedCategory === 'All products') {
        // Handle empty search query
        return searchQuery === '' || productName.includes(searchQueryLower);
      } else if (selectedCategory === 'Jordan') {
        return (
          product.attributes.categories.data.some(
            (category: any) => category.attributes.name === 'Jordan',
          ) &&
          (searchQuery === '' || productName.includes(searchQueryLower))
        );
      } else if (selectedCategory === 'Sneaker') {
        return (
          product.attributes.categories.data.some(
            (category: any) => category.attributes.name === 'Sneaker',
          ) &&
          (searchQuery === '' || productName.includes(searchQueryLower))
        );
      } else if (selectedCategory === 'Vans') {
        return (
          product.attributes.categories.data.some(
            (category: any) => category.attributes.name === 'Vans',
          ) &&
          (searchQuery === '' || productName.includes(searchQueryLower))
        );
      } else if (selectedCategory === 'Converse') {
        return (
          product.attributes.categories.data.some(
            (category: any) => category.attributes.name === 'Converse',
          ) &&
          (searchQuery === '' || productName.includes(searchQueryLower))
        );
      } else {
        return (
          product.category === selectedCategory &&
          (searchQuery === '' || productName.includes(searchQueryLower))
        );
      }
    }

    // Handle empty search query for other filter types
    return searchQuery === '' || productName.includes(searchQueryLower);
  });

  const filteredProductsByPrice = filteredProducts.filter((product: any) => {
    if (filterType === 'price') {
      // Chỉ áp dụng lọc theo giá nếu loại lọc là 'price'
      switch (selectedPriceRange) {
        case 1: // Tất cả giá
          return true;
        case 2: // 0 - 1.000.000
          return (
            product.attributes.price >= 1 && product.attributes.price <= 1000000
          );
        case 3: // 1.000.000 - 2.000.000
          return (
            product.attributes.price > 1000000 &&
            product.attributes.price <= 2000000
          );
        case 4: // 2.000.000 - 3.000.000
          return (
            product.attributes.price >= 2000000 &&
            product.attributes.price <= 3000000
          );
        case 5: // Trên 3.000.000
          return product.attributes.price > 3000000;
        default:
          return true; // Nếu không có phạm vi giá nào được chọn, hiển thị tất cả sản phẩm
      }
    } else {
      return true; // Nếu loại lọc không phải là 'price', hiển thị tất cả sản phẩm
    }
  });

  const filteredProductsBySex = filteredProducts.filter((product: any) => {
    if (filterType === 'sex') {
      // Chỉ áp dụng lọc theo giá nếu loại lọc là 'sex'
      switch (selectedSexRange) {
        case 1: // Tất cả gioi tinh
          return true;
        case 2: // Unisex
          return product.attributes.subtitle == `Unisex`;
        case 3: // Men
          return product.attributes.subtitle == `Men's Shoes`;
        case 4: // Women
          return product.attributes.subtitle == `Women's Shoes`;
        default:
          return true; // Nếu không có phạm vi giá nào được chọn, hiển thị tất cả sản phẩm
      }
    } else {
      return true; // Nếu loại lọc không phải là 'price', hiển thị tất cả sản phẩm
    }
  });

  useEffect(() => {
    // Update windowWidth whenever the window is resized
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      // Clean up the event listener when the component unmounts
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <main>
      {windowWidth >= 1350 ? (
        <SideBarMenu
          filterByPriceRange={filterByPriceRange}
          filterBySex={filterBySex}
        />
      ) : (
        ''
      )}
      <Banner />
      <Wrapper>
        {/* {user ? ( */}
        <>
          <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
            <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight ">
              Cushioning for Your Miles
            </div>
            <div className="text-md md:text-xl">
              A lightweight Nike ZoomX midsole is combined with increased stack
              heights to help provide cushioning during extended stretches of
              running
            </div>
          </div>
          <div className="float-right w-1/3">
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchQueryChange}
            />
          </div>
          <Recommend filterProducts={filterProducts} />
          {windowWidth < 1350 && (
            <Price filterByPriceRange={filterByPriceRange} />
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
            {filterType === 'category' &&
              filteredProducts.map((product: any) => (
                <ProductCard key={product.id} data={product} />
              ))}

            {filterType === 'price' &&
              filteredProductsByPrice.map((product: any) => (
                <ProductCard key={product.id} data={product} />
              ))}
            {filterType === 'sex' &&
              filteredProductsBySex.map((product: any) => (
                <ProductCard key={product.id} data={product} />
              ))}
          </div>
        </>
        {/* ) : ( */}
        {/* <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
          <h2 className="text-red-500 font-semibold">
            Please log in to see the content.
          </h2>
        </div> */}
        {/* )} */}
      </Wrapper>
    </main>
  );
}

export async function getStaticProps() {
  const products = await fetchDataApi('/api/products?populate=*');
  return {
    props: { products },
  };
}
