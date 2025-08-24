export function formatCurrency(
  amount: number,
  showDecimals: boolean = true
): string {
  if (isNaN(amount)) {
    return "0 ر.س.";
  }

  // Format the number with appropriate decimal places
  const formattedAmount = showDecimals
    ? amount.toLocaleString("en-SA")
    : Math.round(amount).toLocaleString("en-SA");

  return `${formattedAmount} ر.س.`;
}
