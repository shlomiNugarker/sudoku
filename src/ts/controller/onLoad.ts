import { createBoard } from '../services/game'
import { onCellClicked } from './onCellClicked'
import onKeyUp from './onKeyUp'
import onSetNumberInCell from './onSetNumberInCell'
import { renderBoard } from './renderBoard'

export const onLoad = () => {
  const board = createBoard()
  board && renderBoard(board, '.board')

  const cells = document.querySelectorAll('.cell')
  cells.forEach((cell) =>
    cell.addEventListener('click', () => onCellClicked(cell))
  )

  document.querySelectorAll('.num-btn').forEach((numBtn) =>
    numBtn.addEventListener('click', () => {
      onSetNumberInCell(numBtn.textContent || '')
    })
  )

  window.addEventListener('keyup', onKeyUp)
}
