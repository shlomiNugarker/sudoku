import { getSelectedCellCoords, setSelectedCell } from '../services/game'
import cleanAffectedCells from './cleanAffectedCells'
import markAffectedCells from './markAffectedCells'

export function onCellClicked(cell: Element) {
  setSelectedCell(cell)

  const allSelectedCells = document.querySelectorAll('.selected')
  allSelectedCells.forEach((cell) => cell.classList.remove('selected'))

  cell.classList.add('selected')

  const coords = getSelectedCellCoords()
  cleanAffectedCells()
  if (coords) markAffectedCells(coords)
}
