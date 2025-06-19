// src/data/sampleEquityData.js

export const generateSampleEquity = (length = 90) => {
  const data = []
  const today = new Date()
  let equity = 10000

  for (let i = length - 1; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(today.getDate() - i)

    const dailyChange = (Math.random() - 0.5) * 200
    equity += dailyChange

    data.push({
      date: date.toISOString().split("T")[0],
      equity: Math.max(0, equity),
    })
  }

  return data
}

export const sampleStrategies = {
  "Momentum Strategy": generateSampleEquity(380),
  "Mean Reversion Strategy": generateSampleEquity(380),
  "Breakout Strategy": generateSampleEquity(380),
  "Swing Strategy": generateSampleEquity(380),
  "Scalping Strategy": generateSampleEquity(380)
  
}
