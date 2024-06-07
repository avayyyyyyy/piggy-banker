export const Currencies = [
  { value: "INR", label: "₹ Rupee", locale: "en-IN", symbol: "₹" },
  { value: "USD", label: "$ Dollar", locale: "en-US", symbol: "$" },
  { value: "EUR", label: "€ Euro", locale: "de-DE", symbol: "€" },
  { value: "JPY", label: "¥ Yen", locale: "ja-JP", symbol: "¥" },
  { value: "GBP", label: "£ Pound", locale: "en-GB", symbol: "£" },
];

export type Currency = (typeof Currencies)[0];
