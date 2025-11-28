<!-- src/components/ui/FavoriteButton.vue -->
<template>
  <button
    class="favorite-btn"
    @click.prevent="toggleFavorite"
    :class="{ active: isFavorite }"
    aria-label="Добавить в избранное"
  >
    <img src="@/assets/heart.svg" alt="" class="heart-icon empty" />
    <img src="@/assets/heart-filled.svg" alt="" class="heart-icon filled" />
  </button>
</template>

<script setup>
import { computed } from 'vue'
import { useFavoriteStore } from '@/stores/favoriteStore'

const props = defineProps({
  product: { type: Object, required: true },
})

const favoriteStore = useFavoriteStore()

const isFavorite = computed(() => favoriteStore.items.some((item) => item.id === props.product.id))

const toggleFavorite = () => {
  favoriteStore.toggleItem(props.product)
}
</script>

<style scoped>
.favorite-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  background: transparent;
  border: none;
  padding: 0;
  width: 32px;
  height: 32px;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
}

.favorite-btn:hover {
  transform: scale(1.15);
}

/* Убираем кружок полностью — только иконка */
.favorite-btn::before {
  content: none;
}

/* Иконки */
.heart-icon {
  width: 24px;
  height: 24px;
  position: absolute;
  transition: all 0.35s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  pointer-events: none;
}

/* Пустое сердечко */
.empty {
  opacity: 1;
  transform: scale(1);
}

/* Заполненное — изначально скрыто */
.filled {
  opacity: 0;
  transform: scale(0.3);
  transform-origin: center;
}

/* При активном состоянии — плавная смена */
.favorite-btn.active .empty {
  opacity: 0;
  transform: scale(0.3);
}

.favorite-btn.active .filled {
  opacity: 1;
  transform: scale(1);
}
</style>
