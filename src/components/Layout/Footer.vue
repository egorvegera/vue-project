<!-- src/components/layout/Footer.vue -->
<template>
  <footer class="footer">
    <div class="footer__container">
      <div class="footer__info">
        <!-- Левая колонка -->
        <div class="footer__left">
          <div class="footer__logo">
            <img src="@/assets/logowhite.svg" alt="Logo" class="logo-img" />
          </div>

          <p class="footer__description">
            We are a residential interior design firm located in Portland. Our boutique-studio
            offers more than
          </p>
          <div class="footer__socials">
            <a href="#" class="social-link" aria-label="Twitter">
              <img src="@/assets/twittericon.svg" alt="" class="social-icon" />
            </a>
            <a href="#" class="social-link" aria-label="Facebook">
              <img src="@/assets/fbicon.svg" alt="" class="social-icon" />
            </a>
            <a href="#" class="social-link" aria-label="TikTok">
              <img src="@/assets/tticon.svg" alt="" class="social-icon" />
            </a>
            <a href="#" class="social-link" aria-label="Instagram">
              <img src="@/assets/instagramicon.svg" alt="" class="social-icon" />
            </a>
          </div>
        </div>

        <!-- Навигация -->
        <div class="footer__nav">
          <div class="nav-column">
            <h3 class="nav-title">Services</h3>
            <ul class="nav-list">
              <li><a href="#">Bonus program</a></li>
              <li><a href="#">Gift cards</a></li>
              <li><a href="#">Credit and payment</a></li>
              <li><a href="#">Service contracts</a></li>
              <li><a href="#">Non-cash account</a></li>
              <li><a href="#">Payment</a></li>
            </ul>
          </div>

          <div class="nav-column">
            <h3 class="nav-title">Assistance to the buyer</h3>
            <ul class="nav-list">
              <li><a href="#">Find an order</a></li>
              <li><a href="#">Terms of delivery</a></li>
              <li><a href="#">Exchange and return of goods</a></li>
              <li><a href="#">Guarantee</a></li>
              <li><a href="#">Frequently asked questions</a></li>
              <li><a href="#">Terms of use of the site</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup></script>

<style scoped>
.footer {
  background: #000;
  color: #cfcfcf;
  font-family:
    'SF Pro Display',
    -apple-system,
    BlinkMacSystemFont,
    sans-serif;
  margin-top: auto;
}

.footer__container {
  max-width: 1439px;
  margin: 0 auto;
  padding: 104px 160px;
  box-sizing: border-box;
}

.footer__info {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 113px;
  flex-wrap: wrap;
}

.footer__left {
  flex: 0 0 384px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.logo-img {
  width: 96px;
  height: 32px;
  object-fit: contain;
}

.footer__description {
  margin: 0;
  font-weight: 500;
  font-size: 14px;
  line-height: 170.5%;
}

.footer__socials {
  display: flex;
  gap: 15px;
}

.social-link {
  display: block;
  width: 16px;
  height: 16px;
  opacity: 0.8;
  transition: opacity 0.25s ease;
}

.social-link:hover {
  opacity: 1;
}

.social-icon {
  width: 100%;
  height: 100%;
  display: block;
  filter: brightness(0) invert(1);
}

.footer__nav {
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
}

.nav-column {
  min-width: 295px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.nav-title {
  margin: 0;
  font-weight: 600;
  font-size: 16px;
  color: #fff;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-list a {
  color: #cfcfcf;
  text-decoration: none;
  font-weight: 300;
  font-size: 14px;
  line-height: 32px;
  transition: color 0.25s;
}

.nav-list a:hover {
  color: #fff;
}

/* Адаптив */
@media (max-width: 1440px) {
  .footer__container {
    padding: 104px 80px;
  }
}
@media (max-width: 1024px) {
  .footer__container {
    padding: 80px 40px;
  }
}
@media (max-width: 768px) {
  .footer__container {
    padding: 60px 20px;
  }
  .footer__info {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  .footer__left {
    align-items: center;
    flex-basis: 100%;
  }
  .footer__nav {
    justify-content: center;
  }
}
</style>
