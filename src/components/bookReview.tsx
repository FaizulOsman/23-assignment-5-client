/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { FiSend } from 'react-icons/fi';
import { useAddReviewMutation } from '@/redux/features/book/bookApi';
import { getFromLocalStorage } from '@/utils/localstorage';
import { toast } from 'react-toastify';
import { Input } from './ui/input';

export default function BookReview(book: any) {
  const [inputValue, setInputValue] = useState<string>('');
  const [addReview, { data, isError, error, isLoading, isSuccess }] =
    useAddReviewMutation();
  const user = JSON.parse(getFromLocalStorage('user-info')!);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user) {
      return toast.error(`Please login in to add review`, {
        position: 'top-right',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }

    if (inputValue?.length === 0) {
      return;
    }

    const options = {
      id: book?.book?._id,
      data: {
        userName: user?.name,
        review: inputValue,
        userEmail: user?.email,
      },
    };

    addReview(options);
    setInputValue('');
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    if (isSuccess && !isLoading) {
      toast.success(`${data?.message}`, {
        position: 'top-right',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
    if (isError === true && error) {
      if ('data' in error) {
        toast.error(`${(error as any).data!.message}`, {
          position: 'top-right',
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
    }
  }, [isLoading, isSuccess, error, isError, data]);

  return (
    <div className="max-w-7xl mx-auto mt-5">
      <form className="flex gap-5 items-center" onSubmit={handleSubmit}>
        <Input
          className="border-2"
          onChange={handleChange}
          value={inputValue}
          placeholder="write your review here"
        />
        <Button
          type="submit"
          className="rounded-full h-10 w-10 p-2 text-[25px] bg-yellow-500 hover:bg-yellow-600"
        >
          <FiSend />
        </Button>
      </form>
      <div className="mt-10 mb-16">
        {book?.book?.reviews?.map(
          (
            review: { userName: string; review: string; userEmail: string },
            index: number
          ) => (
            <div key={index} className="flex gap-3 items-center mb-5">
              <Avatar>
                <AvatarImage src="https://static.vecteezy.com/system/resources/previews/009/383/461/original/man-face-clipart-design-illustration-free-png.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p>{review?.review}</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
