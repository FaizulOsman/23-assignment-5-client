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
      return toast.error(`Please login to add review`, {
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
        rating: rating,
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

  const [rating, setRating] = useState(5);

  const handleRatingClick = (index: number) => {
    const newRating = index + 1;
    setRating(newRating);
  };

  return (
    <div className="max-w-7xl mx-auto mt-5">
      <h3 className="text-xl font-semibold mb-3 text-center">Place a Review</h3>
      <form className="md:flex gap-5 items-center" onSubmit={handleSubmit}>
        <div className="md:w-4/5">
          <Input
            className="border-2"
            onChange={handleChange}
            value={inputValue}
            placeholder="Write your review here"
          />
        </div>
        <div className="flex items-center justify-center text-center mt-2 md:mt-0 md:w-1/5">
          <p className="text-lg font-bold"> Rating:</p>
          <span className="flex">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                className={`rating-star cursor-pointer ${
                  index < rating ? 'text-yellow-500' : ''
                }`}
                width="23"
                height="23"
                onClick={() => handleRatingClick(index)}
              >
                <path
                  fill="currentColor"
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
            ))}
          </span>
        </div>
        <div className="flex justify-center md:justify-end mt-4 md:mt-0 md:w-10">
          <Button
            type="submit"
            className="rounded-full h-10 w-10 p-2 text-[25px] bg-green-500 hover:bg-green-600"
          >
            <FiSend />
          </Button>
        </div>
      </form>
      <div className="mt-10 mb-16">
        {book?.book?.reviews?.map(
          (
            review: {
              userName: string;
              review: string;
              rating: number;
              userEmail: string;
            },
            index: number
          ) => (
            <div key={index} className="flex gap-3 items-center mb-5">
              <Avatar>
                <AvatarImage src="https://static.vecteezy.com/system/resources/previews/009/383/461/original/man-face-clipart-design-illustration-free-png.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-auto justify-between">
                <div>
                  <p className="font-semibold">{review?.userName}</p>
                  <p>{review?.review}</p>
                </div>
                <div className="text-center">
                  <span className="flex">
                    {[...Array(review?.rating)].map((_, index) => (
                      <svg
                        key={index}
                        fill="currentColor"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        className="w-4 h-4 text-yellow-500"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                    {[...Array(5 - review?.rating)].map((_, index) => (
                      <svg
                        key={index}
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        className="w-4 h-4 text-yellow-500"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </span>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
