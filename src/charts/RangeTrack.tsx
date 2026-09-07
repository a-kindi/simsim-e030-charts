/**
 * Metric card range line (US-076, 76.1.3). Not a chart: a 292×4 track with the first-run to latest span and two dots,
 * as plain divs, exactly as the Paper board draws it. Scale 60 → 100 across the track.
 */
export function RangeTrack({ first, latest, width = 292, min = 60, max = 100 }: { first: number; latest: number; width?: number; min?: number; max?: number }) {
  const x = (v: number) => ((v - min) / (max - min)) * width
  const [a, b] = [x(first), x(latest)].sort((p, q) => p - q)
  return (
    <div style={{ position: 'relative', width, height: 4, background: 'var(--color-soft)', borderRadius: 2 }} aria-hidden>
      <div style={{ position: 'absolute', left: a, width: b - a, height: 4, background: 'var(--color-indigo)', borderRadius: 2 }} />
      <div style={{ position: 'absolute', left: x(first) - 4, top: -2, width: 8, height: 8, borderRadius: 4, background: '#FFFFFF', border: '2px solid var(--color-indigo)' }} />
      <div style={{ position: 'absolute', left: x(latest) - 4, top: -2, width: 8, height: 8, borderRadius: 4, background: 'var(--color-indigo)' }} />
    </div>
  )
}
