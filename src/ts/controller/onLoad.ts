import { createBoard } from '../services/game'
import { onCellClicked } from './onCellClicked'
import { renderBoard } from './renderBoard'

export const onLoad = () => {
  const board = createBoard(12)
  board && renderBoard(board, '.board')

  const cells = document.querySelectorAll('.cell')
  cells.forEach((cell) =>
    cell.addEventListener('click', () => onCellClicked(cell))
  )
}
