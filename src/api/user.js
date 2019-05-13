import fetch from "isomorphic-unfetch";
const path = "/api/auth";

export default {
  postAuth: async ({ accessToken }) => {
    return await (await fetch(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ access_token: accessToken })
    })).json();
  }
};
