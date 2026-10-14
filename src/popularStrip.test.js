import test from 'node:test'
import assert from 'node:assert/strict'
import { popularToday } from './popularStrip.js'

test('오늘 인기는 누른 사람 많은 순 다섯, 0명은 빼고', () => {
  const b = (name, popularityToday) => ({ name, popularityToday })
  const got = popularToday([b('a', 1), b('b', 9), b('c', 0), b('d', 4), b('e', 2), b('f', 7), b('g', 3), { name: 'h' }])
  assert.deepEqual(got.map((x) => x.name), ['b', 'f', 'd', 'g', 'e'])
  assert.deepEqual(popularToday(null), [])
})
