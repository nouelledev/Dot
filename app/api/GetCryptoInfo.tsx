export default async function getData(symbols: string[]) {
  const url = `https://data-api.binance.vision/api/v3/ticker/price?symbols=${JSON.stringify(symbols)}`;
  const res = await fetch(url);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
