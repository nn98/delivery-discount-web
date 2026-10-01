import { test } from 'node:test'
import assert from 'node:assert/strict'
import { dDay, minOrderText } from './ticket.js'

test('최소주문 줄: 금액 / 0은 없음 / null은 미확인', () => {
  assert.equal(minOrderText({ minOrderAmount: 18900 }), '최소주문 18,900원')
  assert.equal(minOrderText({ minOrderAmount: 0 }), '최소주문 없음')
  assert.equal(minOrderText({ minOrderAmount: null }), '최소주문 미확인')
  assert.equal(minOrderText({}), '최소주문 미확인')
})

test('D-day는 KST 오늘부터 7일 안에만', () => {
  const now = new Date('2026-10-01T14:30:00Z') // KST 10-01 23:30
  assert.equal(dDay({ expiresAt: '2026-10-04' }, now), 'D-3')
  assert.equal(dDay({ expiresAt: '2026-10-01' }, now), '오늘까지')
  assert.equal(dDay({ expiresAt: '2026-10-08' }, now), 'D-7')
  assert.equal(dDay({ expiresAt: '2026-10-09' }, now), null)
  assert.equal(dDay({ expiresAt: '2026-09-30' }, now), null)
  assert.equal(dDay({}, now), null)
  // UTC로는 아직 9월 30일이지만 KST로는 10월 1일이다.
  assert.equal(dDay({ expiresAt: '2026-10-01' }, new Date('2026-09-30T15:30:00Z')), '오늘까지')
})
