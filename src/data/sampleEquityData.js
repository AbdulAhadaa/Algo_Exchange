export const sampleEquityData = Array.from({ length: 365 }, (_, i) => {
  const date = new Date()
  date.setDate(date.getDate() - i)

  return {
    date: date.toISOString().slice(0, 10),
    equity: 10000 + i * (Math.random() * 50 - 25), // Simulates gains/losses
  }
}).reverse()
