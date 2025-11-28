<!-- src/components/ProductCard.vue -->
<template>
  <div class="product-card">
    <div class="image-wrapper">
      <img :src="product.image" :alt="product.name" class="product-image" />
      <FavoriteButton :product="product" />
    </div>

    <div class="product-info">
      <div class="content">
        <h3 class="product-name">{{ product.name }}</h3>
        <p class="product-price">${{ product.price }}</p>
      </div>

      <button class="buy-now-btn" @click="addToCart">
        {{ isInCart ? 'Added' : 'Buy Now' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import FavoriteButton from '@/components/ui/FavoriteButton.vue'
import { useCartStore } from '@/stores/cartStore'

const props = defineProps({
  product: { type: Object, required: true },
})

const cartStore = useCartStore()

const isInCart = computed(() => cartStore.items.some((item) => item.id === props.product.id))

const addToCart = () => {
  cartStore.addItem({
    id: props.product.id,
    name: props.product.name,
    price: props.product.price,
    image: props.product.image,
    quantity: 1,
  })
}
</script>

<style scoped>
.product-card {
  width: 268px;
  background: #f5f5f5;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 432px;
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
}

.image-wrapper {
  position: relative;
  width: 100%;
  height: 250px;
  background: #f5f5f5;
  overflow: hidden;
}

.product-image {
  width: 50%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.4s ease;
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

.product-info {
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
}

.content {
  flex-grow: 1;
}

.product-name {
  font-family: 'ABeeZee', sans-serif;
  font-style: italic;
  font-size: 16px;
  line-height: 1.4;
  margin: 0 0 8px 0;
  color: #000;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-price {
  font-family: 'Abel', sans-serif;
  font-size: 20px;
  font-weight: bold;
  color: #000;
  margin: 0;
}

.buy-now-btn {
  width: 100%;
  padding: 14px;
  background: #000;
  color: white;
  border: none;
  border-radius: 8px;
  font-family: 'Abel', sans-serif;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease;
  margin-top: 12px;
}

.buy-now-btn:hover {
  background: #333;
}

.buy-now-btn:active {
  background: #111;
}
</style>
