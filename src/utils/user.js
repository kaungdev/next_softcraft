import localforage from "localforage";

const getToken = async token => {
  return await localforage.getItem("token");
};

export default {
  getToken
};
