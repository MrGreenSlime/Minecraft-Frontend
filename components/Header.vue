<template>
  <header class="header">
      <nuxt-link to="/" class="text-purple-600 hover:underline header--logo">

      <img src="~/assets/img/logotest.png" alt="Global" style="aspect-ratio: 1/1; max-width: 4rem;" />
      <p class="btn-shine">J-Plot</p>
      </nuxt-link>
    <button class="header--cta cta" @click="scrollToContact">Contact Us</button>
<!--    <div class="header&#45;&#45;nav-toggle" @click="toggleNav">-->
<!--      <span></span>-->
<!--    </div>-->
  </header>
</template>

<script setup>
import { ref } from 'vue'

const isNavOpen = ref(false)

function toggleNav() {
  isNavOpen.value = !isNavOpen.value
}

function scrollToContact() {
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
/* Add your styles here */
</style>
