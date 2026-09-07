/**
 * ECharts setup shared by every chart: tree-shaken registration, the SimSim theme built from the skin tokens,
 * and a React hook that mounts a chart in a fixed-size div and re-applies the option when it changes.
 *
 * Renderer: SVG, so text stays crisp and matches the HTML around it.
 * Register here every series and component a chart uses; tree-shaking drops the rest of ECharts.
 */
import { use, init, registerTheme, type EChartsCoreOption, type ECharts } from 'echarts/core'
import { PictorialBarChart, LineChart, HeatmapChart } from 'echarts/charts'
import { GridComponent, VisualMapComponent, MarkPointComponent, TooltipComponent } from 'echarts/components'
import { SVGRenderer } from 'echarts/renderers'
import { useEffect, useRef } from 'react'

use([PictorialBarChart, LineChart, HeatmapChart, GridComponent, VisualMapComponent, MarkPointComponent, TooltipComponent, SVGRenderer])

/** Skin tokens as values: ECharts takes colours in the option, not CSS variables. Read them once from the stylesheet. */
const css = getComputedStyle(document.documentElement)
export const T = {
  paper: css.getPropertyValue('--color-paper').trim() || '#FBFAF6',
  weakHalf: css.getPropertyValue('--color-weak-half').trim() || '#F9F8F3',
  soft: css.getPropertyValue('--color-soft').trim() || '#EFEDE6',
  ink: css.getPropertyValue('--color-ink').trim() || '#171A21',
  inkSub: css.getPropertyValue('--color-ink-sub').trim() || '#6A675E',
  inkSoft: css.getPropertyValue('--color-ink-soft').trim() || '#A9A598',
  strokeSoft: css.getPropertyValue('--color-stroke-soft').trim() || '#E3E0D8',
  indigo: css.getPropertyValue('--color-indigo').trim() || '#1E40AF',
  indigoMid: css.getPropertyValue('--color-indigo-mid').trim() || '#4F6BC4',
  indigoLight: css.getPropertyValue('--color-indigo-light').trim() || '#C9D5F5',
  indigoLighter: css.getPropertyValue('--color-indigo-lighter').trim() || '#E8EDFB',
  flag: css.getPropertyValue('--color-flag').trim() || '#B45309',
  flagDark: css.getPropertyValue('--color-flag-dark').trim() || '#7C3A06',
  flagLight: css.getPropertyValue('--color-flag-light').trim() || '#EED4B8',
  flagLighter: css.getPropertyValue('--color-flag-lighter').trim() || '#F7EAD9',
  font: 'Figtree, system-ui, sans-serif',
}

registerTheme('simsim', {
  color: [T.indigo, T.flag],
  backgroundColor: 'transparent',
  textStyle: { fontFamily: T.font, fontSize: 11, color: T.inkSub },
  categoryAxis: { axisLine: { show: false }, axisTick: { show: false }, axisLabel: { color: T.inkSub, fontFamily: T.font, fontSize: 11 }, splitLine: { show: false } },
  valueAxis: { axisLine: { show: false }, axisTick: { show: false }, axisLabel: { color: T.inkSoft, fontFamily: T.font, fontSize: 11 }, splitLine: { lineStyle: { color: T.strokeSoft } } },
  tooltip: { backgroundColor: T.ink, borderWidth: 0, textStyle: { color: '#FFFFFF', fontFamily: T.font, fontSize: 12 }, padding: [6, 10] },
})

/** Mount an ECharts instance in a div of the given size and keep it in sync with `option`. */
export function useECharts(option: EChartsCoreOption, width: number, height: number, onReady?: (chart: ECharts) => void) {
  const ref = useRef<HTMLDivElement>(null)
  const chart = useRef<ECharts | null>(null)
  useEffect(() => {
    if (!ref.current) return
    chart.current ??= init(ref.current, 'simsim', { renderer: 'svg', width, height })
    chart.current.setOption(option, true)
    onReady?.(chart.current)
  }, [option, width, height, onReady])
  useEffect(() => () => { chart.current?.dispose(); chart.current = null }, [])
  return ref
}
