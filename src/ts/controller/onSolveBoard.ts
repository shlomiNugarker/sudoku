import {
  getBoard,
  getInitialBoard,
  getNumOfTriesToSolve,
  setBoard,
  solveSudoku,
} from '../services/game'
import addListeners from './addListeners'
import { renderBoard } from './renderBoard'

export default function onSolveBoard() {
  const currBoard = getBoard()
  if (!currBoard) return
  const solvedBoard = solveSudoku(currBoard)
  const tries = getNumOfTriesToSolve()
  if (solvedBoard) {
    alert(tries + ' moves to solve the sudoku!')
    setBoard(solvedBoard)

    const initialBoard = getInitialBoard()
    solvedBoard &&
      initialBoard &&
      renderBoard(solvedBoard, '.board', initialBoard)
    addListeners()
  } else {
    alert(tries + " tries... Coudn't solve the sudoku")
  }
}
