export const getBaseUrl = req => {
  const baseUrl = req ? `${req.protocol}://${req.get("Host")}` : "";
  return baseUrl;
};

export const getTokenHeader = token => ({
  "x-access-token": token,
  "Content-Type": "application/json"
});
