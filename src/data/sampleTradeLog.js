// src/data/sampleTradeLog.js
export const sampleTradeLog = [
  {
    id: 1,
    broker: "IBKR",
    symbol: "AAPL",
    timestamp: "2025-06-01T10:30:00Z",
    side: "BTO",
    quantity: 100,
    entryPrice: 145.25,
    exitPrice: 150.12,
    pnl: 487,
    drawdown: 1.8,
    fills: [
      { qty: 50, price: 145.10, time: "10:30:05" },
      { qty: 50, price: 145.40, time: "10:30:10" },
    ],
  },
  {
    id: 2,
    broker: "Tradovate",
    symbol: "TSLA",
    timestamp: "2025-06-02T14:15:00Z",
    side: "STO",
    quantity: 75,
    entryPrice: 250.10,
    exitPrice: 248.75,
    pnl: 101.25,
    drawdown: 2.3,
    fills: [
      { qty: 25, price: 250.00, time: "14:15:10" },
      { qty: 50, price: 250.20, time: "14:15:25" },
    ],
  },
  {
    id: 3,
    broker: "AMP",
    symbol: "MSFT",
    timestamp: "2025-06-03T11:50:00Z",
    side: "BTO",
    quantity: 150,
    entryPrice: 75.00,
    exitPrice: 72.40,
    pnl: -390,
    drawdown: 4.5,
    fills: [
      { qty: 100, price: 75.10, time: "11:50:05" },
      { qty: 50, price: 74.90, time: "11:50:12" },
    ],
  },
  {
    id: 4,
    broker: "IBKR",
    symbol: "NVDA",
    timestamp: "2025-06-04T09:00:00Z",
    side: "STO",
    quantity: 50,
    entryPrice: 320.00,
    exitPrice: 325.50,
    pnl: -275,
    drawdown: 3.2,
    fills: [
      { qty: 50, price: 320.00, time: "09:00:05" },
    ],
  },
  {
    id: 5,
    broker: "Tradovate",
    symbol: "META",
    timestamp: "2025-06-05T16:10:00Z",
    side: "BTO",
    quantity: 200,
    entryPrice: 99.90,
    exitPrice: 103.00,
    pnl: 620,
    drawdown: 2.1,
    fills: [
      { qty: 100, price: 99.85, time: "16:10:10" },
      { qty: 100, price: 99.95, time: "16:10:20" },
    ],
  },
  {
    id: 6,
    broker: "AMP",
    symbol: "GOOGL",
    timestamp: "2025-06-06T13:45:00Z",
    side: "STO",
    quantity: 80,
    entryPrice: 410.75,
    exitPrice: 412.60,
    pnl: -148,
    drawdown: 1.6,
    fills: [
      { qty: 40, price: 410.80, time: "13:45:05" },
      { qty: 40, price: 410.70, time: "13:45:09" },
    ],
  },
  {
    id: 7,
    broker: "IBKR",
    symbol: "AMZN",
    timestamp: "2025-06-07T10:05:00Z",
    side: "BTO",
    quantity: 60,
    entryPrice: 60.00,
    exitPrice: 63.50,
    pnl: 210,
    drawdown: 0.9,
    fills: [
      { qty: 30, price: 60.00, time: "10:05:10" },
      { qty: 30, price: 60.05, time: "10:05:15" },
    ],
  },
  {
    id: 8,
    broker: "Tradovate",
    symbol: "NFLX",
    timestamp: "2025-06-08T15:25:00Z",
    side: "STO",
    quantity: 90,
    entryPrice: 150.60,
    exitPrice: 149.20,
    pnl: 126,
    drawdown: 2.9,
    fills: [
      { qty: 90, price: 150.60, time: "15:25:05" },
    ],
  },
  {
    id: 9,
    broker: "AMP",
    symbol: "AMD",
    timestamp: "2025-06-09T11:15:00Z",
    side: "BTO",
    quantity: 110,
    entryPrice: 290.00,
    exitPrice: 289.00,
    pnl: -110,
    drawdown: 1.2,
    fills: [
      { qty: 60, price: 290.00, time: "11:15:10" },
      { qty: 50, price: 289.95, time: "11:15:18" },
    ],
  },
  {
    id: 10,
    broker: "IBKR",
    symbol: "TSM",
    timestamp: "2025-06-10T12:40:00Z",
    side: "STO",
    quantity: 70,
    entryPrice: 180.00,
    exitPrice: 177.50,
    pnl: 175,
    drawdown: 0.8,
    fills: [
      { qty: 35, price: 180.00, time: "12:40:05" },
      { qty: 35, price: 180.05, time: "12:40:12" },
    ],
  },
]
