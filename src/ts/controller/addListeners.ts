import { onCellClicked } from './onCellClicked'
import onKeyUp from './onKeyUp'
import onSetNumberInCell from './onSetNumberInCell'
import onSolveBoard from './onSolveBoard'

export default function addListeners() {
  const cells = document.querySelectorAll('.cell')
  cells.forEach((cell) =>
    cell.addEventListener('click', () => onCellClicked(cell))
  )

  document.querySelectorAll('.num-btn').forEach((numBtn) =>
    numBtn.addEventListener('click', () => {
      onSetNumberInCell(numBtn.textContent || '')
    })
  )

  document
    .getElementById('solve-board-btn')
    ?.addEventListener('click', onSolveBoard)

  window.addEventListener('keyup', onKeyUp)
}
