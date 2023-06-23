import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import BASE_URL from "./BaseUrl";

// Helper function to get the token from the browser's cookie
const getToken = () => {
  return Cookies.get("token");
};

export const bookSlice = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Books"],
  endpoints: (builder) => ({
    // Fetch Books
    fetchBooks: builder.query({
      query: () => {
        return {
          url: "books",
          method: "GET",
        };
      },
      providesTags: ["Books"],
    }),

    // Add Book
    addBook: builder.mutation({
      query: (newBook) => ({
        url: "books",
        method: "POST",
        body: newBook,
      }),
      invalidatesTags: ["Books"],
    }),

    // Edit Book
    editBook: builder.mutation({
      query: ({ bookId, updatedBook }) => ({
        url: `books/${bookId}`,
        method: "PUT",
        body: updatedBook,
      }),
      invalidatesTags: ["Books"],
    }),

    // Delete Book
    deleteBook: builder.mutation({
      query: (bookId) => ({
        url: `books/${bookId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),
  }),
});

export const {
  useFetchBooksQuery,
  useAddBookMutation,
  useEditBookMutation,
  useDeleteBookMutation,
} = bookSlice;

export default bookSlice.reducer;
