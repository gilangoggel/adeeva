const intl = new Intl.NumberFormat();

export const moneyFormat = (n: number) => {
  return intl.format(n);
};
