import { Coord } from '../../interfaces/coord'

export default function markAllInvalidCells(invalidCoords: Coord[]) {
  invalidCoords.forEach((coord) => {
    document.getElementById(`${coord.i}-${coord.j}`)?.classList.add('red')
  })
}
