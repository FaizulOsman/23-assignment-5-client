/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { api } from "../../api/apiSlice";

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllBook: builder.query({
      query: () => "/books",
    }),
    getSingleBook: builder.query({
      query: (id) => ({ url: `/books/${id}` }),
    }),
    getBooksByFilter: builder.query({
      query: (searchTerm) => ({ url: `/books?searchTerm=${searchTerm}` }),
    }),
    addNewBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["books"],
    }),
  }),
});

export const {
  useGetAllBookQuery,
  useGetSingleBookQuery,
  useGetBooksByFilterQuery,
  useAddNewBookMutation,
} = bookApi;
