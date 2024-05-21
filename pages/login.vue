<template>
  <div class="login-container">
    <div class="login">
      <h2>Login</h2>
      <form @submit.prevent="handleSubmit" class="login-form">
        <div class="login-form--field">
          <input v-model="username" id="username" type="text" name="username" required>
          <label for="username">Username</label>
        </div>
        <div class="login-form--field">
          <input v-model="password" id="password" type="password" name="password" required>
          <label for="password">Password</label>
        </div>
        <input type="submit" value="Login">
       <nuxt-link to="/dashboard" exact-active-class="">Dashboard</nuxt-link>
      </form>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'

const username = ref('')
const password = ref('')
const router = useRouter()
const store = useStore()

const handleSubmit = async () => {
  // Temporary admin credentials
  const validUsername = 'admin'
  const validPassword = 'admin'

  if (username.value === validUsername && password.value === validPassword) {
    // Simulate a token for the demo
    const token = 'fake-jwt-token'
    store.dispatch('login', token)
    router.push('/dashboard')
  } else {
    alert('Login failed. Please check your credentials.')
  }
}
</script>

<style scoped>
/* Center the login form using flexbox */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-size: cover;
  background-position: center;
}

.login {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  text-align: center;
  animation: fadeIn 1s ease-in-out;
  background: rgba(73, 72, 72, 0.41);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(1px);
  -webkit-backdrop-filter: blur(5.9px);
  border: 1px solid rgba(109, 103, 103, 0.18);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

h2 {
  margin-bottom: 1rem;
}

.login-form--field {
  margin-bottom: 1rem;
  position: relative;
  animation: slideIn 0.5s ease-in-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.login-form--field label {
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  color: #ccc;
  transition: all 0.3s ease-in-out;
  pointer-events: none;
}

.login-form--field input:focus + label,
.login-form--field input:not(:placeholder-shown) + label {
  top: -10px;
  left: 10px;
  color: #9A19D2;
  font-size: 0.8rem;
}

.login-form--field input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease-in-out;
  background: rgba(255, 255, 255, 0.6);
}

.login-form--field input:focus {
  border-color: #9A19D2;
  background: rgba(255, 255, 255, 0.8);
}

input[type="submit"] {
  width: 100%;
  padding: 0.75rem;
  background-color: #9A19D2;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out, transform 0.2s ease-in-out;
}

input[type="submit"]:hover {
  background-color: #9A19D2;
  transform: translateY(-2px);
}

input[type="submit"]:active {
  transform: translateY(1px);
}
</style>
