import { getAllAffectedCellCoords } from '../services/game'

export default function markAffectedCells() {
  getAllAffectedCellCoords()?.forEach(({ i, j }) => {
    const el = document.getElementById(`${i}-${j}`)
    if (!el?.classList.contains('affected')) el?.classList.add('affected')
  })
}
