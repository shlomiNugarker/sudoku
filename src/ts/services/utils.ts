export { shuffleArray, getRandomInt, getUniqueObjects }

function shuffleArray<T>(array: T[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))

    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }

  return array
}

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function getUniqueObjects<T>(array: T[]): T[] {
  const uniqueObjects: { [key: string]: any } = {}

  array.forEach((obj) => {
    const str = JSON.stringify(obj)
    uniqueObjects[str] = obj
  })

  return Object.values(uniqueObjects)
}
