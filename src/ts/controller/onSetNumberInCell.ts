import { setNumberInMat } from '../services/game'

export default function onSetNumberInCell(num: string) {
  const updatedCell = setNumberInMat(num)
  onUpdateCell(updatedCell)
}

const onUpdateCell = (
  updatedCell: {
    num: string
    i: number
    j: number
  } | null
) => {
  if (!updatedCell) return
  const elToUpadate = document.getElementById(
    `${updatedCell.i}-${updatedCell.j}`
  )
  if (elToUpadate) elToUpadate.innerHTML = updatedCell.num
}
