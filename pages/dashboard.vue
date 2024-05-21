<template>
  <div>
    <h1>Dashboard</h1>
    <p>Welcome to your dashboard!</p>

    <div v-if="loading" class="loading">Loading...</div>

    <div v-else>
      <div>
        <h2>Select World</h2>
        <select v-model="selectedWorld" @change="fetchColonies">
          <option v-for="world in worlds" :key="world.worldId" :value="world.worldId">{{ world.name }}</option>
        </select>
      </div>

      <div v-if="colonies.length > 0">
        <h2>Select Colony</h2>
        <select v-model="selectedColony" @change="fetchColonyData">
          <option v-for="colony in colonies" :key="colony.colonieId" :value="colony.colonieId">{{ colony.name }}</option>
        </select>
      </div>

      <div v-if="requests.length > 0 || builderRequests.length > 0">
        <h2>Requests</h2>
        <ul>
          <li v-for="request in requests" :key="request.RequestId">{{ request.name }} - {{ request.state }}</li>
        </ul>

        <h2>Builder Requests</h2>
        <ul>
          <li v-for="builderRequest in builderRequests" :key="builderRequest.BuilderId">{{ builderRequest.name }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
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

onMounted(() => {
  fetchWorlds()
})
</script>

<style scoped>
/* Add styles for the dashboard page */
.loading {
  text-align: center;
  font-size: 1.5rem;
  color: #007bff;
}
</style>
s