<!-- src/components/ProductList.vue -->
<template>
  <div class="product-list">
    <div class="search-bar" v-if="!hideSearch">
      <input
        v-model="localQuery"
        type="text"
        placeholder="Search products..."
        class="search-input"
      />
    </div>

    <!-- Сетка товаров -->
    <div class="products-grid">
      <ProductCard v-for="item in filteredProducts" :key="item.id" :product="item" />
    </div>

    <div v-if="filteredProducts.length === 0" class="no-results">
      <p>Ничего не найдено по запросу "{{ localQuery }}"</p>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch, inject } from 'vue'
import ProductCard from '@/components/ProductCard.vue'

const props = defineProps({
  products: { type: Array, required: true },
  hideSearch: { type: Boolean, default: false },
})

const localQuery = ref('')

const globalQuery = inject('searchQuery', null)
const searchQuery = globalQuery || localQuery

// Фильтруем товары по названию
const filteredProducts = computed(() => {
  if (!searchQuery.value.trim()) return props.products

  const query = searchQuery.value.toLowerCase()
  return props.products.filter((product) => product.name.toLowerCase().includes(query))
})

// Синхронизация с глобальным поиском
watch(globalQuery, (newVal) => {
  if (globalQuery) localQuery.value = newVal || ''
})
</script>

<style scoped>
.product-list {
  padding: 40px 60px;
  max-width: 1600px;
  margin: 0 auto;
}

.search-bar {
  margin-bottom: 32px;
  max-width: 600px;
}

.search-input {
  width: 100%;
  padding: 16px 56px 16px 20px;
  border: 1px solid #ddd;
  border-radius: 12px;
  font-size: 18px;
  font-family: 'Abel', sans-serif;
  outline: none;
  transition: all 0.3s ease;
}

.search-input:focus {
  border-color: #000;
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 30px;
}

.no-results {
  text-align: center;
  padding: 80px 20px;
  color: #999;
  font-size: 24px;
}
</style>
