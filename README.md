# EP-030 charts in ECharts

Every graphic on the Simplified Evals Dashboard boards (Paper file "SimSim", page E030), built with Apache ECharts 6. This is the reference implementation to lift into simsim-product. It ships alongside the Paper boards: each board annotation names the file here that draws its graphic.

```
npm install
npm run dev        # showcase page at http://localhost:5173
```

## Which ECharts series each graphic uses

| Graphic | Story | File | ECharts |
| --- | --- | --- | --- |
| Improvement waffle columns | US-075 75.2, 75.3 | `src/charts/WaffleColumns.tsx` | `pictorialBar` with `symbolRepeat`, two series layered |
| Accuracy by benchmark | US-071 71.1, 71.2 | `src/charts/BenchmarkChart.tsx` | three `line` series: stacked transparent floor + stacked `areaStyle` band, and the mean with `step: 'end'`; `markPoint` for the captions |
| Filings sparkline | US-072 72.2.3 | `src/charts/Sparkline.tsx` | `line`, axes hidden, symbol on the last data item |
| Heatmap (parked) | US-071 71.3 | `src/charts/Heatmap.tsx` | `heatmap` with a piecewise `visualMap` (colours and legend) |
| Sample squares | US-075 75.4, 75.6 | `src/charts/SampleSquares.tsx` | not a chart: ten divs |
| Metric range track | US-076 76.1.3 | `src/charts/RangeTrack.tsx` | not a chart: four divs |

## How it is wired

`src/charts/echarts.ts` is the only file that touches ECharts directly. It registers the three series and four components the dashboard uses (tree-shaking drops the rest of the library), registers the `simsim` theme built from the skin tokens, and exports `useECharts(option, width, height)`, a hook that mounts a chart in a fixed-size div with the SVG renderer and re-applies the option when it changes. Each chart component builds its option with `useMemo` and calls that hook. No wrapper package is needed.

ECharts takes colours as values, not CSS variables, so the setup file reads the tokens off `:root` once at load. If the skin changes at runtime, re-read them and re-register the theme.

`src/cards/` holds the HTML around each chart, measured from the boards. `src/tokens.css` is the skin. `src/data.ts` holds the mock numbers from the boards; the product reads them from the evaluation API.

## Where ECharts draws differently from the boards

These are the places the Paper boards adopt ECharts' rendering rather than the other way round.

- Benchmark chart: gridlines span the plotted runs, from the first to the last, instead of starting 50px before the first run.
- Heatmap: no header band behind the run labels; the labels sit on the card. Column and row gaps are equal (3px). The legend is the visualMap's piecewise legend.
- Tooltips: every chart has the themed tooltip on hover, dark ink with white text. The boards do not draw tooltips yet.

## Rules the charts follow

- Colours come from the skin tokens through the theme. Indigo is asserted; flag is a loss or a warning.
- Sizes are the Paper sizes. A chart takes the width the board gives it. For a responsive card, measure the container and pass the width into the hook; ECharts lays the grid out from the size it is given.
- Animation is off (`animation: false`) because the boards have none and the numbers should not move on load.
- Charts that carry meaning have `role="img"` and an `aria-label`; decorative ones are `aria-hidden`.
