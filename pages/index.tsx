import Banner from '@/components/Banner/Banner';
import ProductCard from '@/components/ProductCard/ProductCard';
import Wrapper from '@/components/Wrapper/Wrapper';
import useAuth from '@/hooks/useAuth';
import { fetchDataApi } from '@/utils/api';

export default function Home({ products }: any) {
  const { user } = useAuth();
  return (
    <main>
      <Banner />
      <Wrapper>
        {user ? (
          <>
            <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
              <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight ">
                Cushioning for Your Miles
              </div>
              <div className="text-md md:text-xl">
                A lightweight Nike ZoomX midsole is combined with increased
                stack heights to help provide cushioning during extended
                stretches of running
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
              {products?.data?.map((product: any) => (
                <ProductCard key={product.id} data={product} />
              ))}
            </div>
          </>
        ) : (
          // Content for users not logged in
          <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
            <h2 className="text-red-500 font-semibold">
              Please log in to see the content.
            </h2>
          </div>
        )}
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
