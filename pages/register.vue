<template>
  <div class="register-container">
    <div class="register">
      <h2 class="margin">Register</h2>
      <form @submit.prevent="handleRegister" class="login-form">
        <div class="login-form--field information-email">
          <label for="name">Name</label>
          <input class="inputField" v-model="name" id="name" type="text" name="name" required>
        </div>
        <div class="login-form--field information-email">
          <label for="email">Email</label>
          <input class="inputField" v-model="email" id="email" type="email" name="email" required>
        </div>
        <div class="login-form--field information-email">
          <label for="password">Password</label>
          <input class="inputField" v-model="password" id="password" type="password" name="password" required>
        </div>
        <input type="submit" value="Register">
      </form>
      <p class="mt-4">
        <nuxt-link to="/login" class="text-purple-600 hover:underline">Already have an account? Login here</nuxt-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const name = ref('')
const email = ref('')
const password = ref('')
const router = useRouter()

const handleRegister = async () => {
  try {
    const response = await axios.post('http://78.23.6.113:8080/api/register', {
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: password.value
    })
    response.data.message
    router.push('/login')
  } catch (error) {
    alert('Registration failed. Please try again.')
    console.error('Error registering user:', error)
  }
}
</script>

<style scoped>
.hidden {
  display: none;
}

.margin {
  margin-bottom: 3rem;
}

/* Center the form using flexbox */
.register-container, .login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-size: cover;
  background-position: center;
}

.register, .login {
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

.inputField {
  width: 100%;
  padding: 10px;
  margin: 20px 0;
  border: none;
  border-bottom: 2px solid #ccc;
  background: transparent;
  color: white;
}

.inputField:focus {
  outline: none;
  border-bottom: 2px solid #b200ff;
  background: rgba(0, 0, 0, 0.2);
}

label {
  display: block;
  text-align: left;
  margin: 0 0;
  color: white;
}

</style>
