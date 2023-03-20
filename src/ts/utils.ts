function buildBoard(size: number) {
  var board: any[][] = []
  for (var i = 0; i < size; i++) {
    board[i] = []
    for (var j = 0; j < size; j++) {
      var cell = 'x'
      board[i][j] = cell
    }
  }
  return board
}
