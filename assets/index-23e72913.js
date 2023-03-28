;(function () {
  const o = document.createElement('link').relList
  if (o && o.supports && o.supports('modulepreload')) return
  for (const c of document.querySelectorAll('link[rel="modulepreload"]')) r(c)
  new MutationObserver((c) => {
    for (const n of c)
      if (n.type === 'childList')
        for (const l of n.addedNodes)
          l.tagName === 'LINK' && l.rel === 'modulepreload' && r(l)
  }).observe(document, { childList: !0, subtree: !0 })
  function e(c) {
    const n = {}
    return (
      c.integrity && (n.integrity = c.integrity),
      c.referrerPolicy && (n.referrerPolicy = c.referrerPolicy),
      c.crossOrigin === 'use-credentials'
        ? (n.credentials = 'include')
        : c.crossOrigin === 'anonymous'
        ? (n.credentials = 'omit')
        : (n.credentials = 'same-origin'),
      n
    )
  }
  function r(c) {
    if (c.ep) return
    c.ep = !0
    const n = e(c)
    fetch(c.href, n)
  }
})()
function h(t) {
  const o = {}
  return (
    t.forEach((e) => {
      const r = JSON.stringify(e)
      o[r] = e
    }),
    Object.values(o)
  )
}
const i = { board: null, selectedCell: null, level: 1 },
  y = (t) => {
    const o = E(t)
    return (i.board = o), i.board
  },
  p = () => {
    let t = !0,
      o = []
    if (!i.board) return { isBoardValid: t, invalidCoords: o }
    const { board: e } = i
    for (let r = 0; r < e.length; r++)
      for (let c = 0; c < e[0].length; c++) {
        const n = {},
          l = { i: r, j: c },
          d = e[r][c],
          u = g(l)
        for (let s = 0; s < u.length; s++) {
          const a = u[s],
            f = e[a.i][a.j]
          f.length &&
            (n[f]
              ? (o.push(a), t && (t = !1))
              : !n[f] && d === f && (n[f] = !0))
        }
      }
    return (o = h(o)), { isBoardValid: t, invalidCoords: o }
  },
  L = (t) => {
    i.selectedCell = t
  },
  j = (t = i == null ? void 0 : i.selectedCell) => {
    if (t) return C(t.id)
  },
  $ = (t) => {
    var o
    if ((o = i.selectedCell) != null && o.classList.contains('constant'))
      return null
    if (i.selectedCell && i.board) {
      const e = C(i.selectedCell.id)
      return (i.board[e.i][e.j] = t), { ...e, num: t }
    }
    return null
  },
  C = (t) => {
    const o = t.split('-')
    return { i: +o[0], j: +o[1] }
  }
function g(t) {
  const { i: o, j: e } = t,
    r = []
  for (let s = 0; s < 12; s++) {
    const a = { i: o, j: s }
    r.push(a)
  }
  for (let s = 0; s < 12; s++) {
    const a = { i: s, j: e }
    r.push(a)
  }
  const c = Math.floor(o / 3) * 3,
    n = Math.floor(e / 3) * 3,
    l = { i: c, j: n },
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
  return h([...r, ...d])
}
const E = (t = 9) => {
  let o = []
  for (let e = 0; e < t; e++) {
    o[e] = []
    for (let r = 0; r < t; r++) {
      const c = ''
      o[e][r] = c
    }
  }
  return o
}
function k() {
  document
    .querySelectorAll('.affected')
    .forEach((t) => t.classList.remove('affected'))
}
function v(t) {
  var e
  const o = j(t)
  o &&
    ((e = g(o)) == null ||
      e.forEach(({ i: r, j: c }) => {
        const n = document.getElementById(`${r}-${c}`)
        ;(n != null && n.classList.contains('affected')) ||
          n == null ||
          n.classList.add('affected')
      }))
}
function m(t) {
  document
    .querySelectorAll('.selected')
    .forEach((o) => o.classList.remove('selected')),
    L(t),
    t.classList.add('selected'),
    k(),
    v(t)
}
function A(t) {
  t.forEach((o) => {
    var e
    ;(e = document.getElementById(`${o.i}-${o.j}`)) == null ||
      e.classList.add('red')
  })
}
function S(t) {
  if (!t) return
  const o = document.getElementById(`${t.i}-${t.j}`)
  o && (o.innerHTML = t.num)
}
function b(t) {
  const o = $(t)
  S(o)
  const { isBoardValid: e, invalidCoords: r } = p()
  document.querySelectorAll('.red').forEach((c) => c.classList.remove('red')),
    e || A(r)
}
function B(t) {
  const o = Number(t.key)
  if (Number.isInteger(o) && o !== 0) {
    b(o.toString())
    return
  }
  const e = j()
  if (e)
    switch (t.key) {
      case 'Backspace':
        b('')
        break
      case 'ArrowLeft':
        {
          if (e.i < 1) return
          const r = document.getElementById(`${e.i - 1}-${e.j}`)
          r && m(r)
        }
        break
      case 'ArrowRight':
        {
          if (e.i > 12) return
          const r = document.getElementById(`${e.i + 1}-${e.j}`)
          r && m(r)
        }
        break
      case 'ArrowDown':
        {
          if (e.j > 12) return
          const r = document.getElementById(`${e.i}-${e.j + 1}`)
          r && m(r)
        }
        break
      case 'ArrowUp':
        {
          if (e.j < 1) return
          const r = document.getElementById(`${e.i}-${e.j - 1}`)
          r && m(r)
        }
        break
    }
}
const N = (t, o) => {
    let e = '<table border="0"><tbody>'
    for (let n = 0; n < t.length; n++) {
      const l =
        n < t.length - 1
          ? n % 3 === 2
            ? 'border-right-bold'
            : 'border-right'
          : ''
      e += `<tr class="${l}">`
      for (let d = 0; d < t[0].length; d++) {
        var r = t[n][d]
        const u = 'cell',
          s = t[n][d] ? 'constant' : '',
          a =
            d < t[0].length - 1
              ? d % 3 === 2
                ? 'border-bottom-bold'
                : 'border-bottom'
              : ''
        e += `<td  class="${u} ${a} ${s}" id="${n}-${d}"  >${r}</td>`
      }
      e += '</tr>'
    }
    e += '</tbody></table>'
    const c = document.querySelector(o)
    c && (c.innerHTML = e)
  },
  w = () => {
    const t = y(12)
    t && N(t, '.board'),
      document
        .querySelectorAll('.cell')
        .forEach((e) => e.addEventListener('click', () => m(e))),
      document.querySelectorAll('.num-btn').forEach((e) =>
        e.addEventListener('click', () => {
          b(e.textContent || '')
        })
      ),
      window.addEventListener('keyup', B)
  }
window.addEventListener('load', w)
