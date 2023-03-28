import {
  getAllAffectedCellCoords,
  getSelectedCellCoords,
} from '../services/game'

export default function markAffectedCells(cell: Element) {
  const cellCoordToCheck = getSelectedCellCoords(cell)
  if (!cellCoordToCheck) return
  getAllAffectedCellCoords(cellCoordToCheck)?.forEach(({ i, j }) => {
    const el = document.getElementById(`${i}-${j}`)
    if (!el?.classList.contains('affected')) el?.classList.add('affected')
  })
}
