import { createBoard } from '../services/game'
import addListeners from './addListeners'

import { renderBoard } from './renderBoard'

export const onLoad = () => {
  const board = createBoard()
  board && renderBoard(board, '.board')
  addListeners()
}
