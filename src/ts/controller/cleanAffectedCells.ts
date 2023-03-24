export default function cleanAffectedCells() {
  document
    .querySelectorAll('.affected')
    .forEach((cell) => cell.classList.remove('affected'))
}
