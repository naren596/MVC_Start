import { getData, BASE_URL } from "./fetch-api.js";

import { getURL } from "./fetch-util.js";

const ENDPOINTS = {
  TREND_LIST: "trends"
};

export async function getComplaintTrendsData() {
  const url = getURL(ENDPOINTS.TREND_LIST, {"lens": "product", "sub_lens": "sub_product", "trend_interval": "year"});
  const data = await getData(url);

  // Parse the response to dictionary of product.sub_product with count of issues for each sub_product
  const products = data.aggregations.product.product.buckets;
  const result = {};
  products.forEach((product) => {
    const subProducts = product.product.buckets;
    subProducts.forEach((subProduct) => {
      result[product.key + "•" + subProduct.key] = subProduct.doc_count;
    });
  });
  return result
}

export async function getComplaintsData(options) {
  const url = getURL("", {
    ...options,
  });
  return await getData(url);
}

export async function getMovieReviews(id, options = {}) {
  const url = getURL(`movie/${id}/reviews`, {
    language: "en-US",
    page: 1,
    ...options,
  });
  return await getData(url);
}

export async function getComplaintDetails(id) {
  const url = getURL(`${id}`);
  return await getData(url);
}
