import Book from '@/components/book';
import { useGetTenBooksQuery } from '@/redux/features/book/bookApi';
import { Loader } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const { data, isLoading } = useGetTenBooksQuery(undefined);
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center mt-16 mb-5 h-96">
          {' '}
          <Loader />
        </div>
      ) : (
        <div className="container">
          <section className="text-gray-600 body-font">
            <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
              <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
                <img
                  className="object-cover object-center rounded"
                  alt="hero"
                  src="https://thumbs.dreamstime.com/b/old-book-flying-letters-magic-light-background-bookshelf-library-ancient-books-as-symbol-knowledge-history-218640948.jpg"
                />
              </div>
              <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                  Find the book you're looking
                  <br className="hidden lg:inline-block" />
                  for easier to read right away.
                </h1>
                <p className="mb-8 leading-relaxed">
                  Are you searching for the best websites to reed books?
                </p>
                <div className="flex justify-center">
                  <Link to="/books">
                    <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                      See All Books
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <div>
            <h3 className="text-2xl font-semibold text-center mb-10">
              Recently Added 10 Books
            </h3>
            <Book data={data?.data ?? []} />
          </div>
        </div>
      )}
    </>
  );
}
