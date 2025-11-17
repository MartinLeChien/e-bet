<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-6xl mx-auto">

      <h1 class="text-2xl font-bold text-gray-800 mb-6">Dashboard Admin</h1>

      <!-- Section Matchs -->
      <section class="mb-10">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold text-gray-700">Matchs à venir</h2>
          <NuxtLink
            to="/admin/new-match/"
            class="bg-gray-900 hover:bg-gray-700 text-white font-medium px-4 py-2 rounded-lg transition"
          >
            + Nouveau match
          </NuxtLink>
        </div>

        <div v-if="loadingMatches" class="text-gray-500">Chargement des matchs...</div>
        <div v-else>
          <div v-if="matches.length === 0" class="text-gray-500">Aucun match à venir</div>
          
          <div
            v-for="match in matches"
            :key="match.id"
            class="bg-white border border-gray-200 shadow-sm rounded-lg p-6 mb-4 flex flex-col md:flex-row md:items-center md:justify-between"
          >
            <div class="flex items-center space-x-4 mb-4 md:mb-0">
              <div class="text-gray-800 font-semibold">{{ match.teamA.name }}</div>
              <span class="text-gray-400">vs</span>
              <div class="text-gray-800 font-semibold">{{ match.teamB.name }}</div>
              <span class="text-gray-400 ml-2">| {{ new Date(match.date).toLocaleString() }}</span>
            </div>

            <div class="flex space-x-2">
              <NuxtLink
                :to="`/admin/matchs/${match.id}`"
                class="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded-lg text-sm"
              >
                Modifier
              </NuxtLink>
              <button
                @click="deleteMatch(match.id)"
                class="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded-lg text-sm"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Section équipes -->
      <section>
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold text-gray-700">Équipes</h2>
          <NuxtLink
            to="/admin/new-team/"
            class="bg-gray-900 hover:bg-gray-700 text-white font-medium px-4 py-2 rounded-lg transition"
          >
            + Nouvelle équipe
          </NuxtLink>
        </div>

        <div v-if="loadingTeams" class="text-gray-500">Chargement des équipes...</div>
        <div v-else>
          <div v-if="teams.length === 0" class="text-gray-500">Aucune équipe</div>

          <div
            v-for="team in teams"
            :key="team.id"
            class="bg-white border border-gray-200 shadow-sm rounded-lg p-4 mb-3 flex justify-between items-center"
          >
            <div class="flex items-center space-x-3">
              <img :src="team.avatarUrl" alt="" class="w-10 h-10 rounded-full object-cover" v-if="team.avatarUrl"/>
              <div class="text-gray-800 font-medium">{{ team.name }}</div>
            </div>
            <div class="flex space-x-2">
              <NuxtLink
                :to="`/admin/teams/${team.id}`"
                class="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded-lg text-sm"
              >
                Modifier
              </NuxtLink>
              <button
                @click="deleteTeam(team.id)"
                class="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded-lg text-sm"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const matches = ref([])
const teams = ref([])
const loadingMatches = ref(true)
const loadingTeams = ref(true)

// Fetch Matchs
const fetchMatches = async () => {
  try {
    const res = await axios.get('/api/admin/matchs')
    matches.value = res.data
  } catch (err) {
    alert('Erreur lors du chargement des matchs')
  } finally {
    loadingMatches.value = false
  }
}

// Fetch Teams
const fetchTeams = async () => {
  try {
    const res = await axios.get('/api/admin/teams')
    teams.value = res.data
  } catch (err) {
    alert('Erreur lors du chargement des équipes')
  } finally {
    loadingTeams.value = false
  }
}

// Delete Match
const deleteMatch = async (id) => {
  if (!confirm('Voulez-vous vraiment supprimer ce match ?')) return
  try {
    await axios.delete(`/api/admin/matchs/${id}`)
    matches.value = matches.value.filter(m => m.id !== id)
  } catch (err) {
    alert('Erreur suppression match')
  }
}

// Delete Team
const deleteTeam = async (id) => {
  if (!confirm('Voulez-vous vraiment supprimer cette équipe ?')) return
  try {
    await axios.delete(`/api/admin/teams/${id}`)
    teams.value = teams.value.filter(t => t.id !== id)
  } catch (err) {
    alert('Erreur suppression équipe')
  }
}

onMounted(() => {
  fetchMatches()
  fetchTeams()
})
</script>
