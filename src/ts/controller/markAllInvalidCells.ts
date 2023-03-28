import { Coord } from '../../interfaces/coord'

export default function markAllInvalidCells(invalidCoords: Coord[]) {
  // document
  //   .querySelectorAll('.red')
  //   .forEach((cell) => cell.classList.remove('red'))

  invalidCoords.forEach((coord) => {
    document.getElementById(`${coord.i}-${coord.j}`)?.classList.add('red')
  })
}
