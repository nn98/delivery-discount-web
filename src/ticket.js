// 대표 칩(OfferChip.jsx hero)의 최소주문 줄이 쓰는 순수 계산(feat/card-ticket에서 가져옴). JSX가 없어 node --test로 바로 돈다.

// "최대"는 상한액, 특정메뉴·랜덤은 "넣기"를 안 켜면 정렬에서 빠지는 값 — 셋 다 회색으로 물러난다.
export function isCapped(offer, include) {
  return offer.qualifier === '최대'
    || (offer.qualifier === '특정메뉴' && !include?.menu)
    || (offer.qualifier === '랜덤' && !include?.random)
}

// 아직 승인 안 된 새 화면 문구 둘(COPY-STYLE 3절). false로 두면 카드에서 사라진다.
// 할인율 = 금액 ÷ 최소주문(정수 %), D-day = 만료 7일 이내 "D-n", 당일은 "오늘까지"(사용자 승인 2026-10-01).
export const SHOW_RATE = true
export const SHOW_DDAY = true

// 확정·최소주문이 있는 값만. 상한·뽑기·특정메뉴·품절은 나눠 봐야 뜻이 없다.
export function discountRate(offer, include = null) {
  if (!SHOW_RATE || isCapped(offer, include) || offer.soldOut) return null
  if (!(offer.amount > 0) || !(offer.minOrderAmount > 0)) return null
  return Math.round((offer.amount / offer.minOrderAmount) * 100)
}

// expiresAt은 "YYYY-MM-DD". 오늘(기기 날짜) 기준 0~7일 남았을 때만.
export function dDay(offer, today = new Date()) {
  if (!SHOW_DDAY || !offer.expiresAt) return null
  const [y, m, d] = offer.expiresAt.slice(0, 10).split('-').map(Number)
  const days = Math.round((Date.UTC(y, m - 1, d) - Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())) / 864e5)
  if (days === 0) return '오늘까지'
  return days > 0 && days <= 7 ? `D-${days}` : null
}
