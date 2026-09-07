# EP-030 charts in ECharts

The charts on the SimSim Simplified Evals Dashboard (epic EP-030), built with Apache ECharts 6. The Paper boards for the epic point at the files in this repo.

```
npm install
npm run dev        # opens the showcase page
```

## The graphics

| Graphic | Story | File | How it is drawn |
| --- | --- | --- | --- |
| Improvement columns | US-075 | `src/charts/WaffleColumns.tsx` | A `pictorialBar` series. A 10×4 rectangle repeats up each column, one per point gained. Two series draw over each other: the full column in indigo first, the history in indigo-light on top, so the squares left in indigo are the last run's gain. A loss in the last run swaps indigo for flag. A net decline uses negative values, which hang below the axis line. |
| Accuracy by benchmark | US-071 | `src/charts/BenchmarkChart.tsx` | Three `line` series. The first carries the weakest filing and is invisible. The second stacks on it and carries the gap up to the strongest, filled: that is the band. The third is the mean as steps, with a dot and a label on every run. `markPoint` adds the best and weakest captions. |
| Filings sparkline | US-072 | `src/charts/Sparkline.tsx` | One `line` series, 88×18, axes hidden, a dot on the last point only. |
| Heatmap (parked) | US-071 | `src/charts/Heatmap.tsx` | A `heatmap` series. A piecewise `visualMap` colours the cells by score band and draws the legend. |
| Sample squares | US-075 | `src/charts/SampleSquares.tsx` | Not a chart. Ten divs. |
| Metric range line | US-076 | `src/charts/RangeTrack.tsx` | Not a chart. Four divs on a 60 to 100 scale. |

## How ECharts is set up

`src/charts/echarts.ts` is the only file that imports ECharts. It does three things:

1. Registers the series and components the dashboard uses, so the rest of the library is left out of the bundle.
2. Registers the `simsim` theme, built from the skin tokens in `src/tokens.css`. ECharts wants colours as values, so the file reads the tokens off `:root` once at load.
3. Exports `useECharts(option, width, height)`, a hook that puts a chart in a fixed-size div with the SVG renderer and applies the option again when it changes.

Each chart component builds its option in `useMemo` and calls the hook. There is no wrapper package.

`src/cards/` is the HTML around each chart, measured from the boards. `src/data.ts` is the mock data from the boards. The product reads the real numbers from the evaluation API.

## Where the boards follow ECharts

- Benchmark chart: the gridlines run from the first run to the last, not from the axis.
- Heatmap: no header band behind the run labels, and every cell has the same gap.
- Tooltips: every chart shows the themed tooltip on hover. The boards show it once, on the states board.

## Rules

- Colours come from the skin tokens through the theme. Indigo means a value; flag means a loss or a warning.
- Charts take the size the board gives them. For a responsive card, measure the container and pass the width to the hook.
- Animation is off. The numbers should not move on load.
- Charts that carry meaning have `role="img"` and an `aria-label`. Decorative ones are `aria-hidden`.
