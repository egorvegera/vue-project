<!-- src/views/CartView.vue -->
<template>
  <div class="cart-page">
    <div class="cart-container">
      <!-- Заголовок -->
      <h1 class="page-title">Cart ({{ cartStore.count }})</h1>

      <!-- Левая колонка: товары -->
      <div class="cart-items">
        <div v-for="item in cartStore.items" :key="item.id" class="cart-item">
          <div class="item-image">
            <img :src="getImage(item.id)" alt="item.name" />
          </div>

          <div class="item-details">
            <h3 class="item-name">{{ item.name }}</h3>
            <p class="item-price">${{ item.price }}</p>
          </div>

          <div class="quantity-controls">
            <button @click="cartStore.decreaseQuantity(item.id)" :disabled="item.quantity <= 1">
              <span>-</span>
            </button>
            <span class="quantity">{{ item.quantity }}</span>
            <button @click="cartStore.increaseQuantity(item.id)">
              <span>+</span>
            </button>
          </div>

          <div class="item-total">
            <p class="total-price">${{ item.price * item.quantity }}</p>
            <button class="remove-btn" @click="cartStore.removeItem(item.id)">
              <span>×</span>
            </button>
          </div>
        </div>

        <!-- Пустая корзина -->
        <div v-if="cartStore.items.length === 0" class="empty-cart">
          <p>Ваша корзина пуста</p>
        </div>
      </div>

      <!-- Правая колонка: итог -->
      <div class="cart-summary">
        <h2 class="summary-title">Order Summary</h2>

        <div class="promo-code">
          <input type="text" placeholder="Enter promo code" />
          <button>Apply</button>
        </div>

        <div class="summary-row">
          <span>Subtotal</span>
          <strong>${{ cartStore.totalPrice }}</strong>
        </div>
        <div class="summary-row">
          <span>Shipping</span>
          <strong>Free</strong>
        </div>
        <hr />
        <div class="summary-row total">
          <span>Total</span>
          <strong>${{ cartStore.totalPrice }}</strong>
        </div>

        <button class="checkout-btn">Proceed to Checkout</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cartStore'

const cartStore = useCartStore()

const getImage = (id) => {
  const map = {
    1: '/src/assets/airpods-max.png',
    2: '/src/assets/apple watch.png',
  }
  return map[id] || '/src/assets/placeholder.png'
}
</script>

<style scoped>
.cart-page {
  padding: 60px 120px;
  background: #fafafa;
  min-height: 100vh;
  font-family: 'Abel', sans-serif;
}

.cart-container {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 60px;
}

.page-title {
  grid-column: 1 / -1;
  font-size: 36px;
  font-weight: 400;
  margin: 0 0 40px 0;
  color: #000;
}

/* Товары */
.cart-items {
  background: white;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.cart-item {
  display: grid;
  grid-template-columns: 100px 1fr 150px 150px;
  align-items: center;
  gap: 24px;
  padding: 20px 0;
  border-bottom: 1px solid #eee;
}

.cart-item:last-child {
  border-bottom: none;
}

.item-image {
  width: 100px;
  height: 100px;
  background: #f5f5f5;
  border-radius: 12px;
  overflow: hidden;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.item-name {
  font-family: 'ABeeZee', sans-serif;
  font-style: italic;
  font-size: 18px;
  margin: 0 0 8px 0;
  color: #000;
}

.item-price {
  font-size: 18px;
  color: #000;
  font-weight: bold;
  margin: 0;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 16px;
  background: #f5f5f5;
  border-radius: 8px;
  padding: 8px 16px;
  width: fit-content;
}

.quantity-controls button {
  width: 32px;
  height: 32px;
  background: white;
  border: none;
  border-radius: 50%;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quantity {
  font-size: 18px;
  min-width: 30px;
  text-align: center;
}

.item-total {
  text-align: right;
}

.total-price {
  font-size: 20px;
  font-weight: bold;
  margin: 0 0 12px 0;
}

.remove-btn {
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: #999;
  padding: 4px;
}

.remove-btn:hover {
  color: #db4444;
}

/* Итоговая колонка */
.cart-summary {
  background: white;
  border-radius: 12px;
  padding: 32px;
  height: fit-content;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.summary-title {
  font-size: 24px;
  margin: 0 0 24px 0;
}

.promo-code {
  display: flex;
  margin-bottom: 24px;
}

.promo-code input {
  flex: 1;
  padding: 14px;
  border: 1px solid #ddd;
  border-radius: 8px 0 0 8px;
  font-size: 16px;
}

.promo-code button {
  padding: 0 24px;
  background: #000;
  color: white;
  border: none;
  border-radius: 0 8px 8px 0;
  cursor: pointer;
  font-weight: bold;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  margin-bottom: 16px;
}

.summary-row.total {
  font-size: 24px;
  font-weight: bold;
  color: #000;
  margin: 24px 0;
}

.checkout-btn {
  width: 100%;
  padding: 16px;
  background: #000;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 24px;
}

.checkout-btn:hover {
  background: #333;
}

.empty-cart {
  text-align: center;
  padding: 80px 20px;
  color: #999;
  font-size: 20px;
}

/* Адаптив */
@media (max-width: 1024px) {
  .cart-container {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .cart-item {
    grid-template-columns: 80px 1fr auto;
    gap: 16px;
  }
  .quantity-controls,
  .item-total {
    grid-column: 3;
    text-align: right;
  }
}
</style>
