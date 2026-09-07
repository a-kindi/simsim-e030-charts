/* Mock numbers from the E030 Paper boards. The product reads these from the evaluation API. */

export const runs = ['8 Jul', '22 Jul', '9 Aug', '26 Aug'] as const
export type RunName = (typeof runs)[number]

/** Overlap mean, best and weakest filing per run (Accuracy by benchmark, US-071). */
export const benchmark = [
  { run: '8 Jul', mean: 80.9, best: 93.5, weakest: 62.1 },
  { run: '22 Jul', mean: 83.9, best: 95.0, weakest: 66.4 },
  { run: '9 Aug', mean: 86.4, best: 96.1, weakest: 68.5 },
  { run: '26 Aug', mean: 88.7, best: 97.2, weakest: 72.9 },
]

/** Cumulative points gained per run since the first run (Improvement card, US-075). */
export const improvement = {
  resting: { total: '+9.0', lastRun: '+3.4', gains: [1, 3, 6, 9] },
  dipped: { total: '+4.4', lastRun: '−1.2', gains: [1, 3, 6, 5] },
  decline: { total: '−2.8', lastRun: '−0.5', gains: [0, -1, -2, -3] },
}

/** Ten filings of the overlap with their accuracy on each run (Filings panel US-072, Heatmap 71.3). */
export const filings = [
  { name: 'Ooredoo Oman', id: 'GT-0005', scores: [93.5, 95.0, 96.1, 97.2] },
  { name: 'Energy Development Oman', id: 'GT-0021', scores: [92.4, 94.1, 96.0, 96.8] },
  { name: 'Oman Oil Marketing', id: 'GT-0001', scores: [91.0, 93.2, 94.7, 96.1] },
  { name: 'Masterpieces Muscat United', id: 'GT-0009', scores: [90.2, 92.5, 94.8, 95.4] },
  { name: 'Dhofar Generating', id: 'GT-0110', scores: [86.7, 89.9, 93.7, 94.9] },
  { name: 'Gulf Mushroom', id: 'GT-0105', scores: [78.2, 81.5, 84.4, 87.3] },
  { name: 'National Gas', id: 'GT-0053', scores: [76.9, 80.4, 83.7, 86.8] },
  { name: 'Al Aseel', id: 'GT-0372', scores: [72.8, 77.0, 81.6, 85.2] },
  { name: 'AICC', id: 'GT-0313', scores: [65.5, 68.9, 70.5, 74.5] },
  { name: 'Al Arabia', id: 'GT-0361', scores: [62.1, 66.4, 68.5, 72.9] },
]

/** Score bands (decision 16, placeholders). */
export const bands = [
  { min: 95, label: '95+', fill: 'var(--color-indigo)', text: '#FFFFFF' },
  { min: 90, label: '90–94.9', fill: 'var(--color-indigo-mid)', text: '#FFFFFF' },
  { min: 85, label: '85–89.9', fill: 'var(--color-indigo-light)', text: 'var(--color-ink)' },
  { min: 80, label: '80–84.9', fill: 'var(--color-indigo-lighter)', text: 'var(--color-ink)', stroke: 'var(--color-stroke-soft)' },
  { min: -Infinity, label: 'below 80', fill: 'var(--color-flag-lighter)', text: 'var(--color-flag-dark)', stroke: 'var(--color-flag-light)' },
]
export const bandFor = (v: number) => bands.find(b => v >= b.min)!
