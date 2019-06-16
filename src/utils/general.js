const getSampleContent = contents => {
  return (
    contents
      .find(content => content.contentType === "body")
      .value.replace("/n", "")
      .substring(0, 200) + " ..."
  );
};

export default {
  getSampleContent
};
