<!-- src/views/ProductsView.vue -->
<template>
  <div class="products-page">
    <div class="container">
      <div class="page-header">
        <h1></h1>

        <!-- Кнопка сортировки -->
        <button @click="toggleSort" class="filter-btn">
          <span v-if="sortOrder === 'low'">Price: Low to High</span>
          <span v-else-if="sortOrder === 'high'">Price: High to Low</span>
          <span v-else>Sort by Price</span>
        </button>
      </div>

      <!-- Сетка товаров -->
      <div class="products-grid">
        <ProductCard v-for="product in sortedProducts" :key="product.id" :product="product" />
      </div>

      <!-- Если ничего не найдено -->
      <div v-if="sortedProducts.length === 0" class="empty-state">Ничего не найдено</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import ProductCard from '@/components/ui/ProductCard.vue'
import { getProducts } from '@/api/products'

const products = ref([])
const route = useRoute()
const sortOrder = ref(null)

// Загружаем товары один раз
onMounted(async () => {
  products.value = await getProducts()
})

// Поиск из хедера
const filteredProducts = computed(() => {
  const query = route.query.search?.toString().toLowerCase() || ''
  if (!query) return products.value
  return products.value.filter((p) => p.name.toLowerCase().includes(query))
})

// Сортировка
const sortedProducts = computed(() => {
  const items = [...filteredProducts.value]
  if (sortOrder.value === 'low') return items.sort((a, b) => a.price - b.price)
  if (sortOrder.value === 'high') return items.sort((a, b) => b.price - a.price)
  return items
})

const toggleSort = () => {
  sortOrder.value = sortOrder.value === 'low' ? 'high' : 'low'
}
</script>

<style scoped>
.products-page {
  min-height: 100vh;
  background: #fafafa;
  padding: 60px 0;
}

.container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 20px;
  text-align: center;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px;
  flex-wrap: wrap;
  gap: 20px;
}

h1 {
  margin: 0;
  font-family: 'Abel', sans-serif;
  font-size: 36px;
  color: #000;
}

.filter-btn {
  padding: 12px 24px;
  background: #000;
  color: white;
  border: none;
  border-radius: 8px;
  font-family: 'ABeeZee', sans-serif;
  font-style: italic;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
  white-space: nowrap;
}

.filter-btn:hover {
  background: #333;
  transform: translateY(-2px);
}

.filter-btn:active {
  transform: translateY(0);
}

/* Сетка по центру */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 40px 30px;
  justify-content: center;
  justify-items: center;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 20px;
}

.empty-state {
  text-align: center;
  padding: 80px 20px;
  font-size: 24px;
  color: #888;
  font-style: italic;
}
::v-deep(.product-card),
.product-card {
  width: 270px !important;
  max-width: 100%;
}

@media (max-width: 768px) {
  .products-grid {
    gap: 30px 20px;
    padding: 0 16px;
  }
}

@media (max-width: 480px) {
  .products-grid {
    gap: 30px;
    padding: 0 12px;
  }
}
</style>
