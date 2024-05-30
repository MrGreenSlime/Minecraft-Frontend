<template>
  <div class="login-container">
    <div class="login">
      <h2 class="margin">Login</h2>
      <form @submit.prevent="handleSubmit" class="login-form">
        <div class="login-form--field">
          <input class="inputField"  v-model="email" id="email" type="email" name="email" required>
          <label for="email">Email</label>
        </div>
        <div class="login-form--field">
          <input class="inputField" v-model="password" id="password" type="password" name="password" required>
          <label for="password">Password</label>
        </div>
        <input type="submit" value="Login">
      </form>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      <p class="mt-4">
        <nuxt-link to="/register" class="text-purple-600 hover:underline">No account? Register here</nuxt-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const email = ref('')
const password = ref('')
const errorMessage = ref('');
const router = useRouter()
const authStore = useAuthStore()

const handleSubmit = async () => {
  try {
    await authStore.login(email.value, password.value)
    await router.push('/dashboard')
  } catch (error) {
    alert('Login failed. Please check your credentials.')
  }
}
</script>

<style scoped>
.margin {
  margin-bottom: 3rem;
}

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
  -webkit-backdrop-filter: blur(6px);
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
  margin-bottom: 1.5rem;
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




.text-purple-600 {
  color: #b200ff;
}

.hover\:underline:hover {
  text-decoration: underline;
}

.mt-4 {
  margin-top: 1rem;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>
