export interface PunctualityPoint {
  date: string
  punctualityPct: number
}

// Attempts to fetch a CSV time series from GitHub raw. You can override via env var GITHUB_PUNCTUALITY_URL.
export async function fetchPunctualitySeries(): Promise<PunctualityPoint[]> {
  const url = process.env.NEXT_PUBLIC_GITHUB_PUNCTUALITY_URL ||
    'https://raw.githubusercontent.com/piebro/deutsche-bahn-data/main/derived/punctuality_monthly.csv'

  try {
    const res = await fetch(url, { next: { revalidate: 60 * 60 } })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const text = await res.text()
    // Expect CSV with headers: date,punctuality_pct
    const lines = text.trim().split(/\r?\n/)
    const header = lines.shift() || ''
    const dateIdx = header.split(',').findIndex(h => /date/i.test(h))
    const pctIdx = header.split(',').findIndex(h => /(punctual|on_time)/i.test(h))
    if (dateIdx < 0 || pctIdx < 0) throw new Error('Unexpected CSV header')
    const data: PunctualityPoint[] = lines.map(line => {
      const cols = line.split(',')
      return {
        date: cols[dateIdx],
        punctualityPct: Number(cols[pctIdx])
      }
    }).filter(p => Number.isFinite(p.punctualityPct))
    return data
  } catch {
    // Fallback sample matching our UI
    return [
      { date: '2024-01', punctualityPct: 73.1 },
      { date: '2024-02', punctualityPct: 74.0 },
      { date: '2024-03', punctualityPct: 74.6 },
      { date: '2024-04', punctualityPct: 75.2 },
    ]
  }
}



