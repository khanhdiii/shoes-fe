export const getDiscountPricePercent = (
  originalPrice: number,
  discountPrice: number,
) => {
  const discount = originalPrice - discountPrice;
  const discountPercent = (discount / originalPrice) * 100;
  return discountPercent.toFixed(2);
};
