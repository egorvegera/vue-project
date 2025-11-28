<!-- src/views/HomeView.vue -->
<template>
  <div class="home">
    <!-- HERO BANNER -->
    <section class="hero-banner">
      <div class="hero-content">
        <p class="pretitle">Pro.Beyond.</p>
        <h1 class="title">IPhone 14 <strong>Pro</strong></h1>
        <p class="subtitle">Created to change everything for the better. For everyone</p>
        <router-link to="/products" class="shop-btn">Shop Now</router-link>
      </div>
      <div class="hero-image">
        <img src="@/assets/iphone-hero.png" alt="iPhone 14 Pro" />
      </div>
    </section>

    <!-- SMALLER BANNERS -->
    <section class="smaller-banners">
      <div class="banners-wrapper">
        <div class="left-column">
          <div class="banner ps5-banner">
            <div class="banner-content">
              <h3>Playstation 5</h3>
              <p>
                Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O will redefine your
                PlayStation experience.
              </p>
            </div>
            <img src="@/assets/ps5.png" alt="PlayStation 5" class="banner-img ps5-img" />
          </div>

          <div class="small-banners-row">
            <div class="banner airpods-banner">
              <div class="banner-content">
                <h3>Apple<br />AirPods<br /><strong>Max</strong></h3>
                <p>Computational audio. Listen, it's powerful</p>
              </div>
              <img src="@/assets/airpods.png" alt="AirPods Max" class="banner-img" />
            </div>
            <div class="banner vision-banner">
              <div class="banner-content">
                <h3>Apple<br />Vision <strong>Pro</strong></h3>
                <p>An immersive way to experience entertainment</p>
              </div>
              <img src="@/assets/vision.png" alt="Vision Pro" class="banner-img" />
            </div>
          </div>
        </div>

        <div class="banner macbook-banner">
          <div class="banner-content">
            <h3>Macbook Air</h3>
            <p>
              The new 15‑inch MacBook Air makes room for more of what you love with a spacious
              Liquid Retina display.
            </p>
            <router-link to="/products" class="shop-btn black">Shop Now</router-link>
          </div>
          <img src="@/assets/macbook.png" alt="MacBook Air" class="banner-img macbook-img" />
        </div>
      </div>
    </section>

    <!-- CATEGORY -->
    <section class="category-section">
      <div class="category-container">
        <div class="category-header">
          <h2 class="category-title">Browse By Category</h2>
          <div class="arrows">
            <button class="arrow-btn"><img src="@/assets/arrow-left.svg" alt="Prev" /></button>
            <button class="arrow-btn"><img src="@/assets/arrow-right.svg" alt="Next" /></button>
          </div>
        </div>

        <div class="category-grid">
          <div class="category-card">
            <img src="@/assets/cat-phones.png" alt="Phones" /><span>Phones</span>
          </div>
          <div class="category-card">
            <img src="@/assets/cat-watches.png" alt="Smart Watches" /><span>Smart Watches</span>
          </div>
          <div class="category-card">
            <img src="@/assets/cat-cameras.png" alt="Cameras" /><span>Cameras</span>
          </div>
          <div class="category-card">
            <img src="@/assets/cat-headphones.png" alt="Headphones" /><span>Headphones</span>
          </div>
          <div class="category-card">
            <img src="@/assets/cat-computers.png" alt="Computers" /><span>Computers</span>
          </div>
          <div class="category-card">
            <img src="@/assets/cat-gaming.png" alt="Gaming" /><span>Gaming</span>
          </div>
        </div>
      </div>
    </section>

    <!-- BEST SELLING -->
    <section class="best-selling">
      <div class="container">
        <div class="section-header">
          <h2>Best Selling</h2>
          <router-link to="/products" class="view-all" @click.prevent="$router.push('/products')">
            View All →
          </router-link>
        </div>

        <div class="best-selling-grid">
          <ProductCard
            v-for="product in bestSellingProducts"
            :key="product.id"
            :product="product"
          />
        </div>
      </div>
    </section>
    <!-- BANNER 2 — Big Summer Sale -->
    <section class="summer-banner">
      <div class="summer-image-left">
        <img src="@/assets/left.webp" alt="Apple Watch & iPhone" class="left-main" />
      </div>

      <div class="summer-image-right">
        <img src="@/assets/right.webp" alt="iPad & MacBook" class="right-main" />
      </div>

      <div class="summer-content">
        <h2 class="summer-title">Big Summer <strong>Sale</strong></h2>
        <p class="summer-subtitle">Commodo fames vitae vitae leo mauris in. Eu consequat.</p>
        <router-link to="/products" class="shop-btn">Shop Now</router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ProductCard from '@/components/ui/ProductCard.vue'
