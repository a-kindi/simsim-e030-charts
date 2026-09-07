/**
 * Filings row sparkline (US-072, 72.2.3).
 * ECharts series: one `line`, axes hidden, no symbols except a 4px circle on the last data item.
 * Paper spec: 88×18, 1.5px indigo line, dot on the last point. The y range is the row's own min–max (`scale: true`).
 */
import { useMemo } from 'react'
import { useECharts, T } from './echarts'

const W = 88, H = 18

export function Sparkline({ values }: { values: number[] }) {
  const option = useMemo(() => ({
    animation: false,
    grid: { left: 2, right: 2, top: 4, bottom: 4 },
    xAxis: { type: 'category', show: false, boundaryGap: false, data: values.map((_, i) => i) },
    yAxis: { type: 'value', show: false, min: Math.min(...values), max: Math.max(...values) },
    series: [{ type: 'line', data: values.map((v, i) => (i === values.length - 1 ? { value: v, symbol: 'circle', symbolSize: 4 } : v)),
      symbol: 'none', lineStyle: { color: T.indigo, width: 1.5 }, itemStyle: { color: T.indigo }, silent: true }],
  }), [values])
  const ref = useECharts(option, W, H)
  return <div ref={ref} style={{ width: W, height: H }} aria-hidden />
}
