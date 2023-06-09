import getData from "./api/GetCryptoInfo";

type coin = {
  symbol: string;
  price: number;
};
export default async function Page() {
  const data: coin[] = await getData(["BNBUSDT", "BTCUSDT", "ETHUSDT"]);
  console.log(data);
  return (
    <main>
      <h1 className="text-white">Tanga</h1>
    </main>
  );
}
