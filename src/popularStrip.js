/**
 * 오늘 인기 띠(2026-10-14 시안). 지금 목록에 남은 브랜드 중 최근 24시간 동안 링크나 배너를
 * 누른 사람이 많은 순으로 다섯(API popularityToday, PopularityIndex). 누르면 그 카드로 간다.
 * 세 곳이 안 되면 그리지 않는다 - 하루 클릭이 적은 새벽에는 순위가 의미가 없다.
 */
export const STRIP_SIZE = 5
export const STRIP_MIN = 3

export function popularToday(brands) {
  return [...(brands ?? [])]
    .filter((b) => (b.popularityToday ?? 0) > 0)
    .sort((a, b) => b.popularityToday - a.popularityToday)
    .slice(0, STRIP_SIZE)
}
