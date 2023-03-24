import { getSelectedCellCoords } from '../services/game'
import { onCellClicked } from './onCellClicked'
import onSetNumberInCell from './onSetNumberInCell'

export default function onKeyUp(ev: KeyboardEvent) {
  const number = Number(ev.key)
  if (Number.isInteger(number)) {
    onSetNumberInCell(number.toString())
    return
  }

  const cellCoords = getSelectedCellCoords()
  if (!cellCoords) return

  switch (ev.key) {
    case 'Backspace':
      {
        onSetNumberInCell('')
      }
      break
    case 'ArrowLeft':
      {
        if (cellCoords.i < 1) return
        const elTomove = document.getElementById(
          `${cellCoords.i - 1}-${cellCoords.j}`
        )
        if (elTomove) onCellClicked(elTomove)
      }
      break
    case 'ArrowRight':
      {
        if (cellCoords.i > 12) return
        const elTomove = document.getElementById(
          `${cellCoords.i + 1}-${cellCoords.j}`
        )
        if (elTomove) onCellClicked(elTomove)
      }
      break
    case 'ArrowDown':
      {
        if (cellCoords.j > 12) return
        const elTomove = document.getElementById(
          `${cellCoords.i}-${cellCoords.j + 1}`
        )
        if (elTomove) onCellClicked(elTomove)
      }
      break
    case 'ArrowUp':
      {
        if (cellCoords.j < 1) return
        const elTomove = document.getElementById(
          `${cellCoords.i}-${cellCoords.j - 1}`
        )
        if (elTomove) onCellClicked(elTomove)
      }
      break
    default:
      break
  }
}
