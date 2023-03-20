import { State } from '../../interfaces/state'
import { buildBoard } from '../controller/buildBoard'

export { createBoard }

const globalState: State = {
  board: null,
  selectedCell: null,
}

const createBoard = (size: number) => {
  const newBoard = buildBoard(size)
  globalState.board = newBoard
  return globalState.board
}
