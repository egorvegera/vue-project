<!-- src/views/FavoriteView.vue -->
<template>
  <div class="favorite-page">
    <div class="favorite-container">
      <h1 class="favorite-title">Favorite</h1>

      <div class="favorite-list">
        <div v-for="item in favoriteStore.items" :key="item.id" class="favorite-item">
          <div class="item-image">
            <img :src="getImage(item.id)" alt="Product" />
          </div>

          <div class="item-info">
            <h3 class="item-name">{{ item.name }}</h3>
            <p class="item-id">#25139526913984</p>
          </div>

          <button
            class="toggle-btn"
            @click="favoriteStore.toggleItem(item)"
            :class="{ active: favoriteStore.hasItem(item.id) }"
          ></button>
        </div>

        <!-- Пустое состояние -->
        <div v-if="favoriteStore.items.length === 0" class="empty-favorite">
          <p>В избранном пока пусто</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useFavoriteStore } from '@/stores/favoriteStore'

const favoriteStore = useFavoriteStore()

// Картинки по id
const getImage = (id) => {
  if (id === 1) return new URL('@/assets/airpods-max.png', import.meta.url).href
  if (id === 2) return new URL('@/assets/apple watch.png', import.meta.url).href
  if (id === 3) return new URL('@/assets/iphone14pro.png', import.meta.url).href
  if (id === 4) return new URL('@/assets/macbook.png', import.meta.url).href
  return new URL('@/assets/placeholder.png', import.meta.url).href
}
</script>

<style scoped>
.favorite-page {
  padding: 112px 160px 141px 535px;
  background: #fff;
  min-height: 100vh;
}
.favorite-container {
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  gap: 48px;
}
.favorite-title {
  font-family: 'Abel', sans-serif;
  font-size: 24px;
  margin: 0 0 40px;
  width: 349px;
}
.favorite-list {
  width: 324px;
  background: #fff;
  border-radius: 15px;
  overflow: hidden;
}
.favorite-item {
  display: flex;
  align-items: center;
  padding: 16px 0;
  gap: 15px;
  height: 122px;
  position: relative;
}
.item-image {
  width: 90px;
  height: 90px;
  border-radius: 8px;
  overflow: hidden;
  background: #f5f5f5;
  flex-shrink: 0;
}
.item-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.item-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.item-name {
  font-family: 'ABeeZee', sans-serif;
  font-style: italic;
  font-size: 16px;
  line-height: 24px;
  margin: 0;
}
.item-id {
  font-family: 'Abel', sans-serif;
  font-size: 14px;
  opacity: 0.7;
  margin: 0;
}
.toggle-btn {
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  opacity: 0.6;
  transition: all 0.2s;
}
.toggle-btn:hover {
  opacity: 1;
  transform: scale(1.1);
}
.toggle-btn.active {
  color: #000000;
  opacity: 1;
}
.toggle-btn.active::after {
  content: '×';
  font-size: 36px;
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
}
.empty-favorite {
  padding: 60px 20px;
  text-align: center;
  color: #999;
  font-size: 20px;
}
@media (max-width: 1024px) {
  .favorite-page {
    padding: 80px 40px;
  }
  .favorite-container {
    justify-content: center;
  }
}
</style>
