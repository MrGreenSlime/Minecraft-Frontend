<template>
  <div class="hire">
    <h2>What do you want to contact us about?</h2>
    <form class="work-request" @submit.prevent="sendRequest">
      <div class="work-request--options">
        <span class="options-a">
          <input id="opt-1" type="checkbox" value="app design" v-model="selectedOptions">
          <label for="opt-1">
            Frontend
          </label>
          <input id="opt-2" type="checkbox" value="graphic design" v-model="selectedOptions">
          <label for="opt-2">
            Graphic Design
          </label>
          <input id="opt-3" type="checkbox" value="motion design" v-model="selectedOptions">
          <label for="opt-3">
            General Questions
          </label>
        </span>
        <span class="options-b">
          <input id="opt-4" type="checkbox" value="ux design" v-model="selectedOptions">
          <label for="opt-4">
            Bug Report
          </label>
          <input id="opt-5" type="checkbox" value="webdesign" v-model="selectedOptions">
          <label for="opt-5">
            Backend
          </label>
          <input id="opt-6" type="checkbox" value="Database design" v-model="selectedOptions">
          <label for="opt-6">
            Database design
          </label>
        </span>
      </div>
      <div class="work-request--information">
        <div class="information-name">
          <input id="name" type="text" v-model="name" spellcheck="false">
          <label for="name">Name</label>
        </div>
        <div class="information-email">
          <input id="email" type="email" v-model="email" spellcheck="false">
          <label for="email">Email</label>
        </div>
      </div>
      <input type="submit" value="Send Request">
    </form>
    <div class="scroll-indicator">ˬ</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const name = ref('');
const email = ref('');
const selectedOptions = ref([]);

const sendRequest = async () => {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        options: selectedOptions.value,
      }),
    });

    const result = await response.json();

    if (result.success) {
      alert('Email sent successfully');
    } else {
      alert('Failed to send email');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while sending the email');
  }
};
</script>

<style scoped>
/* Add styles from your original CSS/SASS here */
</style>
