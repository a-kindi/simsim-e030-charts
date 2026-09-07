/**
 * Sample card graphic (US-075, 75.4.2 / 75.6.3). Not a chart: ten 12px squares, 6px apart, as plain divs.
 * With a filter active, the filled squares are the slice's share of the corpus; unfiltered reads light; empty reads soft.
 */
const COUNT = 10

export function SampleSquares({ inSlice, corpus, filtered }: { inSlice: number; corpus: number; filtered: boolean }) {
  const filled = corpus === 0 ? 0 : Math.round((inSlice / corpus) * COUNT)
  const color = (i: number) => (inSlice === 0 ? 'var(--color-soft)' : filtered && i < filled ? 'var(--color-indigo)' : 'var(--color-indigo-light)')
  return (
    <div style={{ display: 'flex', gap: 6 }} aria-hidden>
      {Array.from({ length: COUNT }, (_, i) => <div key={i} style={{ width: 12, height: 12, background: color(i) }} />)}
    </div>
  )
}
