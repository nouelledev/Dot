'use client'

import { useEffect, useRef, useState } from "react";
import getData from "./api/GetCryptoInfo";

type coin = {
  symbol: string;
  price: number;
};
export default function Page() {
  const [coins, setCoins] = useState(['BTCUSDT', 'ETHUSDT', 'BNBUSDT']);
  const [coinData, setCoinData] = useState<coin[]>([]);
  const [oldCoinData, setOldCoinData] = useState<coin[]>([]);

  useEffect(() => {
    setTimeout(() => {
      const getCoinData = async () => {
        setOldCoinData(coinData);
        const data = await getData(coins);
        setCoinData(data);
      };
      getCoinData();
    }, 5000);
  });

  const getOldCoin = (symbol: string) => {
    return oldCoinData.find(c => c.symbol === symbol) ?? { symbol: symbol, price: 0 };
  };

  const getCoinColor = (symbol: string) => {
    const oldCoin = getOldCoin(symbol);
    const newCoin = coinData.find(c => c.symbol === symbol) ?? { symbol: symbol, price: 0 };
    return oldCoin.price > newCoin.price ? 'text-red' : 'text-green';
  };

  const getCoinDiff = (symbol: string) => {
    const oldCoin = getOldCoin(symbol);
    const newCoin = coinData.find(c => c.symbol === symbol) ?? { symbol: symbol, price: 0 };
    return oldCoin.price - newCoin.price;
  };

  const getCoinPricePercentage = (symbol: string) => {
    const oldCoin = getOldCoin(symbol);
    const newCoin = coinData.find(c => c.symbol === symbol) ?? { symbol: symbol, price: 0 };
    return (oldCoin.price - newCoin.price) / oldCoin.price;
  };

  const [items, setItems] = useState<string>('');
  const handleChange = (e: any) => {
    setItems(e.target.value);
  };

  return (
    <main className="flex flex-col gap-5">
      <textarea className="h-12" value={items} onChange={handleChange}></textarea>
      <button className="bg-white" onClick={() => {
        setCoins(items.trim().split('\n'));
      }}>CHECK PRICE</button>
      {
        coinData.map((coin) => (
          <div className="flex flex-row gap-2" key={coin.symbol}>
            <h2 className="font-bold text-white">{coin.symbol}</h2>
            <p className={`${getCoinColor(coin.symbol)}`}>Current Price: {coin.price}</p>
            <p className={`${getCoinColor(coin.symbol)}`}>Price Diff: {getCoinDiff(coin.symbol).toFixed(5)}</p>
            <p className={`${getCoinColor(coin.symbol)}`}>Percentage: {getCoinPricePercentage(coin.symbol).toFixed(5)}%</p>
          </div>
        ))
      }
    </main >
  );
}
