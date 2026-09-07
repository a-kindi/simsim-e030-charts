/**
 * Heatmap view (US-071 71.3, parked).
 * ECharts series: `heatmap` on two category axes, coloured by a piecewise `visualMap` with the five score bands.
 * The visualMap also draws the legend. Row names truncate with `axisLabel.overflow: 'truncate'`.
 * Paper spec: 517×384; cells 86×28 with a 6px column gap and a 3px row gap, radius 3; run labels on top.
 * Paper's header band behind the run labels is not an ECharts feature; the axis labels sit on the card instead.
 */
import { useMemo } from 'react'
import { useECharts, T } from './echarts'
import { bands, bandFor } from '../data'

const W = 517, H = 384
export type HeatRow = { name: string; scores: number[] }

export function Heatmap({ runs, rows }: { runs: readonly string[]; rows: HeatRow[] }) {
  const option = useMemo(() => ({
    animation: false,
    grid: { left: 155, right: 0, top: 30, bottom: 44 },
    xAxis: { type: 'category', position: 'top', data: [...runs], axisLabel: { margin: 12, color: T.inkSub } },
    yAxis: { type: 'category', inverse: true, data: rows.map(r => r.name), axisLabel: { color: T.ink, width: 140, overflow: 'truncate', margin: 147, align: 'left' } },
    visualMap: {
      type: 'piecewise', orient: 'horizontal', right: 0, bottom: 0, inverse: true, itemWidth: 12, itemHeight: 12, itemGap: 10, itemSymbol: 'roundRect',
      textStyle: { color: T.inkSub, fontSize: 11 }, selectedMode: false,
      pieces: [
        { min: 95, max: 100, label: bands[0].label, color: css(bands[0].fill) },
        { min: 90, max: 94.99, label: bands[1].label, color: css(bands[1].fill) },
        { min: 85, max: 89.99, label: bands[2].label, color: css(bands[2].fill) },
        { min: 80, max: 84.99, label: bands[3].label, color: css(bands[3].fill) },
        { min: 0, max: 79.99, label: bands[4].label, color: css(bands[4].fill) },
      ],
    },
    tooltip: { formatter: (p: { value: [number, number, number] }) => `${rows[p.value[1]].name} · ${runs[p.value[0]]}: ${p.value[2].toFixed(1)}` },
    series: [{ type: 'heatmap', itemStyle: { borderRadius: 3, borderColor: T.paper, borderWidth: 1.5 },
      label: { show: true, fontSize: 11, fontFamily: T.font, formatter: (p: { value: [number, number, number] }) => p.value[2].toFixed(1) },
      data: rows.flatMap((r, y) => r.scores.map((v, x) => ({ value: [x, y, v], label: { color: css(bandFor(v).text) } }))),
    }],
  }), [runs, rows])
  const ref = useECharts(option, W, H)
  return <div ref={ref} style={{ width: W, height: H }} role="img" aria-label="Accuracy heatmap" />
}

/** Resolve a `var(--token)` string to its value; ECharts needs literal colours. */
function css(v: string) {
  const m = v.match(/var\((--[\w-]+)\)/)
  return m ? getComputedStyle(document.documentElement).getPropertyValue(m[1]).trim() : v
}
