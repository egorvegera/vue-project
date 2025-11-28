<!-- src/components/Layout/Header.vue -->
<template>
  <header class="app-header">
    <div class="app-header__left">
      <router-link to="/" class="logo-link">
        <img src="@/assets/logoblack.svg" alt="Exclusive" class="logo-img" />
      </router-link>
    </div>

    <div class="app-header__center">
      <div class="search-wrapper">
        <!-- Поисковая строка -->
        <div class="search-field">
          <input
            v-model="searchQuery"
            @focus="showDropdown = true"
            @blur="hideDropdown"
            @keyup.enter="goToSearch"
            type="text"
            placeholder="Search"
            class="search-input"
          />
          <button @click="goToSearch" class="search-btn">
            <img src="@/assets/SearchIcon.svg" alt="Search" />
          </button>
        </div>

        <!-- Выпадающий список -->
        <transition name="dropdown">
          <div
            v-if="showDropdown && searchQuery.trim() && filteredResults.length"
            class="search-dropdown"
          >
            <div
              v-for="product in filteredResults"
              :key="product.id"
              class="dropdown-item"
              @mousedown.prevent
              @click="selectProductFromSearch(product)"
            >
              <img :src="product.image" alt="" class="item-img" />
              <div class="item-text">
                <p class="item-name">{{ product.name }}</p>
                <p class="item-price">${{ product.price }}</p>
              </div>
            </div>
            <div class="dropdown-footer" @mousedown.prevent @click="goToSearch">
              Показать все результаты ({{ filteredResults.length }})
            </div>
          </div>
        </transition>

        <transition name="dropdown">
          <div
            v-if="showDropdown && searchQuery.trim() && !filteredResults.length"
            class="search-dropdown empty"
          >
            Ничего не найдено
          </div>
        </transition>
      </div>
    </div>

    <div class="app-header__right">
      <router-link to="/favorite" class="icon-link">
        <img src="@/assets/like.svg" alt="Favorite" class="icon" />
        <span class="badge" v-if="favoriteStore.count > 0">{{ favoriteStore.count }}</span>
      </router-link>

      <router-link to="/cart" class="icon-link">
        <img src="@/assets/carticon.svg" alt="Cart" class="icon" />
        <span class="badge" v-if="cartStore.count > 0">{{ cartStore.count }}</span>
      </router-link>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useFavoriteStore } from '@/stores/favoriteStore'
import { useCartStore } from '@/stores/cartStore'
import { getProducts } from '@/api/products'

const router = useRouter()
const favoriteStore = useFavoriteStore()
const cartStore = useCartStore()

const searchQuery = ref('')
const showDropdown = ref(false)
const allProducts = ref([])

onMounted(async () => {
  allProducts.value = await getProducts()
})

const filteredResults = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return []
  return allProducts.value.filter((p) => p.name.toLowerCase().includes(q)).slice(0, 5)
})

const selectProductFromSearch = (product) => {
  searchQuery.value = product.name
  showDropdown.value = false
  router.push({ path: '/products', query: { search: product.name } })
}

const goToSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ path: '/products', query: { search: searchQuery.value.trim() } })
  }
  showDropdown.value = false
}

const hideDropdown = () => setTimeout(() => (showDropdown.value = false), 150)
</script>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 60px;
  background: #fff;
  border-bottom: 1px solid #e0e0e0;
  height: 80px;
  box-sizing: border-box;
}

.app-header__left,
.app-header__right {
  flex: 0 0 auto;
}

.app-header__center {
  flex: 1;
  display: flex;
  justify-content: center;
  max-width: 400px;
}

.logo-img {
  width: 95.95px;
  height: 28.28px;
}

/* Поиск */
.search-field {
  position: relative;
  width: 100%;
  height: 56px;
  background: #f5f5f5;
  border-radius: 8px;
}

.search-input {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  padding: 0 50px 0 48px;
  background: transparent;
  font-family: 'ABeeZee', sans-serif;
  font-style: italic;
  font-size: 18px;
  color: #000;
}

.search-input::placeholder {
  color: #656565;
  opacity: 0.7;
}

.search-btn {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  width: 24px;
  height: 24px;
}

.search-btn img {
  width: 24px;
  height: 24px;
}

/* Иконки справа */
.app-header__right {
  display: flex;
  gap: 32px;
}
.icon-link {
  position: relative;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background 0.2s;
}
.icon-link:hover {
  background: #f0f0f0;
}
.icon {
  width: 28px;
  height: 28px;
}
.badge {
  position: absolute;
  top: -2px;
  right: -4px;
  background: #db4444;
  color: white;
  font-size: 10px;
  font-weight: bold;
  min-width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #fff;
}

/* Дропдаун */
.search-wrapper {
  position: relative;
  width: 100%;
}

.search-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  z-index: 1000;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 20px;
  cursor: pointer;
  transition: background 0.2s;
}
.dropdown-item:hover {
  background: #f9f9f9;
}

.item-img {
  width: 50px;
  height: 50px;
  object-fit: contain;
  border-radius: 8px;
  background: #f5f5f5;
}
.item-name {
  margin: 0;
  font-size: 14px;
  font-weight: 500;
}
.item-price {
  margin-top: 4px;
  font-size: 14px;
  color: #db4444;
  font-weight: bold;
}

.dropdown-footer {
  padding: 14px;
  background: #f5f5f5;
  text-align: center;
  cursor: pointer;
  font-size: 14px;
}
.dropdown-footer:hover {
  background: #e8e8e8;
}

.empty {
  padding: 32px;
  text-align: center;
  color: #888;
  font-style: italic;
}

/* Анимация */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.25s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
