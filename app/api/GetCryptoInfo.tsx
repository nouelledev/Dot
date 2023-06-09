export default async function getData(symbols: string[]) {
  const res = await fetch(
    `https://data-api.binance.vision/api/v3/ticker/price?symbols=${JSON.stringify(
      symbols
    )}`
  );
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
  console.log(res);
}
