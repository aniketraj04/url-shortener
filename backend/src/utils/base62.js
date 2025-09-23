// base62.js - encode numeric ID to base62
const alphabet = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

function encodeBase62(num) {
  if (num === 0) return "0";
  let s = "";
  while (num > 0) {
    s = alphabet[num % 62] + s;
    num = Math.floor(num / 62);
  }
  return s;
}

module.exports = { encodeBase62 };
