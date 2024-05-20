const url = `${process.env.CMS_API_URL}`;

const cms = async (query) => {
  const options = {
    method: "POST",
    body: JSON.stringify({ query }),
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(url, options);

  return response.json();
};

export default cms;
