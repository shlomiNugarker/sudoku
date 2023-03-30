import { createBoard, getInitialBoard } from '../services/game'
import addListeners from './addListeners'

import { renderBoard } from './renderBoard'

export const onLoad = () => {
  const board = createBoard()
  const initialBoard = getInitialBoard()
  board && initialBoard && renderBoard(board, '.board', initialBoard)
  addListeners()
}
