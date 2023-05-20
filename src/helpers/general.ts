const crypto = require("crypto");

export function generateRandomNumber() {
  const min = 100000000; // Smallest 9-digit number
  const max = 999999999; // Largest 9-digit number

  const range = max - min + 1;
  const randomNumber =
    Math.floor((crypto.randomBytes(4).readUInt32LE(0) / 0xffffffff) * range) +
    min;

  return randomNumber.toString();
}
