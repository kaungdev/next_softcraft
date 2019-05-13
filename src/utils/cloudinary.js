import api from "../api";

const postImage = async ({ file }) => {
  const {
    cloudinaryApiKey,
    signature,
    timestamp,
    folder,
    uploadUrl
  } = await api.getCloudinaryInfo();
  const formData = new FormData();
  formData.append("api_key", cloudinaryApiKey);
  formData.append("signature", signature);
  formData.append("timestamp", timestamp);
  formData.append("file", file);
  formData.append("folder", folder);
  const { public_id } = await api.postCloudinaryImage({ uploadUrl, formData });
  return public_id;
};

export default {
  postImage
};
