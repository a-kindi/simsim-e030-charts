/* The HTML around each chart, as the E030 boards draw it. Charts are imported from ../charts. */
import './cards.css'
import { WaffleColumns } from '../charts/WaffleColumns'
import { SampleSquares } from '../charts/SampleSquares'
import { RangeTrack } from '../charts/RangeTrack'
import { Sparkline } from '../charts/Sparkline'
import { BenchmarkChart, type BenchmarkPoint } from '../charts/BenchmarkChart'
import { Heatmap, type HeatRow } from '../charts/Heatmap'

export function ImprovementCard({ total, lastRun, gains, since, meta }: { total: string; lastRun: string; gains: number[]; since: string; meta: string }) {
  const loss = lastRun.startsWith('−'), declined = total.startsWith('−')
  return (
    <div className="stat" style={{ width: 344 }}>
      <div className="head"><span className="caps">IMPROVEMENT</span><span className={`caps ${loss ? 'flag' : 'indigo'}`}>{lastRun} LAST RUN</span></div>
      <div className="hero">
        <div><div className={`big ${declined ? 'flag' : ''}`}>{total}</div><div className="caps soft">SINCE {since}</div></div>
        <div className="graphic"><WaffleColumns gains={gains} /></div>
      </div>
      <div className="meta">{meta}</div>
    </div>
  )
}

export function SampleCard({ inSlice, corpus, runs, filtered, status }: { inSlice: number; corpus: number; runs: number; filtered: boolean; status?: string }) {
  const empty = inSlice === 0
  return (
    <div className="stat sample" style={{ width: 643 }}>
      <span className="caps">SAMPLE</span>
      <div className="sample-body">
        <div className="sample-left">
          <SampleSquares inSlice={inSlice} corpus={corpus} filtered={filtered} />
          <div>
            <div className="sample-count"><b className={filtered && !empty ? 'indigo' : ''}>{inSlice} of {corpus}</b><span>{empty ? 'filings · no matches' : `filings · ${runs} benchmark runs`}</span></div>
            <div className="meta">{empty ? 'Widen the filters to bring filings back' : 'Scored against ground truth'}</div>
          </div>
        </div>
        <div className="sample-right">{status && <div className="meta">{status}</div>}</div>
      </div>
    </div>
  )
}

export function MetricCard({ name, value, change, caption, first, latest, firstDate, latestDate }: { name: string; value: string; change: string; caption: string; first: number; latest: number; firstDate: string; latestDate: string }) {
  return (
    <div className="metric">
      <div className="head"><span className="caps">{name}</span><span className="delta">▲ {change}</span></div>
      <div className="value">{value}</div>
      <div className="caption">{caption}</div>
      <div className="range">
        <RangeTrack first={first} latest={latest} />
        <div className="range-labels"><span>60</span><span>{first.toFixed(1)} on {firstDate} → {latest.toFixed(1)} on {latestDate}</span><span>100</span></div>
      </div>
    </div>
  )
}

export function FilingRow({ name, id, scores }: { name: string; id: string; scores: number[] }) {
  const latest = scores[scores.length - 1], prev = scores[scores.length - 2]
  return (
    <div className="filing">
      <div className="name"><span>{name}</span><span className="id">{id}</span></div>
      <div className="score">{latest.toFixed(1)}%</div>
      <div className="change">▲ {(latest - prev).toFixed(1)}</div>
      <Sparkline values={scores} />
    </div>
  )
}

export function BenchmarkCard({ data, trust, basis }: { data: BenchmarkPoint[]; trust: string; basis: string }) {
  return (
    <div className="chart-card">
      <span className="caps">ACCURACY BY BENCHMARK</span>
      <div className="captions"><div className="trust">{trust}</div><div className="basis">{basis}</div></div>
      <BenchmarkChart data={data} />
    </div>
  )
}

export function HeatmapCard({ runs, rows, trust, basis }: { runs: readonly string[]; rows: HeatRow[]; trust: string; basis: string }) {
  return (
    <div className="chart-card">
      <span className="caps">ACCURACY BY BENCHMARK</span>
      <div className="captions"><div className="trust">{trust}</div><div className="basis">{basis}</div></div>
      <Heatmap runs={runs} rows={rows} />
    </div>
  )
}
