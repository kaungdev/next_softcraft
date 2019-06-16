export const getBaseUrl = req => {
  const baseUrl = req ? `${req.protocol}://${req.get("Host")}` : "";
  return baseUrl;
};

export const getTokenHeader = token => ({
  "x-access-token": token,
  "Content-Type": "application/json"
});

export const getAbsoluteUrl = ({ req, url }) => {
  const absoluteUrl = req ? getBaseUrl(req) + url : url;
  return absoluteUrl;
};
