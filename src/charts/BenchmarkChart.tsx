/**
 * Accuracy by benchmark (US-071, 71.1 / 71.2).
 * ECharts series: three `line` series on one category axis.
 *   1. weakest, stacked, invisible: the floor of the band.
 *   2. best − weakest, stacked on it, area filled: the band. (ECharts has no "area between two lines"; a stacked
 *      transparent base plus a filled top is the documented way.)
 *   3. mean, `step: 'end'`, with a label on every point and a stronger label on the last.
 * `markPoint` carries the "best" and "weakest" captions at the last run.
 *
 * Paper spec: 517×384; y from 60 to 100 with a gridline every 10; runs at x = 100, 230, 360, 490.
 */
import { useMemo } from 'react'
import { useECharts, T } from './echarts'

const W = 517, H = 384
const pinTooltip = new URLSearchParams(location.search).has('tip') ? (c: import('echarts/core').ECharts) => c.dispatchAction({ type: 'showTip', seriesIndex: 2, dataIndex: 3 }) : undefined
export type BenchmarkPoint = { run: string; mean: number; best: number; weakest: number }

export function BenchmarkChart({ data }: { data: BenchmarkPoint[] }) {
  const option = useMemo(() => {
    const last = data[data.length - 1]
    return {
      animation: false,
      grid: { left: 100, right: 27, top: 16, bottom: 56 },
      xAxis: { type: 'category', boundaryGap: false, data: data.map(d => d.run), axisLabel: { margin: 24, color: T.inkSub } },
      yAxis: { type: 'value', min: 60, max: 100, interval: 10, axisLabel: { margin: 10 } },
      tooltip: { trigger: 'axis', formatter: (ps: { name: string }[]) => { const d = data.find(x => x.run === ps[0].name)!; return `${d.run}<br/>mean ${d.mean} · best ${d.best} · weakest ${d.weakest}` } },
      series: [
        { type: 'line', name: 'floor', stack: 'band', step: 'end', data: data.map(d => d.weakest), lineStyle: { opacity: 0 }, symbol: 'none', silent: true, tooltip: { show: false } },
        { type: 'line', name: 'band', stack: 'band', step: 'end', data: data.map(d => d.best - d.weakest), lineStyle: { opacity: 0 }, symbol: 'none', silent: true, tooltip: { show: false },
          areaStyle: { color: T.indigoLighter, opacity: 0.8 } },
        { type: 'line', name: 'mean', step: 'end', data: data.map((d, i) => ({
            value: d.mean,
            label: i === data.length - 1 ? { formatter: `${d.mean}%`, fontSize: 12, fontWeight: 600, color: T.ink } : {},
          })),
          lineStyle: { color: T.indigo, width: 1.5 }, itemStyle: { color: T.indigo }, symbol: 'circle', symbolSize: 7,
          label: { show: true, position: 'top', distance: 6, color: T.inkSub, fontSize: 11, fontFamily: T.font },
          markPoint: { symbol: 'circle', symbolSize: 0, silent: true, label: { color: T.inkSoft, fontSize: 11, fontFamily: T.font, position: 'left', offset: [6, 0] },
            data: [
              { coord: [last.run, last.best], value: `best ${last.best}`, label: { position: 'left', offset: [6, -12] } },
              { coord: [last.run, last.weakest], value: `weakest ${last.weakest}`, label: { position: 'left', offset: [6, 12] } },
            ] },
        },
      ],
    }
  }, [data])
  // Showcase only: `?tip` pins the tooltip on the last run so the treatment can be screenshotted.
  const ref = useECharts(option, W, H, pinTooltip)
  return <div ref={ref} style={{ width: W, height: H }} role="img" aria-label="Accuracy by benchmark" />
}
