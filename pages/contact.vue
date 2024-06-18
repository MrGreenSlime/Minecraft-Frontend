<template>
  <div class="hire">
    <h2>What do you want to contact us about?</h2>
    <form class="work-request" @submit.prevent="sendRequest">
      <div class="work-request--options">
        <span class="options-a">
          <input id="opt-1" type="checkbox" value="frontend" v-model="selectedOptions">
          <label for="opt-1">
            Frontend
          </label>
          <input id="opt-2" type="checkbox" value="graphic design" v-model="selectedOptions">
          <label for="opt-2">
            Graphic Design
          </label>
          <input id="opt-3" type="checkbox" value="general question" v-model="selectedOptions">
          <label for="opt-3">
            General Questions
          </label>
        </span>
        <span class="options-b">
          <input id="opt-4" type="checkbox" value="bug design" v-model="selectedOptions">
          <label for="opt-4">
            Bug Report
          </label>
          <input id="opt-5" type="checkbox" value="backend" v-model="selectedOptions">
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
          <label for="name">Name</label>
          <input id="name" type="text" v-model="name" spellcheck="false">
        </div>
        <div class="information-email">
          <label class="marge" for="email">Email</label>
          <input id="email" type="email" v-model="email" spellcheck="false">
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
    const response = await fetch('http://78.23.6.113:8080/api/mail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        subjects: selectedOptions.value,
      }),
    });

    const result = await response.json();

    alert('Email sent successfully');
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while sending the email');
  }
};
</script>

<style scoped>
.information-email > label {
  //margin-bottom: 1rem !important;
  position: relative;
}

.information-name > label {
  //margin-bottom: 1rem !important;
  position: relative;
}

.work-request--information {
  margin-bottom: 5rem;
}

</style>
