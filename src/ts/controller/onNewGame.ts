import { getInitialBoard, startNewGame } from '../services/game'
import addListeners from './addListeners'
import { renderBoard } from './renderBoard'

export default function onNewGame() {
  const board = startNewGame()
  const initialBoard = getInitialBoard()

  board && initialBoard && renderBoard(board, '.board', initialBoard)
  addListeners()
}
