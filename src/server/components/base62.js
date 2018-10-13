const base62 = (function() {
  const charset =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  const encode = number => {
    if (number === 0) return 0;
    let map = [];
    while (number > 0) {
      map = [...map, charset[number % 62]];
      number = Math.floor(number / 62);
    }
    return map.join("");
  };

  const decode = string => {
    return string
      .split("")
      .reduce((acc, ele, i) => acc + charset.indexOf(ele) * 62 ** i, 0);
  };

  return { encode, decode };
})();

module.exports = base62;