import { getProducts } from '@/api/products'

const bestSellingProducts = ref([])

onMounted(async () => {
  const all = await getProducts()
  bestSellingProducts.value = all.filter((p) => p.oldPrice).slice(0, 4)

  if (bestSellingProducts.value.length < 4) {
    const withoutDiscount = all.filter((p) => !p.oldPrice)
    bestSellingProducts.value = [
      ...bestSellingProducts.value,
      ...withoutDiscount.slice(0, 4 - bestSellingProducts.value.length),
    ]
  }
})
</script>

<style scoped>
.home {
  font-family:
    'Inter',
    'SF Pro Display',
    -apple-system,
    BlinkMacSystemFont,
    sans-serif;
  background: #fff;
}

/* HERO */
.hero-banner {
  position: relative;
  width: 100%;
  max-width: 1440px;
  height: 632px;
  margin: 0 auto;
  background: linear-gradient(90.7deg, #211c24 0.64%, #211c24 101%);
  padding: 0 160px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  overflow: hidden;
}

.hero-content {
  color: #fff;
  max-width: 714px;
  z-index: 2;
}
.pretitle {
  margin: 0;
  font-family: 'Abel', sans-serif;
  font-size: 25px;
  opacity: 0.4;
}
.title {
  margin: 16px 0 24px;
  font-family: 'Abel', sans-serif;
  font-size: 96px;
  line-height: 72px;
  letter-spacing: -0.01em;
}
.subtitle {
  margin: 0 0 32px;
  font-size: 18px;
  font-style: italic;
  color: #919191;
}
:deep(.shop-btn) {
  width: 188px;
  height: 56px;
  border: 1px solid #fff;
  border-radius: 6px;
  background: transparent;
  color: #fff;
  font-family: 'ABeeZee', sans-serif;
  font-style: italic;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}

:deep(.shop-btn):hover {
  background: rgba(255, 255, 255, 0.1);
}

:deep(.shop-btn.black) {
  border-color: #000;
  color: #000;
}
:deep(.shop-btn.black):hover {
  background: #000;
  color: #fff;
}
.hero-image {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 406px;
  height: 632px;
}
.hero-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* SMALLER BANNERS */
.smaller-banners {
  background: #fff;
}
.banners-wrapper {
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  height: 600px;
  gap: 0;
}

.left-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0;
}

/* PS5 */
.ps5-banner {
  position: relative;
  height: 328px;
  background: #fff;
  overflow: hidden;
}
.ps5-banner .banner-content {
  position: absolute;
  right: 48px;
  top: 50%;
  transform: translateY(-50%);
  width: 338px;
  text-align: right;
  z-index: 2;
}
.ps5-img {
  position: absolute;
  left: 0;
  top: 0;
  width: 340px;
  height: 100%;
  object-fit: cover;
}

/* AirPods + Vision */
.small-banners-row {
  display: flex;
  height: 272px;
  gap: 0;
}
.airpods-banner {
  flex: 1;
  position: relative;
  background: #ededed;
  overflow: hidden;
}
.vision-banner {
  flex: 1;
  position: relative;
  background: #353535;
  color: #fff;
  overflow: hidden;
}
.small-banners-row .banner-content {
  position: absolute;
  right: 48px;
  top: 50%;
  transform: translateY(-50%);
  width: 160px;
  text-align: center;
  z-index: 2;
}
.small-banners-row .banner-img {
  position: absolute;
  left: 0;
  top: 0;
  width: 190px;
  height: 100%;
  object-fit: contain;
}

