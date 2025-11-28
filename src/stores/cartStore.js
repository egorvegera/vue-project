// src/stores/cartStore.js
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [
      { id: 1, name: 'Apple AirPods Max - Silver', price: 549, quantity: 1 },
      { id: 2, name: 'Apple Watch Series 9 GPS 41mm Starlight', price: 399, quantity: 2 },
    ],
  }),
  getters: {
    count: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: (state) => state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
  },
  actions: {
    increaseQuantity(id) {
      const item = this.items.find((i) => i.id === id)
      if (item) item.quantity++
    },
    decreaseQuantity(id) {
      const item = this.items.find((i) => i.id === id)
      if (item && item.quantity > 1) {
        item.quantity--
      } else if (item && item.quantity === 1) {
        this.removeItem(id)
      }
    },
    removeItem(id) {
      this.items = this.items.filter((i) => i.id !== id)
    },
    // В actions добавь:
    addItem(product) {
      const existing = this.items.find((i) => i.id === product.id)
      if (existing) {
        existing.quantity += product.quantity || 1
      } else {
        this.items.push({ ...product, quantity: product.quantity || 1 })
      }
    },
  },
})
