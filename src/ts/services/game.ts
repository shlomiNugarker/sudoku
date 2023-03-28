import { Coord } from '../../interfaces/coord'
import { State } from '../../interfaces/state'
import { getUniqueObjects } from './utils'

export {
  createBoard,
  setSelectedCell,
  setNumberInMat,
  getSelectedCellCoords,
  getCellCoords,
  getBoardSize,
  getSelectedCellVal,
  getAllAffectedCellCoords,
  checkBoard,
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

const checkBoard = () => {
  let isBoardValid = true
  let invalidCoords: Coord[] = []

  if (!globalState.board) return { isBoardValid, invalidCoords }

  const { board } = globalState

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      const CheckedNumbers: { [key: string]: boolean } = {}
      const coord = { i, j }
      const cellNum = board[i][j]
      const coordsToCheck = getAllAffectedCellCoords(coord)

      for (let k = 0; k < coordsToCheck.length; k++) {
        const currCoordToCheck = coordsToCheck[k]
        const cellNumberToCheck = board[currCoordToCheck.i][currCoordToCheck.j]

        if (!cellNumberToCheck.length) continue

        if (CheckedNumbers[cellNumberToCheck]) {
          invalidCoords.push(currCoordToCheck)
          if (isBoardValid) isBoardValid = false
        } else if (
          !CheckedNumbers[cellNumberToCheck] &&
          cellNum === cellNumberToCheck
        ) {
          CheckedNumbers[cellNumberToCheck] = true
        }
      }
    }
  }

  invalidCoords = getUniqueObjects(invalidCoords)

  return { isBoardValid, invalidCoords }
}

const setSelectedCell = (cell: Element) => {
  globalState.selectedCell = cell
}

const getSelectedCellCoords = (
  cell: Element | null = globalState?.selectedCell
) => {
  if (!cell) return
  return getCellCoords(cell.id)
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

function getAllAffectedCellCoords(coordToCeck: Coord) {
  const { i, j } = coordToCeck
  const coords: Coord[] = []

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
  // small squere coords (3x3):
  const smallSquereCoords: Coord[] = [
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

  const all = getUniqueObjects([...coords, ...smallSquereCoords])

  return all
}

const buildBoard = (size: number = 9) => {
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
