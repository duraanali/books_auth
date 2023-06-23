import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import BASE_URL from "./BaseUrl";

// Helper function to set the token in the browser's cookie
const setTokenCookie = (token) => {
  Cookies.set("token", token, { expires: 1 }); // Set the token cookie with a 1-day expiration
};

export const authSlice = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({

    // Register User
    register: builder.mutation({
      query: (newUser) => ({
        url: "register",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["User"],
    }),

    // login
    login: builder.mutation({
      query: (user) => ({
        url: "login",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["User"],
      // on success we want to set the token cookie
      onQueryStarted: async (arg, { queryFulfilled }) => {
            try {
                const result = await queryFulfilled;
                setTokenCookie(result.data.token);
            } catch (error) {
                console.log(error);
            }
        },
    }),

  }),
});

export const { useRegisterMutation, useLoginMutation } = authSlice;

export default authSlice.reducer;