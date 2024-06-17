<template>
  <header class="header">
    <nuxt-link to="/" class="text-purple-600 hover:underline header--logo">
      <img src="~/assets/img/logotest.png" alt="Global" style="aspect-ratio: 1/1; max-width: 4rem;" />
      <p class="btn-shine">J-Plot</p>
    </nuxt-link>
    <button class="header--cta cta" @click="scrollToContact">Contact Us</button>
    <template v-if="authStore.token && !isManualPage">
      <nuxt-link to="/dashboard" class="dashboardButton">Dashboard</nuxt-link>
    </template>
  </header>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const route = useRoute()

// Computed property to check if the current route is '/manual'
const isManualPage = computed(() => route.path === '/manual')

// Watch the route for changes
watch(route, (newRoute) => {
  isManualPage.value = newRoute.path === '/manual'
})

function scrollToContact() {
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
.dashboardButton {
  position: absolute;
  right: 1rem;
  top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #ad04f0;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-decoration: none;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.dashboardButton:hover {
  background-color: #8a02c6;
}
</style>
