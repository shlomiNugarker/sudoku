export default function cleanAffectedCells() {
  const cells = document.querySelectorAll('.affected')
  cells.forEach((cell) => cell.classList.remove('affected'))
}
