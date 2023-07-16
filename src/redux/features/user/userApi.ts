import { api } from "../../api/apiSlice";

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<object, object>({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
    }),
    getLoggedInUser: builder.query<object, object>({
      query: () => ({ url: "/users" }),
    }),
  }),
});

export const { useRegisterMutation, useGetLoggedInUserQuery } = bookApi;
