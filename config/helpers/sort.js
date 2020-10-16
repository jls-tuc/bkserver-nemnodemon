const orderArray = (elemt) => {
  let order = elemt.sort(function (a1, a2) {
    if (a1.nroForm < a2.nroForm) {
      return 1;
    } else if (a1.nroForm > a2.nroForm) {
      return -1;
    }
    return 0;
  });
  return order;
};

module.exports = orderArray;
