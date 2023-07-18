/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IBook } from '@/types/globalTypes';
import { Link } from 'react-router-dom';
import {
  IoCheckmarkDoneCircleOutline,
  IoCheckmarkDoneCircleSharp,
} from 'react-icons/io5';
import { useFinishedReadingMutation } from '@/redux/features/readSoon/readSoonApi';
import { useEffect, useState } from 'react';
import { getFromLocalStorage } from '@/utils/localstorage';
import { toast } from 'react-toastify';

const Book = ({ data }: { data: IBook[] }) => {
  const user = JSON.parse(getFromLocalStorage('user-info')!);
  const [selectedBook, setSelectedBook] = useState<IBook | null>(null);
  const [
    finishedReading,
    { isError, isLoading, isSuccess, data: finishedData, error },
  ] = useFinishedReadingMutation();

  useEffect(() => {
    if (selectedBook && user) {
      const object = {
        bookId: selectedBook?._id,
        data: {
          finished: !selectedBook?.finishedReading,
          userId: user?._id,
        },
      };
      finishedReading(object);
    }
  }, [selectedBook]);

  useEffect(() => {
    if (isSuccess && !isLoading) {
      toast.success('Finished reading status updated successfully', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
    if (isError === true && error) {
      toast.error(`Something went wrong! Please try again.`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  }, [isLoading, error, isError, isSuccess]);

  return (
    <section className="text-gray-600 body-font">
      <div className="pb-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {data?.map((book: IBook, i: number) => (
            <Link
              to={`/book-details/${book?._id}`}
              key={i}
              className="lg:w-1/4 md:w-1/2 p-4 w-full"
            >
              <div className="block cursor-pointer relative h-[500px] rounded overflow-hidden">
                <img
                  alt="ecommerce"
                  className="object-cover hover:scale-110 transition-all object-center w-full h-full block"
                  src={book.image}
                />
              </div>
              <div className="mt-4">
                <div className="flex justify-between">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                    {book.genre}
                  </h3>
                  <h2 className="text-gray-900 text-xs tracking-widest title-font mb-1">
                    @{book.author}
                  </h2>
                </div>
                <h2 className="text-gray-900 title-font text-lg font-medium">
                  {book.title}
                </h2>
                <div className="flex justify-between items-end">
                  <p className="mt-1 font-semibold">
                    Published: {new Date(book.publicationDate).toDateString()}
                  </p>
                  {book?.finishedReading === false ? (
                    <button
                      onClick={() => {
                        setSelectedBook(book);
                      }}
                    >
                      <IoCheckmarkDoneCircleOutline className="text-3xl" />
                    </button>
                  ) : (
                    book?.finishedReading === true && (
                      <button
                        onClick={() => {
                          setSelectedBook(book);
                        }}
                      >
                        <IoCheckmarkDoneCircleSharp className="text-3xl text-green-500" />
                      </button>
                    )
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Book;
