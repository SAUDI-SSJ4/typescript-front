export function formatCurrency(
  amount: number,
  showDecimals: boolean = true
): string {
  if (isNaN(amount)) {
    return Number(0).toLocaleString("ar-SA");
  }

  // Format the number with appropriate decimal places
  const formattedAmount = showDecimals
    ? amount.toLocaleString("ar-SA")
    : Math.round(amount).toLocaleString("ar-SA");

  return `${formattedAmount} ر.س`;
}
