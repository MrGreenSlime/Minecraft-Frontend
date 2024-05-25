<template>
  <div class="dashboard-container">
    <h1 class="text-3xl font-bold mb-4 text-center">Dashboard</h1>
    <p class="text-lg mb-6 text-center">Welcome to your dashboard!</p>

    <div v-if="loading" class="loading text-center">
      <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      Loading...
    </div>

    <div v-else class="max-w-4xl mx-auto grid grid-cols-4 gap-4">
      <div class="col-span-4 md:col-span-1 p-4 border border-gray-300 rounded">
        <h2 class="text-xl font-semibold mb-2">Select World</h2>
        <select v-model="selectedWorld" @change="fetchColonies" class="w-full p-2 border border-gray-300 rounded">
          <option value="" disabled>Select a world</option>
          <option v-for="world in worlds" :key="world.worldId" :value="world.worldId">{{ world.name }}</option>
        </select>
      </div>

      <div class="col-span-4 md:col-span-1 p-4 border border-gray-300 rounded" v-if="colonies.length > 0">
        <h2 class="text-xl font-semibold mb-2">Select Colony</h2>
        <select v-model="selectedColony" @change="fetchColonyData" class="w-full p-2 border border-gray-300 rounded">
          <option value="" disabled>Select a colony</option>
          <option v-for="colony in colonies" :key="colony.colonieId" :value="colony.colonieId">{{ colony.name }}</option>
        </select>
      </div>

      <div class="col-span-4 md:col-span-2 p-4 border border-gray-300 rounded">
        <h2 class="text-xl font-semibold mb-4">Requests</h2>
        <ul class="list-disc list-inside mb-6">
          <li v-for="request in requests" :key="request.RequestId">{{ request.name }} - {{ request.state }}</li>
        </ul>

        <h2 class="text-xl font-semibold mb-4">Builder Requests</h2>
        <ul class="list-disc list-inside">
          <li v-for="builderRequest in builderRequests" :key="builderRequest.BuilderId">{{ builderRequest.name }}</li>
        </ul>
      </div>

      <div class="col-span-4 md:col-span-1 p-4 border border-gray-300 rounded">
        <button class="w-full p-2 mb-2 bg-purple-600 text-white rounded" @click="completeAllRequests">Complete All Requests</button>
        <button class="w-full p-2 mb-2 bg-purple-600 text-white rounded" @click="completeTools">Complete Tools</button>
        <button class="w-full p-2 mb-2 bg-purple-600 text-white rounded" @click="completeArmor">Complete Armor</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import axios from 'axios'

const worlds = ref([])
const colonies = ref([])
const requests = ref([])
const builderRequests = ref([])
const selectedWorld = ref(null)
const selectedColony = ref(null)
const loading = ref(true)

const fetchWorlds = async () => {
  try {
    const response = await axios.get('https://minecraftapi.thibeprovost.ikdoeict.be/api/worlds')
    worlds.value = response.data
  } catch (error) {
    console.error('Error fetching worlds:', error)
  } finally {
    loading.value = false
  }
}

const fetchColonies = async () => {
  if (!selectedWorld.value) return
  loading.value = true
  try {
    const response = await axios.get(`https://minecraftapi.thibeprovost.ikdoeict.be/api/colonies?world_id=${selectedWorld.value}`)
    colonies.value = response.data
    selectedColony.value = null
    requests.value = []
    builderRequests.value = []
  } catch (error) {
    console.error('Error fetching colonies:', error)
  } finally {
    loading.value = false
  }
}

const fetchColonyData = async () => {
  if (!selectedColony.value) return
  loading.value = true
  try {
    const [requestsResponse, builderRequestsResponse] = await Promise.all([
      axios.get(`https://minecraftapi.thibeprovost.ikdoeict.be/api/requests?colonies_id=${selectedColony.value}`),
      axios.get(`https://minecraftapi.thibeprovost.ikdoeict.be/api/builderrequests?colonies_id=${selectedColony.value}`)
    ])
    requests.value = requestsResponse.data
    builderRequests.value = builderRequestsResponse.data
  } catch (error) {
    console.error('Error fetching colony data:', error)
  } finally {
    loading.value = false
  }
}

const completeAllRequests = async () => {
  // Implement functionality to complete all requests
}

const completeTools = async () => {
  // Implement functionality to complete tools requests
}

const completeArmor = async () => {
  // Implement functionality to complete armor requests
}

onMounted(() => {
  fetchWorlds()
})
</script>

<style scoped>
.dashboard-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-size: cover;
  background-position: center;
}

.loading {
  text-align: center;
  font-size: 1.5rem;
  color: #9a19d2;
}
</style>
