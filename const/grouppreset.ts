/**
 * GROUP_PRESETS maps each groupId (as a string) to its default admin fee,
 * user profit, introducer fee, and allowed trading amounts.
 *
 * Adjust the values below to exactly match your spreadsheet.
 */
const GROUP_PRESETS: Record<
  string,
  {
    adminFee: number;
    userProfit: number;
    introducerFee: number;
    allowedTradingAmountFrom: number;
    allowedTradingAmountTo: number | string;
  }
> = {
  "1": { // VIP
    adminFee: 10,
    userProfit: 90,
    introducerFee: 0,
    allowedTradingAmountFrom: 1,
    allowedTradingAmountTo: "Unlimited",
  },
  "2": { // TRADER 50
    adminFee: 50,
    userProfit: 50,
    introducerFee: 0,
    allowedTradingAmountFrom: 5,
    allowedTradingAmountTo: 5000,
  },
  "3": { // TRADER 40
    adminFee: 60,
    userProfit: 40,
    introducerFee: 0,
    allowedTradingAmountFrom: 5,
    allowedTradingAmountTo: 5000,
  },
  "4": { // TRADER 30
    adminFee: 70,
    userProfit: 30,
    introducerFee: 0,
    allowedTradingAmountFrom: 5,
    allowedTradingAmountTo: 5000,
  },
  "5": { // TRADER 25
    adminFee: 75,
    userProfit: 25,
    introducerFee: 0,
    allowedTradingAmountFrom: 5,
    allowedTradingAmountTo: 5000,
  },
  "6": { // TRADER 20
    adminFee: 80,
    userProfit: 20,
    introducerFee: 0,
    allowedTradingAmountFrom: 5,
    allowedTradingAmountTo: 5000,
  },
  "7": { // TRADER 15
    adminFee: 85,
    userProfit: 15,
    introducerFee: 0,
    allowedTradingAmountFrom: 5,
    allowedTradingAmountTo: 5000,
  },
  "8": { // TRADER 10
    adminFee: 90,
    userProfit: 10,
    introducerFee: 0,
    allowedTradingAmountFrom: 5,
    allowedTradingAmountTo: 5000,
  },
  "9": { // TRADER 5
    adminFee: 95,
    userProfit: 5,
    introducerFee: 0,
    allowedTradingAmountFrom: 5,
    allowedTradingAmountTo: 5000,
  },
  "10": { // ROBOTS
    adminFee: 100,
    userProfit: 0,
    introducerFee: 0,
    allowedTradingAmountFrom: 1,
    allowedTradingAmountTo: "unlimited",
  },
  "11": { // WORKERS
    adminFee: 100,
    userProfit: 0,
    introducerFee: 0,
    allowedTradingAmountFrom: 1,
    allowedTradingAmountTo: "unlimited",
  },
  "12": { // HIGH
    adminFee: 75,
    userProfit: 25,
    introducerFee: 0,
    allowedTradingAmountFrom: 5,
    allowedTradingAmountTo: 5000,
  },
  "13": { // MEDIUM
    adminFee: 85,
    userProfit: 15,
    introducerFee: 0,
    allowedTradingAmountFrom: 5,
    allowedTradingAmountTo: 5000,
  },
  "14": { // LOW
    adminFee: 95,
    userProfit: 5,
    introducerFee: 0,
    allowedTradingAmountFrom: 5,
    allowedTradingAmountTo: 5000,
  },
};

export default GROUP_PRESETS;
