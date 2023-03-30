import {
  getBoard,
  getInitialBoard,
  setBoard,
  solveSudoku,
} from '../services/game'
import addListeners from './addListeners'
import { renderBoard } from './renderBoard'

export default function onSolveBoard() {
  const currBoard = getBoard()
  if (!currBoard) return
  const solvedBoard = solveSudoku(currBoard)
  if (solvedBoard) {
    setBoard(solvedBoard)

    const initialBoard = getInitialBoard()
    solvedBoard &&
      initialBoard &&
      renderBoard(solvedBoard, '.board', initialBoard)
    addListeners()
  }
}
