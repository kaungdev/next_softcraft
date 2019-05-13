import fetch from "isomorphic-unfetch";

export default {
  getCloudinaryInfo: async () => {
    return (await (await fetch("/api/general/cloudinary_signature")).json())
      .data;
  },

  postCloudinaryImage: async ({ uploadUrl, formData }) => {
    return await (await fetch(uploadUrl, {
      method: "POST",
      headers: {
        "X-Requested-With": "XMLHttpRequest"
      },
      body: formData
    })).json();
  }
};
