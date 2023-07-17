import Loader from '@/components/Loader';
import Book from '@/components/book';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGetBooksQuery } from '@/redux/features/book/bookApi';
import { IBook } from '@/types/globalTypes';
import { useState } from 'react';

const Books = () => {
  const [searchQuery, setSearchQuery] = useState({
    queryString: '',
    genre: '',
    year: '',
  });
  const constructUrl = () => {
    let url = '';
    if (searchQuery.genre && searchQuery.queryString && searchQuery.year) {
      url = `genre=${searchQuery.genre}&searchTerm=${searchQuery.queryString}&publicationYear=${searchQuery.year}`;
    } else if (searchQuery.genre && searchQuery.queryString) {
      url = `genre=${searchQuery.genre}&searchTerm=${searchQuery.queryString}`;
    } else if (searchQuery.genre && searchQuery.year) {
      url = `genre=${searchQuery.genre}&publicationYear=${searchQuery.year}`;
    } else if (searchQuery.queryString && searchQuery.year) {
      url = `searchTerm=${searchQuery.queryString}&publicationYear=${searchQuery.year}`;
    } else if (searchQuery.genre) {
      url = `genre=${searchQuery.genre}`;
    } else if (searchQuery.queryString) {
      url = `searchTerm=${searchQuery.queryString}`;
    } else if (searchQuery.year) {
      url = `publicationYear=${searchQuery.year}`;
    }
    return url;
  };

  const url = constructUrl();

  const { data, isLoading } = useGetBooksQuery(url);
  const { data: filterData } = useGetBooksQuery('');

  const genre: IBook[] | undefined = filterData?.data
    ?.filter((item: IBook, index: number, array: IBook[]) => {
      // Check if the current item's genre is unique in the array
      return (
        array.findIndex((element) => element.genre === item.genre) === index
      );
    })
    .sort((a: IBook, b: IBook) => a.genre.localeCompare(b.genre));

  const year: IBook[] | undefined = filterData?.data
    ?.filter((item: IBook, index: number, array: IBook[]) => {
      // Check if the current item's publicationYear is unique in the array
      return (
        array.findIndex(
          (element) => element?.publicationYear === item.publicationYear
        ) === index
      );
    })
    .sort((a: IBook, b: IBook) =>
      b.publicationYear.localeCompare(a.publicationYear)
    );

  if (isLoading) {
    <div>
      <Loader />
    </div>;
  }

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center mt-16 mb-5 h-96">
          {' '}
          <Loader />
        </div>
      ) : (
        <div className="container">
          <div className="flex flex-col gap-2 mt-16 mb-5 items-end">
            <Input
              type="text"
              className="w-72"
              onChange={(e) =>
                setSearchQuery({
                  ...searchQuery,
                  queryString: e.target.value,
                })
              }
              placeholder="Search by Title, Author, or Genre."
            />
            <Select
              onValueChange={(value) =>
                setSearchQuery({
                  ...searchQuery,
                  genre: value,
                })
              }
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="" className="font-bold">
                    Genre
                  </SelectItem>
                  {genre?.map((item) => (
                    <SelectItem value={item?.genre}>{item?.genre}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select
              onValueChange={(value) =>
                setSearchQuery({
                  ...searchQuery,
                  year: value,
                })
              }
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by publication year" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="">Publication year</SelectItem>
                  {year?.map((item) => (
                    <SelectItem value={item?.publicationYear}>
                      {item?.publicationYear}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Book data={data?.data ?? []} />
        </div>
      )}
    </>
  );
};

export default Books;
