"use client";
import React, { FC } from "react";

/** 
 * Define props for the entire page (optional if you don't need them)
 */
interface ArbitrageTradingPageProps {}

/**
 * Main Page Component
 */
const ArbitrageTradingPage: FC<ArbitrageTradingPageProps> = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Page Title */}
        <h1 className="text-2xl font-bold mt-4">Arbitrage Trading</h1>

        {/* Trading Settings */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h2 className="text-2xl font-semibold mb-4">Trading Settings</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Minimum Profit Threshold */}
            <div>
              <label className="block mb-1 text-sm font-medium">
                Minimum Profit Threshold (%)
              </label>
              <input
                type="number"
                placeholder="0.2"
                className="block w-full rounded-md bg-gray-800 text-white p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Trade Amount */}
            <div>
              <label className="block mb-1 text-sm font-medium">
                Trade Amount (ETH)
              </label>
              <input
                type="number"
                placeholder="0.1"
                className="block w-full rounded-md bg-gray-700 text-white p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Balances */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h2 className="text-2xl font-semibold mb-4">Your Balances</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
            {/* Sample balances (replace with dynamic data if needed) */}
            <BalanceCard symbol="ETH" amount="99999.9976" />
            <BalanceCard symbol="WETH" amount="0.0000" />
            <BalanceCard symbol="USDT" amount="0.0000" />
            <BalanceCard symbol="USDC" amount="0.0000" />
            <BalanceCard symbol="DAI" amount="0.0000" />
            <BalanceCard symbol="WBTC" amount="0.0000" />
            <BalanceCard symbol="UNI" amount="0.0000" />
            <BalanceCard symbol="LINK" amount="0.0000" />
            <BalanceCard symbol="AAVE" amount="0.0000" />
            <BalanceCard symbol="SUSHI" amount="0.0000" />
          </div>
        </div>

        {/* Price Monitor */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h2 className="text-2xl font-semibold mb-4">Price Monitor</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Example token listings with prices from different exchanges */}
            <PriceMonitorCard
              token="USDT"
              exchanges={[
                { name: "Uniswap V2", price: "$2,830.14" },
                { name: "SushiSwap", price: "$2,816.51" },
              ]}
            />
            <PriceMonitorCard
              token="USDC"
              exchanges={[
                { name: "Uniswap V2", price: "$2,820.00" },
                { name: "SushiSwap", price: "$2,823.00" },
              ]}
            />
            <PriceMonitorCard
              token="DAI"
              exchanges={[
                { name: "Uniswap V2", price: "$2,806.74" },
                { name: "SushiSwap", price: "$2,812.71" },
              ]}
            />
            <PriceMonitorCard
              token="WBTC"
              exchanges={[
                { name: "Uniswap V2", price: "$90.05" },
                { name: "SushiSwap", price: "$89.85" },
              ]}
            />
            <PriceMonitorCard
              token="UNI"
              exchanges={[
                { name: "Uniswap V2", price: "$68.23" },
                { name: "SushiSwap", price: "$69.25" },
              ]}
            />
            <PriceMonitorCard
              token="LINK"
              exchanges={[
                { name: "Uniswap V2", price: "$73.05" },
                { name: "SushiSwap", price: "$72.90" },
              ]}
            />
          </div>
        </div>

        {/* Potential Profits / Trades Section */}
        <div className="bg-gray-800 rounded-lg p-4">
          {/* Example profitable trade */}
          <div className="mb-6">
            <p className="text-green-500 font-semibold text-sm mb-2">
              0.21% potential profit
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div>
                <p className="font-bold">DAI</p>
                <p className="text-sm">Buy from Uniswap V2 @ $2,806.74</p>
              </div>
              <div>
                <p>Sell on SushiSwap @ $2,812.71</p>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors">
                Execute Trade
              </button>
            </div>
          </div>

          {/* Example insufficient profit trade */}
          <div>
            <p className="text-yellow-500 font-semibold text-sm mb-2">
              Insufficient Profit
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div>
                <p className="font-bold">USDT</p>
                <p className="text-sm">Buy from SushiSwap @ $2,816.51</p>
              </div>
              <div>
                <p>Sell on Uniswap V2 @ $2,820.00</p>
              </div>
              <button
                disabled
                className="bg-gray-500 text-white font-semibold py-2 px-4 rounded-md cursor-not-allowed"
              >
                Insufficient Profit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArbitrageTradingPage;

/**
 * Props for the BalanceCard component
 */
interface BalanceCardProps {
  symbol: string;
  amount: string;
}

/**
 * Reusable card for displaying a token's symbol and balance
 */
const BalanceCard: FC<BalanceCardProps> = ({ symbol, amount }) => {
  return (
    <div className="bg-gray-700 rounded p-3 flex flex-col space-y-1">
      <p className="font-semibold">{symbol}</p>
      <p className="text-sm">{amount}</p>
    </div>
  );
};

/**
 * Exchange data for PriceMonitorCard
 */
interface Exchange {
  name: string;
  price: string;
}

/**
 * Props for the PriceMonitorCard component
 */
interface PriceMonitorCardProps {
  token: string;
  exchanges: Exchange[];
}

/**
 * Reusable card for displaying a token and multiple exchange prices
 */
const PriceMonitorCard: FC<PriceMonitorCardProps> = ({ token, exchanges }) => {
  return (
    <div className="bg-gray-700 rounded p-4">
      <h3 className="text-lg font-bold mb-1">{token}</h3>
      <p className="text-xs text-gray-300">{exchanges.length} exchanges</p>
      <div className="mt-2 space-y-1">
        {exchanges.map((ex, idx) => (
          <p key={idx} className="text-sm">
            <span className="font-semibold">{ex.name}:</span> {ex.price}
          </p>
        ))}
      </div>
    </div>
  );
};
