<template>
  <nav class="l-side-nav">
    <ul class="side-nav">
      <li><nuxt-link to="/" exact-active-class="is-active">Home</nuxt-link></li>
      <li><nuxt-link to="/manual" exact-active-class="is-active">Manual</nuxt-link></li>
      <li><nuxt-link to="/about" exact-active-class="is-active">About</nuxt-link></li>
      <li><nuxt-link to="/login" exact-active-class="is-active">Login</nuxt-link></li>
      <li><nuxt-link to="/contact" exact-active-class="is-active">Contact us</nuxt-link></li>
    </ul>
  </nav>
</template>

<script setup>
// No additional script needed
</script>

<style scoped>
.l-side-nav {
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 200px;
  //background-color: rgba(0, 0, 0, 0.8);
  padding-top: 20px;
}

.side-nav {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.side-nav li {
  margin: 0;
}

.side-nav a {
  color: white;
  text-decoration: none;
  font-size: 18px;
  padding: 10px 20px;
  display: block;
  transition: background-color 0.3s;
}

.side-nav a:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.is-active {
  font-weight: bold;
  border-left: 4px solid #ad04f0;
  padding-left: 16px;
}
</style>