/* MacBook */
.macbook-banner {
  flex: 1;
  position: relative;
  background: #ededed;
  overflow: hidden;
}
.macbook-banner .banner-content {
  position: absolute;
  left: 56px;
  top: 50%;
  transform: translateY(-50%);
  width: 360px;
  z-index: 2;
}
.macbook-img {
  position: absolute;
  right: -65px;
  bottom: -25px;
  width: 540px;
  height: 502px;
  z-index: 1;
}

/* Текст в баннерах */
.banner-content h3 {
  margin: 0 0 16px;
  font-style: italic;
  font-size: 49px;
  line-height: 40px;
  letter-spacing: -0.02em;
}
.small-banners-row h3 {
  font-size: 29px;
  line-height: 40px;
}
.banner-content p {
  margin: 0;
  font-size: 14px;
  font-style: italic;
  line-height: 24px;
  color: #919191;
}
.macbook-banner .shop-btn {
  margin-top: 24px;
  border: 1px solid #000;
  background: transparent;
  font-size: 16px;
  font-style: italic;
  cursor: pointer;
}

/* CATEGORY */
.category-section {
  padding: 80px 40px;
  background: #fafafa;
}
.category-container {
  max-width: 1440px;
  margin: 0 auto;
}
.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}
.category-title {
  margin: 0;
  font-style: italic;
  font-size: 24px;
  color: #000;
}
.arrows {
  display: flex;
  gap: 16px;
}
.arrow-btn {
  width: 40px;
  height: 40px;
  background: #000;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
}
.arrow-btn img {
  width: 16px;
  height: 16px;
  filter: invert(1);
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(6, 160px);
  gap: 32px;
  justify-content: center;
}
.category-card {
  width: 160px;
  height: 128px;
  background: #ededed;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: transform 0.3s;
}
.category-card:hover {
  transform: translateY(-6px);
}
.category-card img {
  width: 48px;
  height: 48px;
  object-fit: contain;
}
.category-card span {
  font-style: italic;
  font-size: 16px;
  color: #000;
}

/* BEST SELLING */
.best-selling {
  padding: 40px 0;
  background: #fff;
}

.container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 20px;
  text-align: center;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 48px;
}

h2 {
  font-family: 'Abel', sans-serif;
  font-size: 36px;
  margin: 0;
  color: #000;
}

.view-all {
  color: #000;
  text-decoration: none;
  font-size: 18px;
  font-weight: 500;
  transition: color 0.3s;
}

.view-all:hover {
  color: #db4444;
}

.best-selling-grid {
  display: grid;
  grid-template-columns: repeat(4, 270px);
  gap: 40px 30px;
  justify-content: center;
  max-width: 1290px;
  margin: 0 auto;
}

@media (max-width: 1200px) {
  .best-selling-grid {
    grid-template-columns: repeat(3, 270px);
    max-width: 960px;
    gap: 40px 30px;
  }
}

@media (max-width: 900px) {
  .best-selling-grid {
    grid-template-columns: repeat(2, 270px);
    max-width: 630px;
  }
}

@media (max-width: 600px) {
  .best-selling-grid {
    grid-template-columns: 1fr;
    max-width: 300px;
    gap: 30px;
  }
}

.product-card {
  width: 270px !important;
  height: 100%;
}

/* Summer Sale кнопка */
:deep(.summer-btn) {
  width: 188px;
  height: 56px;
  background: transparent;
  border: 1px solid #ffffff;
  border-radius: 6px;
  color: #ffffff;
  font-family: 'ABeeZee', sans-serif;
  font-style: italic;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}

:deep(.summer-btn):hover {
  background: rgba(255, 255, 255, 0.15);
}
.view-all-btn:hover {
  background: #000;
  color: #fff;
}

