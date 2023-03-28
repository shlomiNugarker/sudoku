import { checkBoard, setNumberInMat } from '../services/game'
import markAllInvalidCells from './markAllInvalidCells'
import onUpdateCell from './onUpdateCell'

export default function onSetNumberInCell(num: string) {
  const updatedCell = setNumberInMat(num)
  onUpdateCell(updatedCell)

  const { isBoardValid, invalidCoords } = checkBoard()

  document
    .querySelectorAll('.red')
    .forEach((cell) => cell.classList.remove('red'))
  if (!isBoardValid) markAllInvalidCells(invalidCoords)
}
