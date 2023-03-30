export const renderBoard = (
  mat: string[][],
  selector: string,
  initialMat: string[][]
) => {
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
      const item = mat[i][j]

      const className = `cell`

      const constantNumStyle = initialMat[i][j] ? 'constant' : ''

      const borderStyle =
        j < mat[0].length - 1
          ? j % 3 === 2
            ? 'border-bottom-bold'
            : 'border-bottom'
          : ''

      strHTML += `<td  class="${className} ${borderStyle} ${constantNumStyle}" id="${i}-${j}"  >${item}</td>`
    }
    strHTML += '</tr>'
  }
  strHTML += '</tbody></table>'
  const elContainer = document.querySelector(selector)
  if (elContainer) elContainer.innerHTML = strHTML
}
