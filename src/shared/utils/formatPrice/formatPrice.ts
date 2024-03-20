const formatPrice = (price: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: price < 0.01 && price !== 0 ? Math.max(2, -Math.floor(Math.log10(Math.abs(price))) + 2) : 2,
    maximumFractionDigits: price < 0.01 && price !== 0 ? Math.max(2, -Math.floor(Math.log10(Math.abs(price))) + 2) : 2,
  }).format(price);

export default formatPrice;
