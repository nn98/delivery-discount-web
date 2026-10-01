// 대표 칩(OfferChip.jsx hero)이 쓰는 순수 계산(feat/card-ticket에서 가져옴). JSX가 없어 node --test로 바로 돈다.

// "최대"는 상한액, 특정메뉴·랜덤은 "넣기"를 안 켜면 정렬에서 빠지는 값 — 셋 다 회색으로 물러난다.
export function isCapped(offer, include) {
  return offer.qualifier === '최대'
    || (offer.qualifier === '특정메뉴' && !include?.menu)
    || (offer.qualifier === '랜덤' && !include?.random)
}

// 대표 칩 금액 아래 조건 줄. 0은 "없음"으로 관측된 값, null은 못 읽은 값이라 갈라 쓴다(사용자 2026-10-01).
export function minOrderText(offer) {
  const v = offer.minOrderAmount
  if (v > 0) return `최소주문 ${v.toLocaleString('ko-KR')}원`
  return v === 0 ? '최소주문 없음' : '최소주문 미확인'
}

// expiresAt은 "YYYY-MM-DD"(한국 날짜). 오늘을 KST로 잡아 0~7일 남았을 때만. 당일은 "오늘까지"(사용자 승인 2026-10-01).
// 기기 시간대와 무관하게 같은 답이 나온다. 그래도 SSR 캐시가 자정을 넘길 수 있어 호출은 마운트 뒤에 한다(OfferChip).
export function dDay(offer, now = new Date()) {
  if (!offer.expiresAt) return null
  const [y, m, d] = offer.expiresAt.slice(0, 10).split('-').map(Number)
  const kst = new Date(now.getTime() + 9 * 3600e3)
  const days = Math.round((Date.UTC(y, m - 1, d) - Date.UTC(kst.getUTCFullYear(), kst.getUTCMonth(), kst.getUTCDate())) / 864e5)
  if (days === 0) return '오늘까지'
  return days > 0 && days <= 7 ? `D-${days}` : null
}
