export default function markAffectedCells(cellCoords: {
  i: number
  j: number
}) {
  const { i, j } = cellCoords

  //  The whole i axis
  for (let k = 0; k < 12; k++) {
    const el = document.getElementById(`${i}-${k}`)
    el?.classList.add('affected')
  }

  //  The whole j axis
  for (let l = 0; l < 12; l++) {
    const el = document.getElementById(`${l}-${j}`)
    el?.classList.add('affected')
  }

  //  Find the top-left corner of the small squere:
  const itl = Math.floor(i / 3) * 3
  const jtl = Math.floor(j / 3) * 3
  const topLeftCrood = {
    i: itl,
    j: jtl,
  }
  const cellsToMark: { i: number; j: number }[] = [
    {
      i: topLeftCrood.i,
      j: topLeftCrood.j,
    },
    {
      i: topLeftCrood.i + 1,
      j: topLeftCrood.j,
    },
    {
      i: topLeftCrood.i + 2,
      j: topLeftCrood.j,
    },
    //
    {
      i: topLeftCrood.i,
      j: topLeftCrood.j + 1,
    },
    {
      i: topLeftCrood.i + 1,
      j: topLeftCrood.j + 1,
    },
    {
      i: topLeftCrood.i + 2,
      j: topLeftCrood.j + 1,
    },
    //
    {
      i: topLeftCrood.i,
      j: topLeftCrood.j + 2,
    },
    {
      i: topLeftCrood.i + 1,
      j: topLeftCrood.j + 2,
    },
    {
      i: topLeftCrood.i + 2,
      j: topLeftCrood.j + 2,
    },
  ]

  for (let p = 0; p < cellsToMark.length; p++) {
    const { i, j } = cellsToMark[p]
    const el = document.getElementById(`${i}-${j}`)
    if (!el?.classList.contains('affected')) el?.classList.add('affected')
  }
}
