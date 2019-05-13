import { getBaseUrl, getTokenHeader } from "../utils/api";

export default {
  getUserPosts: async ({ req, token }) => {
    const url = req ? getBaseUrl(req) + "/api/posts" : "/api/posts";
    return await (await fetch(url, {
      headers: getTokenHeader(token)
    })).json();
  },
  createPost: async ({ token, payload }) => {
    const url = "/api/posts";
    return await (await fetch(url, {
      method: "POST",
      headers: getTokenHeader(token),
      body: JSON.stringify({ ...payload })
    })).json();
  }
};
