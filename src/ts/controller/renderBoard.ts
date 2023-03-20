export const renderBoard = (mat: string[][], selector: string) => {
  let strHTML = '<table border="0"><tbody>'
  for (let i = 0; i < mat.length; i++) {
    const borderStyle =
      i < mat.length - 1
        ? i % 3 === 2
          ? 'border-right-bold'
          : 'border-right'
        : ''

    strHTML += `<tr class="${borderStyle}">`

    for (let j = 0; j < mat[0].length; j++) {
      var item = mat[i][j]

      const className = `cell cell-${i}-${j}`

      const borderStyle =
        j < mat[0].length - 1
          ? j % 3 === 2
            ? 'border-bottom-bold'
            : 'border-bottom'
          : ''

      strHTML += `<td  class="${className} ${borderStyle}" >${item}</td>`
    }
    strHTML += '</tr>'
  }
  strHTML += '</tbody></table>'
  const elContainer = document.querySelector(selector)
  if (elContainer) elContainer.innerHTML = strHTML
}
