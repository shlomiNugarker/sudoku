import { setSelectedCell } from '../services/game'

export function onCellClicked(cell: Element) {
  setSelectedCell(cell)

  const allSelectedCells = document.querySelectorAll('.selected')
  allSelectedCells.forEach((cell) => cell.classList.remove('selected'))

  cell.classList.add('selected')
}
