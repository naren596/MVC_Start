function getSearchParams(params) {
  let searchParams = new URLSearchParams(params).toString();

  return searchParams;
}

export function getURL(path, options) {
  const searchParams = getSearchParams(options);

  if (searchParams != null && searchParams != "") {
    return path + "?" + searchParams;
  }
  return path;
}
