import { api } from "../../api/apiSlice";
console.log(api);

// const bookApi = api.injectEndpoints({
//   endpoints: (builder) => ({
//     getAllBook: builder.query<IResponse, undefined>({
//       query: () => ({ url: "/book" }),
//     }),
//   }),
// });

// export const { useGetAllBookQuery } = bookApi;

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllBook: builder.query({
      query: () => "/books",
    }),
  }),
});

export const { useGetAllBookQuery } = bookApi;
