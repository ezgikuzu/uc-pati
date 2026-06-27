import { createSlice } from "@reduxjs/toolkit";
import { blogs } from "../data/data";

const initialState = {
  approvedBlogs: blogs,
  pendingBlogs: [],
};

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    addPendingBlog: (state, action) => {
      state.pendingBlogs.unshift({
        id: Date.now(),
        status: "Beklemede",
        createdAt: new Date().toISOString().slice(0, 10),
        ...action.payload,
      });
    },

    approveBlog: (state, action) => {
      const blog = state.pendingBlogs.find((item) => {
        return item.id === action.payload;
      });

      if (blog) {
        blog.status = "Onaylandı";

        const alreadyAdded = state.approvedBlogs.some((item) => {
          return item.id === blog.id;
        });

        if (!alreadyAdded) {
          state.approvedBlogs.unshift({
            id: blog.id,
            title: blog.title,
            category: blog.category,
            image: blog.image,
            summary: blog.summary,
            content: blog.content,
          });
        }
      }
    },

    rejectBlog: (state, action) => {
      const blog = state.pendingBlogs.find((item) => {
        return item.id === action.payload;
      });

      if (blog) {
        blog.status = "Reddedildi";
      }
    },

    deletePendingBlog: (state, action) => {
      state.pendingBlogs = state.pendingBlogs.filter((item) => {
        return item.id !== action.payload;
      });
    },
  },
});

export const {
  addPendingBlog,
  approveBlog,
  rejectBlog,
  deletePendingBlog,
} = blogSlice.actions;

export default blogSlice.reducer;