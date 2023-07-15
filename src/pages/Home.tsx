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
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {data?.data?.data?.map((book: IBook) => {
            return <ProductCard book={book} key={book?._id} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default Home;
