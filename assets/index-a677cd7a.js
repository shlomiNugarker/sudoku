;(function () {
  const e = document.createElement('link').relList
  if (e && e.supports && e.supports('modulepreload')) return
  for (const n of document.querySelectorAll('link[rel="modulepreload"]')) r(n)
  new MutationObserver((n) => {
    for (const l of n)
      if (l.type === 'childList')
        for (const c of l.addedNodes)
          c.tagName === 'LINK' && c.rel === 'modulepreload' && r(c)
  }).observe(document, { childList: !0, subtree: !0 })
  function o(n) {
    const l = {}
    return (
      n.integrity && (l.integrity = n.integrity),
      n.referrerPolicy && (l.referrerPolicy = n.referrerPolicy),
      n.crossOrigin === 'use-credentials'
        ? (l.credentials = 'include')
        : n.crossOrigin === 'anonymous'
        ? (l.credentials = 'omit')
        : (l.credentials = 'same-origin'),
      l
    )
  }
  function r(n) {
    if (n.ep) return
    n.ep = !0
    const l = o(n)
    fetch(n.href, l)
  }
})()
function b(t, e) {
  localStorage[t] = JSON.stringify(e)
}
function $(t, e = null) {
  const o = localStorage[t] || e
  return JSON.parse(o)
}
function E(t) {
  const e = {}
  return (
    t.forEach((o) => {
      const r = JSON.stringify(o)
      e[r] = o
    }),
    Object.values(e)
  )
}
const g = 'sudoku-state'
let s = { board: null, initialBoard: null, selectedCell: null, level: 1 }
const A = () => {
    const t = $(g)
    return t && t.board ? ((s = t), s.board) : L()
  },
  L = () => {
    const t = J(),
      e = O(t)
    return (s.board = e), (s.initialBoard = e), b(g, s), s.board
  },
  I = () => s.board,
  w = (t) => {
    ;(s.board = t), b(g, s)
  },
  j = () => s.initialBoard,
  O = (t) => {
    const e = C(JSON.parse(JSON.stringify(t)))
    if (typeof e == 'object') {
      for (let o = 0; o < e.length; o++)
        for (let r = 0; r < e[0].length; r++)
          Math.random() > 0.2 && (e[o][r] = '')
      return e
    }
    return null
  },
  T = () => {
    let t = !0,
      e = []
    if (!s.board) return { isBoardValid: t, invalidCoords: e }
    const { board: o } = s
    for (let r = 0; r < o.length; r++)
      for (let n = 0; n < o[0].length; n++) {
        const l = {},
          c = { i: r, j: n },
          d = o[r][n],
          f = y(c)
        for (let i = 0; i < f.length; i++) {
          const a = f[i],
            u = o[a.i][a.j],
            N = d === u,
            S = l[u]
          u.length && (S ? (e.push(a), t && (t = !1)) : !S && N && (l[u] = !0))
        }
      }
    return (e = E(e)), { isBoardValid: t, invalidCoords: e }
  },
  q = (t) => {
    s.selectedCell = t
  },
  M = (t) => {
    const { board: e } = s
    if (!e) return
    const o = []
    for (let r = 0; r < e.length; r++)
      for (let n = 0; n < e.length; n++) e[r][n] === t && o.push({ i: r, j: n })
    return o
  },
  v = (t = s == null ? void 0 : s.selectedCell) => {
    if (t) return k(t.id)
  },
  P = (t) => {
    var e
    if ((e = s.selectedCell) != null && e.classList.contains('constant'))
      return null
    if (s.selectedCell && s.board) {
      const o = k(s.selectedCell.id)
      s.board[o.i][o.j] = t
      const r = { ...o, num: t }
      return b(g, s), r
    }
    return null
  },
  k = (t) => {
    const e = t.split('-')
    return { i: +e[0], j: +e[1] }
  }
