
export const sampleEquityData = Array.from({ length: 200 }, (_, i) => {
  const date = new Date()
  date.setDate(date.getDate() - i)

  return {
    date: date.toISOString().slice(0, 10),
    equity: 10000 + i * (Math.random() * 50 - 25), // Simulates gains/losses
  }
}).reverse()// src/utils/generateSampleMultiStrategyEquityData.js

export function generateSampleMultiStrategyEquityData() {
  const strategies = ["Strategy A", "Strategy B", "Strategy C"]
  const brokers = ["IBKR", "Tradovate", "AMP"]
  const tickers = ["ES", "AAPL", "BTCUSD"]
  const days = 365 // one year of data

  const data = []

  const today = new Date()

  strategies.forEach((strategy) => {
    brokers.forEach((broker) => {
      tickers.forEach((ticker) => {
        let equity = 10000

        for (let i = days; i >= 0; i--) {
          const date = new Date(today)
          date.setDate(today.getDate() - i)

          // Simulate some equity curve fluctuation
          const change = (Math.random() - 0.5) * 200
          equity = Math.max(5000, equity + change) // prevent negative equity

          data.push({
            strategy,
            broker,
            ticker,
            date: date.toISOString().split("T")[0], // format YYYY-MM-DD
            equity: parseFloat(equity.toFixed(2))
          })
        }
      })
    })
  })

  return data
}

