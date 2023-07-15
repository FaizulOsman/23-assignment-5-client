/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useGetAllBookQuery } from "../redux/features/books/bookApi";
import Loader from "../components/Loader";
import { IBook } from "../interfaces/globalTypes";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const { data, isLoading } = useGetAllBookQuery(undefined);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-10 mx-auto">
        <div>
          <h2 className="text-2xl mb-10 font-semibold text-center">
            Top 10 Books
          </h2>
          <div className="flex flex-wrap -m-4">
            {data?.data?.data?.map((book: IBook) => {
              return <ProductCard book={book} key={book?._id} />;
            })}
          </div>
        </div>
        <div className="mt-20">
          <h2 className="text-2xl mb-10 font-semibold text-center">
            Recently Added Books
          </h2>
          <div className="flex flex-wrap -m-4">
            {data?.data?.data?.map((book: IBook) => {
              return <ProductCard book={book} key={book?._id} />;
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
