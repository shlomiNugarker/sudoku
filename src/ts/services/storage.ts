export { store, load }

function store<T>(key: string, value: T) {
  localStorage[key] = JSON.stringify(value)
}

function load<T>(key: string, defaultValue: T | null = null) {
  const value = localStorage[key] || defaultValue
  return JSON.parse(value)
}
