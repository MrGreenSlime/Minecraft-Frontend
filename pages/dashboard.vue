<template>
  <div class="dashboard-container">
    <div class="dashboard">
      <h1 class="text-3xl font-bold mb-4 text-center">Dashboard</h1>
      <div v-if="loading" class="loading text-center">
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        Loading...
      </div>
      <div v-else class="content">
        <!-- Select World and Select Colony side by side -->
        <div class="selection-container">
          <div class="selection-box">
            <button @click="showWorldModal = true"
                    class="w-full p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
              Select World
            </button>
            <p v-if="selectedWorldName" class="selected-item mt-2 text-center">Selected World: {{
                displayWorldName
              }}</p>
          </div>
          <div v-if="selectedWorldName" class="selection-box">
            <button @click="showColonyModal = true"
                    class="w-full p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
              Select Colony
            </button>
            <p v-if="selectedColonyName" class="selected-item mt-2 text-center">Selected Colony: {{
                selectedColonyName
              }}</p>
          </div>
        </div>

        <!-- Controls and Tables -->
        <div v-if="selectedColonyName" class="controls">
          <button class="w-full p-2 mb-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  @click="completeAllRequests">
            Autocomplete All Requests
          </button>
          <button
              :class="['w-full', 'p-2', 'mb-2', 'rounded-lg', autoTools ? 'bg-green-600' : 'bg-purple-600', 'text-white', 'hover:bg-purple-700']"
              @click="completeTools">
            {{ autoTools ? 'Disable Autocomplete Tools' : 'Autocomplete Tools' }}
          </button>
          <button
              :class="['w-full', 'p-2', 'mb-2', 'rounded-lg', autoArmor ? 'bg-green-600' : 'bg-purple-600', 'text-white', 'hover:bg-purple-700']"
              @click="completeArmor">
            {{ autoArmor ? 'Disable Autocomplete Armor' : 'Autocomplete Armor' }}
          </button>
          <button class="w-full p-2 mb-2 bg-red-600 text-white rounded-lg hover:bg-red-700 red"
                  @click="deleteColony">
            Delete Colony
          </button>
          <button class="w-full p-2 mb-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  @click="viewPlayerStorage">
            View Player Storage
          </button>
          <button class="w-full p-2 mb-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  @click="viewColonyStorage">
            View Colony Storage
          </button>
        </div>

        <div v-if="selectedColonyName" class="table-container">
          <h2 class="text-xl font-semibold mb-4">Requests</h2>
          <div class="table-wrapper">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Target</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">State</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Count</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Min Count
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At
                </th>
              </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="request in requests" :key="request.id">
                <td class="px-6 py-4 whitespace-nowrap">{{ request.id }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ request.name }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ request.desc }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ request.target }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ request.state }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ request.count }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ request.minCount }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ new Date(request.created_at).toLocaleString() }}</td>
              </tr>
              </tbody>
            </table>
          </div>

          <h2 class="text-xl font-semibold mb-4 mt-6">Builder Requests</h2>
          <div class="table-wrapper">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Autocomplete
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="builderRequest in builderRequests" :key="builderRequest.id">
                <td class="px-6 py-4 whitespace-nowrap">{{ builderRequest.id }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ builderRequest.name }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <button
                      :class="['w-full', 'p-2', 'rounded-lg', 'hover:bg-purple-700', builderRequest.autocomplete ? 'bg-green-600' : 'bg-purple-600', 'text-white']"
                      @click="toggleAutocomplete(builderRequest.id)"
                  >
                    {{ builderRequest.autocomplete ? 'True' : 'False' }}
                  </button>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">{{ new Date(builderRequest.created_at).toLocaleString() }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <button @click="toggleBuilderRequestInfo(builderRequest.id)" class="text-purple-600 hover:underline">
                    {{ expandedRequest === builderRequest.id ? 'Close Info' : 'More Info' }}
                  </button>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- World Selection Modal -->
    <div v-if="showWorldModal" class="modal-overlay" @click.self="showWorldModal = false">
      <div class="modal-content">
        <h2>Select World</h2>
        <ul>
          <li v-for="world in worlds" :key="world.id" @click="selectWorld(world.id)">
            {{ formatWorldName(world.name) }}
          </li>
        </ul>
        <button @click="showWorldModal = false" class="close-modal">Close</button>
      </div>
    </div>

    <!-- Player Storage Modal -->
    <div v-if="showStorageModal" class="modal-overlay" @click.self="showStorageModal = false">
      <div class="modal-content">
        <h2>Player Storage Items</h2>
        <div class="storage-columns">
          <div class="storage-column">
            <h3>Items</h3>
            <hr>
            <ul>
              <li class="player-storage-item" v-for="item in playerItemsWithAmount" :key="item.id">
                <strong>{{ item.displayName }}</strong>: {{ item.amount }}
              </li>
            </ul>
          </div>
          <div class="storage-column">
            <h3>Patterns</h3>
            <hr>
            <ul>
              <li class="player-storage-item" v-for="pattern in playerPatterns" :key="pattern.id">
                <strong>{{ pattern.displayName }}</strong>
              </li>
            </ul>
          </div>
        </div>
        <button @click="showStorageModal = false" class="close-modal">Close</button>
      </div>
    </div>


    <!-- Colony Storage Modal -->
    <div v-if="showColonyStorageModal" class="modal-overlay" @click.self="showColonyStorageModal = false">
      <div class="modal-content">
        <h2>Colony Storage Items</h2>
        <ul class="colony-storage-grid">
          <li class="colony-storage-item" v-for="item in colonyItems" :key="item.id">
            <strong>{{ item.displayName }}</strong>: {{ item.amount }}
          </li>
        </ul>
        <button @click="showColonyStorageModal = false" class="close-modal">Close</button>
      </div>
    </div>

    <!-- Colony Selection Modal -->
    <div v-if="showColonyModal" class="modal-overlay" @click.self="showColonyModal = false">
      <div class="modal-content">
        <h2>Select Colony</h2>
        <ul>
          <li v-for="colony in colonies" :key="colony.id" @click="selectColony(colony.id)">
            {{ colony.name }}
          </li>
        </ul>
        <button @click="showColonyModal = false" class="close-modal">Close</button>
      </div>
    </div>

    <!-- Request Details Modal -->
    <div v-if="expandedRequest !== null" class="modal-overlay" @click.self="expandedRequest = null">
      <div class="modal-content">
        <div v-if="builderRequestDetails[expandedRequest]" class="details-container">
          <p><strong>ID:</strong> {{ builderRequestDetails[expandedRequest]?.id }}</p>
          <p><strong>Name:</strong> {{ builderRequestDetails[expandedRequest]?.name }}</p>
          <p><strong>Autocomplete:</strong> {{ builderRequestDetails[expandedRequest]?.autocomplete }}</p>
          <p><strong>Location:</strong> (X: {{ builderRequestDetails[expandedRequest]?.location?.x }},
            Y: {{ builderRequestDetails[expandedRequest]?.location?.y }}, Z:
            {{ builderRequestDetails[expandedRequest]?.location?.z }})</p>
          <p><strong>Created At:</strong>
            {{ new Date(builderRequestDetails[expandedRequest]?.created_at).toLocaleString() }}</p>
          <h3 class="font-semibold mt-2">Requests:</h3>
          <ul class="list-disc list-inside">
            <li v-for="req in builderRequestDetails[expandedRequest]?.Requests" :key="req.id">
              <p><strong>Item:</strong> {{ req.item.displayName }} ({{ req.item.name }})</p>
              <p><strong>Status:</strong> {{ req.status }}</p>
              <p><strong>Needed:</strong> {{ req.needed }}</p>
              <p><strong>Available:</strong> {{ req.available }}</p>
              <p><strong>Delivering:</strong> {{ req.delivering }}</p>
            </li>
          </ul>
        </div>
        <div v-else>Loading...</div>
        <button @click="expandedRequest = null" class="close-modal">Close</button>

      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, computed, onMounted} from 'vue';
