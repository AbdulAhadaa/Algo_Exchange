// src/utils/csvParser.js
export const parseCSVtoROI = (csvText) => {
  const rows = csvText.trim().split("\n")
  const [header, ...dataRows] = rows
  const yearData = {}

  dataRows.forEach((row) => {
    const [year, month, roiStr] = row.split(",")
    const roi = parseFloat(roiStr)

    if (!yearData[year]) yearData[year] = {}
    yearData[year][month] = roi
  })

  return yearData
}
