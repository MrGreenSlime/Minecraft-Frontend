<template>
  <div>
    <NuxtLayout />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Nav from '@/components/SideNav.vue'; // Adjust the path as needed

const router = useRouter();
const route = useRoute();

const routes = [
  { path: '/', name: 'Home' },
  { path: '/manual', name: 'Manual' },
  { path: '/about', name: 'About' },
  { path: '/login', name: 'Login' },
  { path: '/contact', name: 'Contact' },
];

const handleScroll = () => {
  const currentIndex = routes.findIndex(r => r.path === route.path);
  if (currentIndex !== -1 && currentIndex < routes.length - 1) {
    const nextRoute = routes[currentIndex + 1];
    router.push(nextRoute.path);
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>