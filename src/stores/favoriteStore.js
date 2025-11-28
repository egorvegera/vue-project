// src/stores/favoriteStore.js
import { defineStore } from 'pinia'

export const useFavoriteStore = defineStore('favorite', {
  state: () => ({
    items: [
      { id: 1, name: 'Apple AirPods Max - Silver' },
      { id: 2, name: 'Apple Watch Series 9 GPS 41mm Starlight Aluminium Case' },
    ],
  }),
  getters: {
    count: (state) => state.items.length,
    hasItem: (state) => (id) => state.items.some((item) => item.id === id),
  },
  actions: {
    addItem(product) {
      if (!this.items.find((i) => i.id === product.id)) {
        this.items.push(product)
      }
    },
    removeItem(id) {
      this.items = this.items.filter((i) => i.id !== id)
    },
    toggleItem(product) {
      if (this.hasItem(product.id)) {
        this.removeItem(product.id)
      } else {
        this.addItem(product)
      }
    },
  },
})
