import { setNumberInMat } from '../services/game'
import onUpdateCell from './onUpdateCell'

export default function onSetNumberInCell(num: string) {
  const updatedCell = setNumberInMat(num)
  onUpdateCell(updatedCell)
}
