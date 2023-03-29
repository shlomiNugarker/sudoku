import { setSelectedCell } from '../services/game'
import markAffectedCells from './markAffectedCells'
import markAllSimilarNums from './markAllSimilarNums'

export function onCellClicked(cell: Element) {
  document
    .querySelectorAll('.selected')
    .forEach((cell) => cell.classList.remove('selected'))
  setSelectedCell(cell)
  cell.classList.add('selected')

  // cleanAffectedCells
  document
    .querySelectorAll('.affected')
    .forEach((cell) => cell.classList.remove('affected'))
  markAffectedCells(cell)

  markAllSimilarNums(cell)
}
