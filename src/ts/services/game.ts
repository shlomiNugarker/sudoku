import { State } from '../../interfaces/state'
import { getRandomInt } from './utils'

export {
  createBoard,
  setSelectedCell,
  setNumberInMat,
  getSelectedCellCoords,
  getCellCoords,
  getBoardSize,
  getSelectedCellVal,
  getAllAffectedCellCoords,
}

const globalState: State = {
  board: null,
  selectedCell: null,
  level: 1,
}

const createBoard = (size: number) => {
  const newBoard = buildBoard(size)
  fillBoard(newBoard)
  globalState.board = newBoard
  return globalState.board
}

function isValid(num: string, i: number, j: number) {
  // TODO: FUNC TO CHECK IF THE NUMBER IS LEGAL
  return Math.random() > 0.5
  return true
}

const fillBoard = (board: string[][]) => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      let num = getRandomInt(0, 9).toString()
      while (isValid(num, i, j)) {
        board[i][j] = num
      }
    }
  }

  return board
}

const setSelectedCell = (cell: Element) => {
  globalState.selectedCell = cell
}

const getSelectedCellCoords = () => {
  if (!globalState.selectedCell) return
  return getCellCoords(globalState.selectedCell.id)
}

const getSelectedCellVal = () => {
  if (!globalState.selectedCell) return null

  return globalState.selectedCell.textContent
}

const getBoardSize = () => {
  return globalState.board?.length
}

const setNumberInMat = (num: string) => {
  if (globalState.selectedCell?.classList.contains('constant')) return null
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

function getAllAffectedCellCoords() {
  const selectedCoord = getSelectedCellCoords()
  if (!selectedCoord || !globalState.board) return
  const { i, j } = selectedCoord
  const coords: { i: number; j: number }[] = []

  //  The whole i axis
  for (let k = 0; k < 12; k++) {
    const coord = { i: i, j: k }
    coords.push(coord)
  }
  //  The whole j axis
  for (let k = 0; k < 12; k++) {
    const coord = { i: k, j: j }
    coords.push(coord)
  }

  //  Find the top-left corner of the small squere:
  const itl = Math.floor(i / 3) * 3
  const jtl = Math.floor(j / 3) * 3
  const topLeftCrood = {
    i: itl,
    j: jtl,
  }
  //  all small squere coords:
  const smallSquereCoords: { i: number; j: number }[] = [
    {
      i: topLeftCrood.i,
      j: topLeftCrood.j,
    },
    {
      i: topLeftCrood.i + 1,
      j: topLeftCrood.j,
    },
    {
      i: topLeftCrood.i + 2,
      j: topLeftCrood.j,
    },
    //
    {
      i: topLeftCrood.i,
      j: topLeftCrood.j + 1,
    },
    {
      i: topLeftCrood.i + 1,
      j: topLeftCrood.j + 1,
    },
    {
      i: topLeftCrood.i + 2,
      j: topLeftCrood.j + 1,
    },
    //
    {
      i: topLeftCrood.i,
      j: topLeftCrood.j + 2,
    },
    {
      i: topLeftCrood.i + 1,
      j: topLeftCrood.j + 2,
    },
    {
      i: topLeftCrood.i + 2,
      j: topLeftCrood.j + 2,
    },
  ]

  // console.log([...coords, ...smallSquereCoords].length)

  return [...coords, ...smallSquereCoords]
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
