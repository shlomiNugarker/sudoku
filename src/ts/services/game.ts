import { State } from '../../interfaces/state'
import { buildBoard } from './buildBoard'

export { createBoard, setSelectedCell, setNumberInMat }

const globalState: State = {
  board: null,
  selectedCell: null,
  level: 1,
}

const createBoard = (size: number) => {
  const newBoard = buildBoard(size)
  globalState.board = newBoard
  return globalState.board
}

const setSelectedCell = (cell: Element) => {
  globalState.selectedCell = cell
}

const setNumberInMat = (num: string) => {
  if (globalState.selectedCell && globalState.board) {
    const cellPos = getCellPosition(globalState.selectedCell.id)

    globalState.board[cellPos.i][cellPos.j] = num
    const updatedCell = { ...cellPos, num }
    return updatedCell
  }
  return null
}

const getCellPosition = (cellId: string) => {
  var parts = cellId.split('-')
  var coord = { i: +parts[0], j: +parts[1] }
  return coord
}
