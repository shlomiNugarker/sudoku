import { getAllSimilarNumsCroods } from '../services/game'

export default function markAllSimilarNums(cell: Element) {
  document
    .querySelectorAll('.similar')
    .forEach((cell) => cell.classList.remove('similar'))

  if (!cell.textContent?.length) return
  const coords = getAllSimilarNumsCroods(cell.textContent)

  if (coords) {
    coords.forEach((coord) => {
      document.getElementById(`${coord.i}-${coord.j}`)?.classList.add('similar')
    })
  }
}
