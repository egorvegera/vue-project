// src/api/products.js
let cachedProducts = null

export const getProducts = async () => {
  if (cachedProducts) return cachedProducts

  try {
    const res = await fetch('/data/products.json')
    if (!res.ok) throw new Error('Failed to load')
    const data = await res.json()
    cachedProducts = data
    return data
  } catch (err) {
    console.error('Ошибка загрузки товаров:', err)
    return []
  }
}
