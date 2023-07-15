import { api } from "../../api/apiSlice";

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllBook: builder.query({
      query: () => "/books",
    }),
  }),
});

export const { useGetAllBookQuery } = bookApi;
