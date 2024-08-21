export function getCountryEmoji(
  countryCode: string | null | undefined,
): string {
  if (!countryCode) return "🌐"; // Default globe emoji for undefined or null
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}
