import { test } from 'node:test'
import assert from 'node:assert/strict'
import { dDay, discountRate } from './ticket.js'

test('할인율은 확정값에만, 정수 %로', () => {
  assert.equal(discountRate({ amount: 7000, minOrderAmount: 18900 }), 37)
  assert.equal(discountRate({ amount: 7000 }), null)
  assert.equal(discountRate({ amount: 10000, minOrderAmount: 5000, qualifier: '최대' }), null)
  assert.equal(discountRate({ amount: 6000, minOrderAmount: 18000, qualifier: '랜덤' }), null)
  assert.equal(discountRate({ amount: 6000, minOrderAmount: 18000, qualifier: '랜덤' }, { random: true }), 33)
  assert.equal(discountRate({ amount: 4000, minOrderAmount: 18000, soldOut: true }), null)
})

test('D-day는 오늘부터 7일 안에만', () => {
  const today = new Date(2026, 9, 1, 23, 30)
  assert.equal(dDay({ expiresAt: '2026-10-04' }, today), 'D-3')
  assert.equal(dDay({ expiresAt: '2026-10-01' }, today), '오늘까지')
  assert.equal(dDay({ expiresAt: '2026-10-08' }, today), 'D-7')
  assert.equal(dDay({ expiresAt: '2026-10-09' }, today), null)
  assert.equal(dDay({ expiresAt: '2026-09-30' }, today), null)
  assert.equal(dDay({}, today), null)
})
