<template>
  <div class="main">
    <stars-animation/>

    <div id="viewport" class="l-viewport">
      <div class="l-wrapper">
        <Header/>
        <SideNav/>
        <NuxtPage/>
      </div>
    </div>
  </div>
</template>

<script setup>
import Header from '~/components/Header.vue'
import SideNav from '~/components/SideNav.vue'
</script>

<style>
/* Global styles can be added here */
</style>
