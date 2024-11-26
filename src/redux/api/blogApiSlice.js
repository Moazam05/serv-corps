import { apiSlice } from "./apiSlice";

export const blogsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: () => {
        return {
          url: "blogs?populate=*",
          method: "GET",
        };
      },
    }),

    getSingleBlog: builder.query({
      query: (id) => {
        return {
          url: `blogs/${id}?populate=*`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetBlogsQuery, useGetSingleBlogQuery } = blogsApiSlice;
