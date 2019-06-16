import { getAbsoluteUrl, getTokenHeader } from "../utils/api";

export default {
  getAllPosts: async ({ req }) => {
    const absoluteUrl = getAbsoluteUrl({ req, url: "/api/posts" });
    return await (await fetch(absoluteUrl)).json();
  },
  getUserPosts: async ({ req, token }) => {
    const absoluteUrl = getAbsoluteUrl({ req, url: "/api/posts" });
    return await (await fetch(absoluteUrl, {
      headers: getTokenHeader(token)
    })).json();
  },
  getPost: async ({ req, id }) => {
    const absoluteUrl = getAbsoluteUrl({ req, url: "/api/posts?id=" + id });
    return await (await fetch(absoluteUrl)).json();
  },
  createPost: async ({ token, payload }) => {
    const url = "/api/posts";
    return await (await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload })
    })).json();
  }
};
