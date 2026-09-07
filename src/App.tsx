import './tokens.css'
import { runs, benchmark, improvement, filings } from './data'
import { ImprovementCard, SampleCard, MetricCard, FilingRow, BenchmarkCard, HeatmapCard } from './cards/cards'

const Section = ({ title, story, file, note, children }: { title: string; story: string; file: string; note: string; children: React.ReactNode }) => (
  <section style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
      <h2 style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>{title}</h2>
      <span style={{ fontSize: 12, color: 'var(--color-ink-soft)' }}>{story}</span>
      <code style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-ink-sub)', marginLeft: 'auto' }}>{file}</code>
    </div>
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>{children}</div>
    <p style={{ margin: 0, fontSize: 12, lineHeight: '18px', color: 'var(--color-ink-sub)', maxWidth: 900 }}>{note}</p>
  </section>
)

export default function App() {
  return (
    <main style={{ width: 1440, padding: 40, display: 'flex', flexDirection: 'column', gap: 48 }}>
      <header>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 600 }}>EP-030 charts in ECharts</h1>
        <p style={{ margin: '6px 0 0', fontSize: 13, lineHeight: '20px', color: 'var(--color-ink-sub)', maxWidth: 900 }}>
          Every graphic from the Simplified Evals Dashboard boards, built with Apache ECharts 6 (SVG renderer, tree-shaken, themed from the skin tokens).
          Each section names its story, its file, and the ECharts series it uses. Two graphics are not charts and stay plain HTML.
        </p>
      </header>

      <Section title="Improvement card" story="US-075 · 75.2, 75.3" file="charts/WaffleColumns.tsx"
        note="ECharts series: pictorialBar with symbolRepeat (a 10×4 rect repeated with a 1px margin, one per point). Two series stacked in draw order: the full column in the accent colour under, the kept history in light over. Negative values hang below the axis line for the net decline.">
        <ImprovementCard total={improvement.resting.total} lastRun={improvement.resting.lastRun} gains={improvement.resting.gains} since="8 JUL" meta="One square is one point gained · 4 runs" />
        <ImprovementCard total={improvement.dipped.total} lastRun={improvement.dipped.lastRun} gains={improvement.dipped.gains} since="8 JUL" meta="One square is one point · the last run gave one back" />
        <ImprovementCard total={improvement.decline.total} lastRun={improvement.decline.lastRun} gains={improvement.decline.gains} since="8 JUL" meta="One square is one point · below the first run's line" />
      </Section>

      <Section title="Sample card" story="US-075 · 75.4, 75.6" file="charts/SampleSquares.tsx"
        note="Not a chart: ten divs. Unfiltered reads light; a filter fills the slice's share in indigo; an empty slice reads soft.">
        <SampleCard inSlice={34} corpus={34} runs={4} filtered={false} status="No filters · the whole corpus" />
        <SampleCard inSlice={4} corpus={34} runs={4} filtered />
        <SampleCard inSlice={0} corpus={34} runs={4} filtered />
      </Section>

      <Section title="Metric card range line" story="US-076 · 76.1.3" file="charts/RangeTrack.tsx"
        note="Not a chart: four divs, as the Paper board draws it. The span and the two dots are positioned by a 60 to 100 scale over the 292px track.">
        <MetricCard name="TABLES FOUND" value="89.5%" change="8.2" caption="Statement and note tables located" first={81.3} latest={89.5} firstDate="8 Jul" latestDate="26 Aug" />
        <MetricCard name="FILING DETAILS" value="96.0%" change="3.1" caption="Company, period, currency fields" first={92.9} latest={96.0} firstDate="8 Jul" latestDate="26 Aug" />
        <MetricCard name="VALUES CORRECT" value="84.0%" change="9.1" caption="Numbers that match the source" first={74.9} latest={84.0} firstDate="8 Jul" latestDate="26 Aug" />
      </Section>

      <Section title="Filings row sparkline" story="US-072 · 72.2.3" file="charts/Sparkline.tsx"
        note="ECharts series: line at 88×18 with both axes hidden, symbol none, and a 4px circle set on the last data item.">
        <div className="filings">{filings.slice(0, 5).map(f => <FilingRow key={f.id} {...f} />)}</div>
      </Section>

      <Section title="Accuracy by benchmark" story="US-071 · 71.1, 71.2" file="charts/BenchmarkChart.tsx"
        note="ECharts series: three line series. A transparent stacked line carries the weakest; a stacked line on top of it with areaStyle draws the band to the strongest; the mean line uses step: end with a label on every point and a stronger label on the last. markPoint carries the best and weakest captions. Right: the heatmap series with a piecewise visualMap for the five bands, which also draws the legend.">
        <BenchmarkCard data={benchmark} trust="8 of 10 filings score 80 or better · up from 5 on 8 Jul" basis="Average of the 10 filings present in all 4 included runs · band = weakest to strongest" />
        <HeatmapCard runs={runs} rows={filings} trust="8 of 10 filings score 80 or better · up from 5 on 8 Jul" basis="Every filing present in all 4 runs, strongest first · warm cells are still below 80" />
      </Section>
    </main>
  )
}
