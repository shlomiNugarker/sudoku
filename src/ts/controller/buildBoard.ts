export const buildBoard = (size: number) => {
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