import axios from 'axios';
import {useAuthStore} from '@/stores/auth';
import {useRouter} from 'vue-router';

const authStore = useAuthStore();
const token = authStore.token;
const router = useRouter();

const worlds = ref([]);
const colonies = ref([]);
const requests = ref([]);
const builderRequests = ref([]);
const selectedWorld = ref(null);
const selectedWorldName = ref('');
const selectedColony = ref(null);
const selectedColonyName = ref('');
const loading = ref(true);
const expandedRequest = ref(null);
const builderRequestDetails = ref({});
const showWorldModal = ref(false);
const showColonyModal = ref(false);
const showStorageModal = ref(false);
const showColonyStorageModal = ref(false);
const playerItems = ref([]);
const colonyItems = ref([]);
const autoTools = ref(false);
const autoArmor = ref(false);

const fetchWorlds = async () => {
  try {
    const response = await axios.get('http://78.23.6.113:8080/api/worlds', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    worlds.value = response.data.data;
    console.log('Worlds:', response.data.data);
  } catch (error) {
    console.error('Error fetching worlds:', error);
  } finally {
    loading.value = false;
  }
};

const fetchColonies = async () => {
  if (!selectedWorld.value) return;
  loading.value = true;
  try {
    const response = await axios.get(`http://78.23.6.113:8080/api/worlds/${selectedWorld.value}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    colonies.value = response.data.data.colonies;
    console.log('Colonies:', response.data.data.colonies);
    selectedColony.value = null;
    selectedColonyName.value = '';
    requests.value = [];
    builderRequests.value = [];
  } catch (error) {
    console.error('Error fetching colonies:', error);
  } finally {
    loading.value = false;
  }
};

const fetchColonyData = async () => {
  if (!selectedColony.value) return;
  loading.value = true;
  try {
    const response = await axios.get(`http://78.23.6.113:8080/api/colonies/${selectedColony.value}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data.data;
    requests.value = data.requests;
    builderRequests.value = data.builderRequests;
    autoTools.value = data.autoTools;
    autoArmor.value = data.autoArmor;
    playerItems.value = data.storage_items.filter(item => item.type === 'player' || item.type === 'pattern');  // Extract player storage items here
    colonyItems.value = data.storage_items.filter(item => item.type === 'colonie');  // Extract colony storage items here
    console.log('Requests:', data.requests);
    console.log('Builder Requests:', data.builderRequests);
    console.log('AutoTools:', data.autoTools);
    console.log('AutoArmor:', data.autoArmor);
    console.log('Player Items:', playerItems.value);  // Log player items for debugging
    console.log('Colony Items:', colonyItems.value);  // Log colony items for debugging
  } catch (error) {
    console.error('Error fetching colony data:', error);
  } finally {
    loading.value = false;
  }
};

const fetchBuilderRequestDetails = async (builderRequestId) => {
  console.log('Fetching builder request details:', builderRequestId);
  try {
    const response = await axios.get(`http://78.23.6.113:8080/api/builderrequests/${builderRequestId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Builder Request Details:', response.data.data);
    // Update the builderRequestDetails object with the fetched data
    builderRequestDetails.value = {...builderRequestDetails.value, [builderRequestId]: response.data.data};
  } catch (error) {
    console.error('Error fetching builder request details:', error);
  }
};

const toggleBuilderRequestInfo = (builderRequestId) => {
  if (expandedRequest.value === builderRequestId) {
    expandedRequest.value = null;
  } else {
    expandedRequest.value = builderRequestId;
    if (!builderRequestDetails.value[builderRequestId]) {
      fetchBuilderRequestDetails(builderRequestId);
    }
  }
};

const toggleAutocomplete = async (builderRequestId) => {
  try {
    const builderRequest = builderRequests.value.find((request) => request.id === builderRequestId);
    const newAutocompleteState = !builderRequest.autocomplete;

    await axios.put(
        `http://78.23.6.113:8080/api/builderrequests/${builderRequestId}`,
        {autocomplete: newAutocompleteState},
        {headers: {Authorization: `Bearer ${token}`}}
    );

    // Update the local state
    builderRequest.autocomplete = newAutocompleteState;
    alert('Builder request updated successfully.');
  } catch (error) {
    console.error('Error updating builder request:', error);
    alert('Failed to update builder request.');
  }
};

const completeAllRequests = async () => {
  try {
    await axios.put(
        `http://78.23.6.113:8080/api/colonies/${selectedColony.value}`,
        {autocomplete: true},
        {headers: {Authorization: `Bearer ${token}`}}
    );
    await fetchColonyData(); // Refetch colony data to update the UI
    alert('All requests completed successfully.');
  } catch (error) {
    console.error('Error completing all requests:', error);
    alert('Failed to complete all requests.');
  }
};

const completeTools = async () => {
  try {
    const newAutoToolsState = !autoTools.value;

    await axios.put(
        `http://78.23.6.113:8080/api/colonies/${selectedColony.value}`,
        {autoTools: newAutoToolsState},
        {headers: {Authorization: `Bearer ${token}`}}
    );

    autoTools.value = newAutoToolsState;
    alert(`Tools requests ${newAutoToolsState ? 'enabled' : 'disabled'} successfully.`);
  } catch (error) {
    console.error('Error completing tools requests:', error);
    alert('Failed to complete tools requests.');
  }
};

const completeArmor = async () => {
  try {
    const newAutoArmorState = !autoArmor.value;

    await axios.put(
        `http://78.23.6.113:8080/api/colonies/${selectedColony.value}`,
        {autoArmor: newAutoArmorState},
        {headers: {Authorization: `Bearer ${token}`}}
    );

    autoArmor.value = newAutoArmorState;
    alert(`Armor requests ${newAutoArmorState ? 'enabled' : 'disabled'} successfully.`);
  } catch (error) {
    console.error('Error completing armor requests:', error);
    alert('Failed to complete armor requests.');
  }
};

const deleteColony = async () => {
  if (!selectedColony.value) {
    alert('Please select a colony first.');
    return;
  }

  if (!confirm('Are you sure you want to delete this colony?')) {
    return;
  }

  loading.value = true;
  try {
    await axios.delete(`http://78.23.6.113:8080/api/colonies/${selectedColony.value}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    alert('Colony deleted successfully.');
    // Clear the selected colony and reload colonies
    selectedColony.value = null;
    selectedColonyName.value = '';
    fetchColonies();
  } catch (error) {
    console.error('Error deleting colony:', error);
    alert('Failed to delete colony.');
  } finally {
    loading.value = false;
  }
};

const playerItemsWithAmount = computed(() => {
  return playerItems.value.filter(item => item.type === 'player');
});

const playerPatterns = computed(() => {
  return playerItems.value.filter(item => item.type === 'pattern');
});

const viewPlayerStorage = async () => {
  showStorageModal.value = true;
};

const viewColonyStorage = async () => {
  showColonyStorageModal.value = true;
};

const displayWorldName = computed(() => {
  if (!selectedWorldName.value) return '';
  const parts = selectedWorldName.value.split('-saves-');
  return parts.length > 1 ? parts[1] : selectedWorldName.value;
});

const formatWorldName = (name) => {
  const parts = name.split('-saves-');
  return parts.length > 1 ? parts[1] : name;
};

const selectWorld = (worldId) => {
  const world = worlds.value.find((w) => w.id === worldId) || {};
  selectedWorld.value = worldId;
  selectedWorldName.value = world.name || 'Unknown';
  showWorldModal.value = false;
  fetchColonies();
};

const selectColony = (colonyId) => {
  const colony = colonies.value.find((c) => c.id === colonyId) || {};
  selectedColony.value = colonyId;
  selectedColonyName.value = colony.name || 'Unknown';
  showColonyModal.value = false;
  fetchColonyData();
};

onMounted(() => {
  if (!authStore.token) {
    router.push('/login');
  } else {
    fetchWorlds();
  }
});
</script>

<style scoped>
.selection-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.selection-box {
  width: 48%;
}

.selected-item {
  background-color: #212121;
  padding: 0.5rem;
  border-radius: 0.5rem;
  margin-top: 0.5rem;
  text-align: center;
  font-weight: bold;
}

.dashboard {
  width: 80%;
  padding: 2rem;
  text-align: center;
  animation: fadeIn 1s ease-in-out;
  background: rgba(73, 72, 72, 0.41);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(1px);
  -webkit-backdrop-filter: blur(6px);
  border: 1px solid rgba(109, 103, 103, 0.18);
  max-height: 100%; /* Added for better scrollability */
  overflow-y: auto; /* Added for better scrollability */
  margin-bottom: 9rem;
}

.dashboard-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  padding-left: 2rem;
  padding-right: 2rem;
  background-size: cover;
  background-position: center;
}

@media (max-height: 1000px) {
  .dashboard-container {
    padding-top: 5rem;
  }
}

.loading {
  text-align: center;
  font-size: 1.5rem;
  color: #9a19d2;
}

.table-container {
  margin-top: 1.5rem;
}

.table-wrapper {
  max-height: 250px;
  overflow-y: auto;
  margin-bottom: 1.5rem;
}

/* Custom scrollbar styles */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: transparent; /* Make the background transparent */
}

::-webkit-scrollbar-thumb {
  background-color: grey; /* Set the color of the scrollbar thumb */
  border-radius: 10px; /* Make the scrollbar thumb rounded */
}

h2 {
  margin-bottom: 1.5rem;
}

ul {
  list-style-type: disc;
}

li {
  margin-bottom: 0.5rem;
}

button {
  background-color: #9a19d2;
  color: #ffffff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  margin: 0.5rem;
}

button:hover {
  background-color: #870abd;
}

button:focus {
  outline: none;
}

button:active {
  transform: scale(0.98);
}

select {
  background-color: #333333;
  color: #ffffff;
  padding: 0.5rem 1rem;
  border: 1px solid #9a19d2;
}

table {
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 1rem;
  background-color: #212121;
  color: #fff;
}

th,
td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #444;
}

th {
  background-color: #333;
}

tbody tr:hover {
  background-color: #444;
}

.details-container {
  background-color: #1a1a1a;
  padding: 1rem;
  border-radius: 8px;
  max-height: 300px;
  overflow-y: auto;
}

.details-container p,
.details-container ul {
  margin: 0.5rem 0;
}

.details-container ul {
  padding-left: 1.2rem;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
}

.modal-content {
  background-color: #252525;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  max-width: 500px;
  width: 90%;
  max-height: 80%;
  overflow-y: auto;
}

.modal-content h2 {
  margin-bottom: 1.5rem;
}

.modal-content ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.modal-content li {
  padding: 0.5rem 0;
  cursor: pointer;
  color: #ffffff;
  transition: background-color 0.3s, color 0.3s;
}

.modal-content li:hover {
  background-color: #eee;
  color: #333;
}

.close-modal {
  background-color: #9a19d2;
  color: #ffffff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  margin-top: 1rem;
}

.close-modal:hover {
  background-color: #870abd;
}

.close-modal:focus {
  outline: none;
}

.close-modal:active {
  transform: scale(0.98);
}

@media (max-width: 768px) {
  .selection-container {
    flex-direction: column;
  }

  .selection-box {
    width: 100%;
  }
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

.red {
  background-color: #ea0e41;
}

.red:hover {
  background-color: #880c29;
}

.storage-columns {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
}

.storage-column {
  width: 48%;
}

.storage-column h3 {
  margin-bottom: 1rem;
}

.player-storage-item {
  background-color: #333;
  padding: 0.5rem;
  border-radius: 0.5rem;
  text-align: center;
}


/* Styles for Colony Storage Modal */
.colony-storage-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.colony-storage-item {
  background-color: #333;
  padding: 0.5rem;
  border-radius: 0.5rem;
  text-align: center;
}


@media (max-height: 1000px) {
  .dashboard {
    margin-top: 5rem;
  }
}


</style>
