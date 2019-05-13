import user from "./user";
import post from "./post";
import cloudinary from "./cloudinary";

export default {
  ...user,
  ...post,
  ...cloudinary
};
