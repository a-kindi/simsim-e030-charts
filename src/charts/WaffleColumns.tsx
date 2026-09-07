/**
 * Improvement card graphic (US-075, 75.2.3 / 75.2.5 / 75.2.6).
 * ECharts series: `pictorialBar` with `symbolRepeat`. A repeated 10×4 rectangle with a 1px margin is one point.
 * Layering: the total column is drawn first in the accent colour, the kept history is drawn on top in light,
 * so the squares above the history line show the last run's share. A loss in the last run flips the accent to flag.
 * A net decline uses negative values; pictorialBar hangs them below the axis line, which stands in for the baseline.
 *
 * Paper spec: 76×44, columns 10px wide at 20px steps, squares 4px tall with a 1px gap (5px per point).
 */
import { useMemo } from 'react'
import { useECharts, T } from './echarts'

const W = 76, H = 45 // 9 points × 5px

export function WaffleColumns({ gains }: { gains: number[] }) {
  const option = useMemo(() => {
    const n = gains.length, last = gains[n - 1], prev = gains[n - 2] ?? 0
    const declined = gains.some(g => g < 0)
    const lostInLastRun = Math.max(0, prev - last)
    const accent = lostInLastRun > 0 ? T.flag : T.indigo
    const history = declined ? T.flagLight : T.indigoLight
    // Series 1 (under): the full column, accent. Series 2 (over): the kept part, light. Order in the array is draw order.
    const under = gains.map((g, i) => (i === n - 1 ? (declined ? Math.min(prev, last) : Math.max(g, prev)) : g))
    const over = gains.map((g, i) => (i === n - 1 ? (declined ? Math.max(prev, last) : Math.min(g, prev)) : g))
    const pictorial = (data: number[], color: string, z: number) => ({
      type: 'pictorialBar', data, z, symbol: 'rect', symbolSize: [10, 4], symbolMargin: 1, symbolRepeat: true, symbolClip: true,
      barCategoryGap: 0, itemStyle: { color }, silent: true,
    })
    return {
      animation: false,
      grid: { left: -2, right: -2, top: 0, bottom: 0 }, // 80px over 4 runs = 20px per column, centres at 8, 28, 48, 68
      xAxis: { type: 'category', data: gains.map((_, i) => i), show: declined, position: 'top', axisLine: { show: declined, lineStyle: { color: T.strokeSoft, width: 2 } }, axisLabel: { show: false }, axisTick: { show: false } },
      yAxis: { type: 'value', show: false, min: declined ? -9 : 0, max: declined ? 0 : 9 },
      series: [pictorial(under, accent, 1), pictorial(over, history, 2)],
    }
  }, [gains])
  const ref = useECharts(option, W, H)
  return <div ref={ref} style={{ width: W, height: H }} aria-hidden />
}
