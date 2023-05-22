const crypto = require("crypto");

export const generateRandomNumber = () => {
  const min = 100000000; // Smallest 9-digit number
  const max = 999999999; // Largest 9-digit number

  const range = max - min + 1;
  const randomNumber =
    Math.floor((crypto.randomBytes(4).readUInt32LE(0) / 0xffffffff) * range) +
    min;

  return randomNumber.toString();
};

export const addSearchParametersAndRefresh = (searchParams: any) => {
  // Get the current URL
  const currentUrl = new URL(window.location.href);

  // Add or update the search parameters
  Object.keys(searchParams).forEach((key) => {
    currentUrl.searchParams.set(key, searchParams[key]);
  });

  // Set the modified URL and trigger a page refresh
  window.location.href = currentUrl.href;
};
