const base =
  process.env.NODE_ENV !== "production"
    ? "https://res.cloudinary.com/kaungsorcerer/image/upload/v1557418796/"
    : "";

const defaultImgUrl =
  "https://www.digitalcitizen.life/sites/default/files/styles/img_u_large/public/featured/2016-08/photo_gallery.jpg";

const getImgUrl = imgId => {
  if (imgId) return base + imgId;
  else return defaultImgUrl;
};

export default {
  getImgUrl
};