/* АДАПТИВ */
@media (max-width: 1024px) {
  .banners-wrapper {
    flex-direction: column;
    height: auto;
  }
  .ps5-banner,
  .macbook-banner,
  .airpods-banner,
  .vision-banner {
    height: 420px;
    border-radius: 12px !important;
  }
  .small-banners-row {
    flex-direction: column;
    height: auto;
  }
  .banner-content {
    position: static !important;
    transform: none !important;
    width: 100% !important;
    text-align: center !important;
    padding: 50px 20px 0 !important;
  }
  .banner-img {
    position: static !important;
    width: 70% !important;
    max-width: 400px;
    height: auto !important;
    margin: 30px auto 0 !important;
    display: block;
  }
  .macbook-img {
    right: auto !important;
    bottom: auto !important;
  }
}

@media (max-width: 768px) {
  .hero-banner {
    padding: 0 20px;
    height: auto;
    min-height: 500px;
  }
  .title {
    font-size: 64px;
    line-height: 64px;
  }
  .category-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
/* BANNER 2 — Big Summer Sale */
.summer-banner {
  position: relative;
  width: 100%;
  height: 448px;
  margin: 0px auto;
  background: linear-gradient(100.23deg, #2e2e2e 42.36%, #000000 98.65%);
  overflow: hidden;
  isolation: isolate;
}

/* Левая группа */
.summer-image-left {
  position: absolute;
  left: 0px;
  top: 50%;
  transform: translateY(-50%);
  width: 580px;
  z-index: 2;
}

.left-main {
  width: 100%;
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.6));
}

/* Правая группа */
.summer-image-right {
  position: absolute;
  right: 0px;
  top: 50%;
  transform: translateY(-50%);
  width: 420px;
  z-index: 2;
}

.right-main {
  width: 100%;
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.6));
}

/* Центральный контент */
.summer-content {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  text-align: center;
  z-index: 10;
  width: 520px;
  padding: 0 0px;
}

.summer-title {
  margin: 0;
  font-family: 'Abel', sans-serif;
  font-size: 72px;
  line-height: 72px;
  letter-spacing: -0.01em;
  color: #ffffff;
}

.summer-title strong {
  font-weight: 400;
}

.summer-subtitle {
  margin: 0;
  font-family: 'Abel', sans-serif;
  font-size: 16px;
  line-height: 32px;
  color: #787878;
}

.summer-btn {
  width: 188px;
  height: 56px;
  background: transparent;
  border: 1px solid #ffffff;
  border-radius: 6px;
  color: #ffffff;
  font-family: 'ABeeZee', sans-serif;
  font-style: italic;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
}

.summer-btn:hover {
  background: rgba(255, 255, 255, 0.15);
}

@media (max-width: 1200px) {
  .summer-image-left {
    left: 20px;
    width: 320px;
  }
  .summer-image-right {
    right: 20px;
    width: 360px;
  }
}

@media (max-width: 1024px) {
  .summer-banner {
    height: 560px;
  }
  .summer-image-left {
    top: 60px;
    left: 50%;
    transform: translateX(-80%);
    width: 300px;
  }
  .summer-image-right {
    top: 60px;
    right: 50%;
    transform: translateX(80%);
    width: 340px;
  }
  .summer-content {
    top: 65%;
  }
}

@media (max-width: 768px) {
  .summer-banner {
    height: 640px;
    padding: 40px 20px;
  }
  .summer-image-left,
  .summer-image-right {
    position: static;
    transform: none !important;
    margin: 0 auto;
    width: 280px;
  }
  .summer-image-left {
    order: 1;
  }
  .summer-image-right {
    order: 2;
    margin-top: -40px;
  }
  .summer-content {
    order: 3;
    position: static;
    transform: none;
    margin-top: 40px;
  }
  .summer-title {
    font-size: 48px;
    line-height: 52px;
  }
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

h2 {
  font-size: 36px;
  font-family: 'Abel', sans-serif;
  margin: 0;
}

.view-all {
  color: #000;
  text-decoration: none;
  font-size: 18px;
  font-weight: 500;
  transition: color 0.3s;
}

.view-all:hover {
  color: #db4444;
}
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 32px;
  justify-content: center;
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
