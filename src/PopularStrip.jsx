import { track } from './analytics.js'
import { BrandLogo } from './logos.jsx'
import { STRIP_MIN, popularToday } from './popularStrip.js'

export default function PopularStrip({ brands, onPick }) {
  const top = popularToday(brands)
  if (top.length < STRIP_MIN) return null
  return (
    <section className="pop-strip" aria-label="오늘 인기">
      <h2 className="pop-strip__title">오늘 인기</h2>
      <ol className="pop-strip__list">
        {top.map((b, i) => (
          <li key={b.name}>
            <button
              type="button"
              className="pop-strip__item"
              onClick={() => { onPick(b.name); track('quick_filter', { key: 'popular_strip', brand: b.name, position: i + 1 }) }}
            >
              <span className="pop-strip__rank">{i + 1}</span>
              <BrandLogo name={b.name} size={22} />
              <span className="pop-strip__name">{b.shortName ?? b.name}</span>
            </button>
          </li>
        ))}
      </ol>
    </section>
  )
}
