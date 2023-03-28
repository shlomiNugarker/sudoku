import { setSelectedCell } from '../services/game'
import cleanAffectedCells from './cleanAffectedCells'
import markAffectedCells from './markAffectedCells'

export function onCellClicked(cell: Element) {
  document
    .querySelectorAll('.selected')
    .forEach((cell) => cell.classList.remove('selected'))

  setSelectedCell(cell)
  cell.classList.add('selected')

  cleanAffectedCells()
  markAffectedCells(cell)
}
