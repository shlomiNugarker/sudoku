;(function () {
  const e = document.createElement('link').relList
  if (e && e.supports && e.supports('modulepreload')) return
  for (const n of document.querySelectorAll('link[rel="modulepreload"]')) r(n)
  new MutationObserver((n) => {
    for (const s of n)
      if (s.type === 'childList')
        for (const l of s.addedNodes)
          l.tagName === 'LINK' && l.rel === 'modulepreload' && r(l)
  }).observe(document, { childList: !0, subtree: !0 })
  function o(n) {
    const s = {}
    return (
      n.integrity && (s.integrity = n.integrity),
      n.referrerPolicy && (s.referrerPolicy = n.referrerPolicy),
      n.crossOrigin === 'use-credentials'
        ? (s.credentials = 'include')
        : n.crossOrigin === 'anonymous'
        ? (s.credentials = 'omit')
        : (s.credentials = 'same-origin'),
      s
    )
  }
  function r(n) {
    if (n.ep) return
    n.ep = !0
    const s = o(n)
    fetch(n.href, s)
  }
})()
function j(t, e) {
  localStorage[t] = JSON.stringify(e)
}
function A(t, e = null) {
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
const h = 'sudoku-state'
let g = 0,
  c = { board: null, initialBoard: null, selectedCell: null, level: 1 }
const T = () => g,
  I = () => {
    const t = A(h)
    return t && t.board ? ((c = t), c.board) : L()
  },
  L = () => {
    const t = x(),
      e = q(t)
    return (c.board = e), (c.initialBoard = e), j(h, c), (g = 0), c.board
  },
  O = () => c.board,
  w = (t) => {
    ;(c.board = t), j(h, c)
  },
  y = () => c.initialBoard,
  q = (t) => {
    const e = p(JSON.parse(JSON.stringify(t)))
    if (((g = 0), typeof e == 'object')) {
      for (let o = 0; o < e.length; o++)
        for (let r = 0; r < e[0].length; r++)
          Math.random() > 0.2 && (e[o][r] = '')
      return e
    }
    return null
  },
  M = () => {
    let t = !0,
      e = []
    if (!c.board) return { isBoardValid: t, invalidCoords: e }
    const { board: o } = c
    for (let r = 0; r < o.length; r++)
      for (let n = 0; n < o[0].length; n++) {
        const s = {},
          l = { i: r, j: n },
          d = o[r][n],
          f = C(l)
        for (let i = 0; i < f.length; i++) {
          const a = f[i],
            u = o[a.i][a.j],
            $ = d === u,
            B = s[u]
          u.length && (B ? (e.push(a), t && (t = !1)) : !B && $ && (s[u] = !0))
        }
      }
    return (e = E(e)), { isBoardValid: t, invalidCoords: e }
  },
  P = (t) => {
    c.selectedCell = t
  },
  J = (t) => {
    const { board: e } = c
    if (!e) return
    const o = []
    for (let r = 0; r < e.length; r++)
      for (let n = 0; n < e.length; n++) e[r][n] === t && o.push({ i: r, j: n })
    return o
  },
  k = (t = c == null ? void 0 : c.selectedCell) => {
    if (t) return N(t.id)
  },
  U = (t) => {
    var e
    if ((e = c.selectedCell) != null && e.classList.contains('constant'))
      return null
    if (c.selectedCell && c.board) {
      const o = N(c.selectedCell.id)
      c.board[o.i][o.j] = t
      const r = { ...o, num: t }
      return j(h, c), r
    }
    return null
  },
  N = (t) => {
    const e = t.split('-')
    return { i: +e[0], j: +e[1] }
  }
function C(t) {
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
    s = Math.floor(o / 3) * 3,
    l = { i: n, j: s },
    d = [
      { i: l.i, j: l.j },
      { i: l.i + 1, j: l.j },
      { i: l.i + 2, j: l.j },
      { i: l.i, j: l.j + 1 },
      { i: l.i + 1, j: l.j + 1 },
      { i: l.i + 2, j: l.j + 1 },
      { i: l.i, j: l.j + 2 },
      { i: l.i + 1, j: l.j + 2 },
      { i: l.i + 2, j: l.j + 2 },
    ]
  return E([...r, ...d])
}
const x = (t = 9) => {
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
function G(t, e, o) {
  const r = C(e)
  for (let n = 0; n < r.length; n++) {
    const s = r[n]
    if (t[s.i][s.j] === o.toString()) return !1
  }
  return !0
}
function p(t) {
  if ((++g, g > 5e3 || !t)) return !1
  const e = H(t)
  if (!e) return t
  for (let o = 1; o <= 9; o++)
    if (G(t, e, o)) {
      if (((t[e.i][e.j] = o.toString()), p(t))) return t
      t[e.i][e.j] = ''
    }
  return !1
}
function H(t) {
  for (let e = 0; e < t.length; e++)
    for (let o = 0; o < t.length; o++) if (t[e][o] === '') return { i: e, j: o }
  return null
}
function K(t) {
  var o
  const e = k(t)
  e &&
    ((o = C(e)) == null ||
      o.forEach(({ i: r, j: n }) => {
        const s = document.getElementById(`${r}-${n}`)
        ;(s != null && s.classList.contains('affected')) ||
          s == null ||
          s.classList.add('affected')
      }))
}
function V(t) {
  var o
  if (
    (document
      .querySelectorAll('.similar')
      .forEach((r) => r.classList.remove('similar')),
    !((o = t.textContent) != null && o.length))
  )
    return
  const e = J(t.textContent)
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
    P(t),
    t.classList.add('selected'),
    document
      .querySelectorAll('.affected')
      .forEach((e) => e.classList.remove('affected')),
    K(t),
    V(t)
}
function R(t) {
  t.forEach((e) => {
    var o
    ;(o = document.getElementById(`${e.i}-${e.j}`)) == null ||
      o.classList.add('red')
  })
}
function D(t) {
  if (!t) return
  const e = document.getElementById(`${t.i}-${t.j}`)
  e && (e.innerHTML = t.num)
}
function b(t) {
  const e = U(t)
  D(e)
  const { isBoardValid: o, invalidCoords: r } = M()
  document.querySelectorAll('.red').forEach((n) => n.classList.remove('red')),
    o || R(r)
}
function F(t) {
  const e = Number(t.key)
  if (Number.isInteger(e) && e !== 0) {
    b(e.toString())
    return
  }
  const o = k()
  if (o)
    switch (t.key) {
      case 'Backspace':
        b('')
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
const S = (t, e, o) => {
  let r = '<table border="0"><tbody>'
  for (let s = 0; s < t.length; s++) {
    const l =
      s < t.length - 1
        ? s % 3 === 2
          ? 'border-right-bold'
          : 'border-right'
        : ''
    r += `<tr class="${l}">`
    for (let d = 0; d < t[0].length; d++) {
      const f = t[s][d],
        i = 'cell',
        a = o[s][d] ? 'constant' : '',
        u =
          d < t[0].length - 1
            ? d % 3 === 2
              ? 'border-bottom-bold'
              : 'border-bottom'
            : ''
      r += `<td  class="${i} ${u} ${a}" id="${s}-${d}"  >${f}</td>`
    }
    r += '</tr>'
  }
  r += '</tbody></table>'
  const n = document.querySelector(e)
  n && (n.innerHTML = r)
}
function W() {
  const t = L(),
    e = y()
  console.log({ board: t, initialBoard: e }), t && e && S(t, '.board', e), v()
}
function Y() {
  const t = O()
  if (!t) return
  const e = p(t),
    o = T()
  if (e) {
    alert(o + ' moves to solve the sudoku!'), w(e)
    const r = y()
    e && r && S(e, '.board', r), v()
  } else alert(o + " tries... Coudn't solve the sudoku")
}
function v() {
  var e, o
  document
    .querySelectorAll('.cell')
    .forEach((r) => r.addEventListener('click', () => m(r))),
    document.querySelectorAll('.num-btn').forEach((r) =>
      r.addEventListener('click', () => {
        b(r.textContent || '')
      })
    ),
    (e = document.getElementById('solve-board-btn')) == null ||
      e.addEventListener('click', Y),
    (o = document.getElementById('new-game-btn')) == null ||
      o.addEventListener('click', W),
    window.addEventListener('keyup', F)
}
const _ = () => {
  const t = I(),
    e = y()
  t && e && S(t, '.board', e), v()
}
window.addEventListener('load', _)
