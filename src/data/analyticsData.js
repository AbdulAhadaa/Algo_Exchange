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


// src/data/sampleEquityData.js

// export const generateSampleEquity = (length = 24, interval = "weekly") => {
//   const data = []
//   const today = new Date()
//   let equity = 10000

//   const stepDays = interval === "monthly" ? 30 : 7

//   for (let i = length - 1; i >= 0; i--) {
//     const date = new Date(today)
//     date.setDate(today.getDate() - i * stepDays)

//     // More realistic PnL swings
//     const maxChange = interval === "monthly" ? 800 : 300
//     const dailyChange = (Math.random() - 0.5) * maxChange
//     equity += dailyChange

//     data.push({
//       date: date.toISOString().split("T")[0],
//       equity: Math.max(0, equity),
//     })
//   }

//   return data
// }

// export const sampleStrategies = {
//   "Strategy A": generateSampleEquity(24, "weekly"),  // ~6 months
//   "Strategy B": generateSampleEquity(12, "monthly"), // 1 year
//   "Strategy C": generateSampleEquity(36, "weekly"),  // ~9 months
// }

