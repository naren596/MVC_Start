const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json"
  }
};

export const BASE_URL = "https://corsproxy.io?https://www.consumerfinance.gov/data-research/consumer-complaints/search/api/v1/";

function getURL(path) {
  return BASE_URL + path;
}

export async function getData(path) {
  return await fetch(getURL(path), API_OPTIONS)
    .then((res) => res.json())
    .catch((e) => {
      console.log(e.message);
      throw new Error(e.message);
    });
}
