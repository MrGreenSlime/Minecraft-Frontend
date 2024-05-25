<template>
  <div class="register-container">
    <div class="register">
      <h2>Register</h2>
      <form @submit.prevent="handleRegister" class="register-form">
        <div class="register-form--field">
          <input v-model="name" id="name" type="text" name="name" required>
          <label for="name">Name</label>
        </div>
        <div class="register-form--field">
          <input v-model="email" id="email" type="email" name="email" required>
          <label for="email">Email</label>
        </div>
        <div class="register-form--field">
          <input v-model="password" id="password" type="password" name="password" required>
          <label for="password">Password</label>
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
    const response = await axios.post('https://minecraftapi.thibeprovost.ikdoeict.be/api/users', {
      name: name.value,
      email: email.value,
      password: password.value,
    })
    alert(response.data.message)
    router.push('/login')
  } catch (error) {
    alert('Registration failed. Please try again.')
    console.error('Error registering user:', error)
  }
}
</script>

<style scoped>
/* Center the register form using flexbox */
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-size: cover;
  background-position: center;
}

.register {
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
  margin-bottom: 1.5rem;
}

.register-form--field {
  margin-bottom: 1.5rem;
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

.register-form--field label {
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  color: #ccc;
  transition: all 0.3s ease-in-out;
  pointer-events: none;
}

.register-form--field input:focus + label,
.register-form--field input:not(:placeholder-shown) + label {
  top: -10px;
  left: 10px;
  color: #9A19D2;
  font-size: 0.8rem;
}

.register-form--field input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease-in-out;
  background: rgba(255, 255, 255, 0.6);
}

.register-form--field input:focus {
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
