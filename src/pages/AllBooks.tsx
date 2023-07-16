/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  useGetAllBookQuery,
  useGetBooksByFilterQuery,
} from "../redux/features/books/bookApi";
import Loader from "../components/Loader";
import { IBook } from "../interfaces/globalTypes";
import ProductCard from "../components/ProductCard";
import { useState, useEffect } from "react";

const AllBooks = () => {
  const [search, setSearch] = useState("");
  const { data, isLoading } = useGetAllBookQuery(undefined);

  const [showData, setShowData] = useState(data);

  const { data: filteredData } = useGetBooksByFilterQuery(search);

  useEffect(() => {
    setShowData(filteredData);
  }, [filteredData]);

  const handleSearchFilter = (e: any) => {
    e.preventDefault();
    const searchName: string = e.target.searchBar.value;

    setSearch(searchName);
    setShowData(filteredData);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-10 mx-auto">
        <h2 className="text-2xl font-semibold text-center">All Books</h2>
        <form
          onSubmit={(e) => handleSearchFilter(e)}
          className="flex w-full justify-center items-end my-10"
        >
          <div className="relative mr-4 lg:w-full xl:w-1/2 w-2/4 md:w-full text-left">
            <input
              type="text"
              id="searchBar"
              name="searchBar"
              className="w-full bg-gray-100 bg-opacity-50 rounded focus:ring-2 focus:ring-indigo-200 focus:bg-transparent border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
            Button
          </button>
        </form>
        <div className="flex flex-wrap -m-4">
          {showData?.data?.data?.map((book: IBook) => {
            return <ProductCard book={book} key={book?._id} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default AllBooks;
