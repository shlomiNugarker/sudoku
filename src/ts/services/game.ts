import { State } from '../../interfaces/state'

export {
  createBoard,
  setSelectedCell,
  setNumberInMat,
  getSelectedCellCoords,
  getCellCoords,
  getBoardSize,
}

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

const getSelectedCellCoords = () => {
  if (!globalState.selectedCell) return
  return getCellCoords(globalState.selectedCell.id)
}

const getBoardSize = () => {
  return globalState.board?.length
}

const setNumberInMat = (num: string) => {
  if (globalState.selectedCell && globalState.board) {
    const cellPos = getCellCoords(globalState.selectedCell.id)

    globalState.board[cellPos.i][cellPos.j] = num
    const updatedCell = { ...cellPos, num }
    return updatedCell
  }
  return null
}

const getCellCoords = (cellId: string) => {
  const parts = cellId.split('-')
  const coord = { i: +parts[0], j: +parts[1] }
  return coord
}

const buildBoard = (size: number) => {
  let board: string[][] = []
  for (let i = 0; i < size; i++) {
    board[i] = []
    for (let j = 0; j < size; j++) {
      const cell = ''
      board[i][j] = cell
    }
  }
  return board
}