function y(t) {
  const { i: e, j: o } = t,
    r = []
  for (let i = 0; i < 9; i++) {
    const a = { i: e, j: i }
    r.push(a)
  }
  for (let i = 0; i < 9; i++) {
    const a = { i, j: o }
    r.push(a)
  }
  const n = Math.floor(e / 3) * 3,
    l = Math.floor(o / 3) * 3,
    c = { i: n, j: l },
    d = [
      { i: c.i, j: c.j },
      { i: c.i + 1, j: c.j },
      { i: c.i + 2, j: c.j },
      { i: c.i, j: c.j + 1 },
      { i: c.i + 1, j: c.j + 1 },
      { i: c.i + 2, j: c.j + 1 },
      { i: c.i, j: c.j + 2 },
      { i: c.i + 1, j: c.j + 2 },
      { i: c.i + 2, j: c.j + 2 },
    ]
  return E([...r, ...d])
}
const J = (t = 9) => {
  let e = []
  for (let o = 0; o < t; o++) {
    e[o] = []
    for (let r = 0; r < t; r++) {
      const n = ''
      e[o][r] = n
    }
  }
  return e
}
function U(t, e, o) {
  const r = y(e)
  for (let n = 0; n < r.length; n++) {
    const l = r[n]
    if (t[l.i][l.j] === o.toString()) return !1
  }
  return !0
}
function C(t) {
  if (!t) return !1
  const e = x(t)
  if (!e) return t
  for (let o = 1; o <= 9; o++)
    if (U(t, e, o)) {
      if (((t[e.i][e.j] = o.toString()), C(t))) return t
      t[e.i][e.j] = ''
    }
  return !1
}
function x(t) {
  for (let e = 0; e < t.length; e++)
    for (let o = 0; o < t.length; o++) if (t[e][o] === '') return { i: e, j: o }
  return null
}
function G(t) {
  var o
  const e = v(t)
  e &&
    ((o = y(e)) == null ||
      o.forEach(({ i: r, j: n }) => {
        const l = document.getElementById(`${r}-${n}`)
        ;(l != null && l.classList.contains('affected')) ||
          l == null ||
          l.classList.add('affected')
      }))
}
function H(t) {
  var o
  if (
    (document
      .querySelectorAll('.similar')
      .forEach((r) => r.classList.remove('similar')),
    !((o = t.textContent) != null && o.length))
  )
    return
  const e = M(t.textContent)
  e &&
    e.forEach((r) => {
      var n
      ;(n = document.getElementById(`${r.i}-${r.j}`)) == null ||
        n.classList.add('similar')
    })
}
function m(t) {
  document
    .querySelectorAll('.selected')
    .forEach((e) => e.classList.remove('selected')),
    q(t),
    t.classList.add('selected'),
    document
      .querySelectorAll('.affected')
      .forEach((e) => e.classList.remove('affected')),
    G(t),
    H(t)
}
function K(t) {
  t.forEach((e) => {
    var o
    ;(o = document.getElementById(`${e.i}-${e.j}`)) == null ||
      o.classList.add('red')
  })
}
function V(t) {
  if (!t) return
  const e = document.getElementById(`${t.i}-${t.j}`)
  e && (e.innerHTML = t.num)
}
function h(t) {
  const e = P(t)
  V(e)
  const { isBoardValid: o, invalidCoords: r } = T()
  document.querySelectorAll('.red').forEach((n) => n.classList.remove('red')),
    o || K(r)
}
function R(t) {
  const e = Number(t.key)
  if (Number.isInteger(e) && e !== 0) {
    h(e.toString())
    return
  }
  const o = v()
  if (o)
    switch (t.key) {
      case 'Backspace':
        h('')
        break
      case 'ArrowLeft':
        {
          if (o.i < 1) return
          const r = document.getElementById(`${o.i - 1}-${o.j}`)
          r && m(r)
        }
        break
      case 'ArrowRight':
        {
          if (o.i > 12) return
          const r = document.getElementById(`${o.i + 1}-${o.j}`)
          r && m(r)
        }
        break
      case 'ArrowDown':
        {
          if (o.j > 12) return
          const r = document.getElementById(`${o.i}-${o.j + 1}`)
          r && m(r)
        }
        break
      case 'ArrowUp':
        {
          if (o.j < 1) return
          const r = document.getElementById(`${o.i}-${o.j - 1}`)
          r && m(r)
        }
        break
    }
}
const p = (t, e, o) => {
  let r = '<table border="0"><tbody>'
  for (let l = 0; l < t.length; l++) {
    const c =
      l < t.length - 1
        ? l % 3 === 2
          ? 'border-right-bold'
          : 'border-right'
        : ''
    r += `<tr class="${c}">`
    for (let d = 0; d < t[0].length; d++) {
      const f = t[l][d],
        i = 'cell',
        a = o[l][d] ? 'constant' : '',
        u =
          d < t[0].length - 1
            ? d % 3 === 2
              ? 'border-bottom-bold'
              : 'border-bottom'
            : ''
      r += `<td  class="${i} ${u} ${a}" id="${l}-${d}"  >${f}</td>`
    }
    r += '</tr>'
  }
  r += '</tbody></table>'
  const n = document.querySelector(e)
  n && (n.innerHTML = r)
}
function D() {
  const t = L(),
    e = j()
  t && e && p(t, '.board', e), B()
}
function F() {
  const t = I()
  if (!t) return
  const e = C(t)
  if (e) {
    w(e)
    const o = j()
    e && o && p(e, '.board', o), B()
  }
}
function B() {
  var e, o
  document
    .querySelectorAll('.cell')
    .forEach((r) => r.addEventListener('click', () => m(r))),
    document.querySelectorAll('.num-btn').forEach((r) =>
      r.addEventListener('click', () => {
        h(r.textContent || '')
      })
    ),
    (e = document.getElementById('solve-board-btn')) == null ||
      e.addEventListener('click', F),
    (o = document.getElementById('new-game-btn')) == null ||
      o.addEventListener('click', D),
    window.addEventListener('keyup', R)
}
const W = () => {
  const t = A(),
    e = j()
  t && e && p(t, '.board', e), B()
}
window.addEventListener('load', W)
