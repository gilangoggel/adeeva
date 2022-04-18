
const intl = new Intl.NumberFormat('ID', {
  currency:"IDR"
});

export function formatMoney(n : number){
  return intl.format(n)
}
