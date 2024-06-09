let urlSearchParams;

const getParam = (param) => {
  if (!urlSearchParams) {
    urlSearchParams = Object.fromEntries(
      new URLSearchParams(window.location.search),
    );
  }

  return urlSearchParams[param];
};

export default getParam;
