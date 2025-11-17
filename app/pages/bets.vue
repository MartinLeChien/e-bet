<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-2xl font-bold text-gray-800 mb-6">Mes paris en cours</h1>

      <div v-if="loading" class="text-gray-500">Chargement des paris...</div>
      <div v-else>
        <div v-if="bets.length === 0" class="text-gray-500">Vous n'avez aucun pari en cours.</div>

        <div v-for="bet in bets" :key="bet.id" class="bg-white border border-gray-200 shadow-sm rounded-lg p-6 mb-4 flex flex-col md:flex-row md:items-center md:justify-between">
          
          <!-- Match Info -->
          <div class="flex items-center space-x-4 mb-4 md:mb-0">
            <div class="text-gray-800 font-semibold">{{ bet.match.teamA.name }}</div>
            <span class="text-gray-400">vs</span>
            <div class="text-gray-800 font-semibold">{{ bet.match.teamB.name }}</div>
          </div>

          <!-- Bet Info -->
          <div class="flex flex-col md:flex-row md:items-center md:space-x-6 text-gray-700">
            <div>
              <span class="font-medium">Équipe pariée :</span>
              {{ getTeamName(bet.match, bet.teamId) }}
            </div>
            <div>
              <span class="font-medium">Montant :</span> {{ bet.amount }} €
            </div>
            <div>
              <span class="font-medium">Gain potentiel :</span> {{ bet.potentialGain }} €
            </div>
            <div>
              <span class="font-medium">Statut :</span>
              <span
                :class="{
                  'text-yellow-500': bet.status === 'pending',
                  'text-green-600': bet.status === 'won',
                  'text-red-600': bet.status === 'lost'
                }"
              >
                {{ bet.status }}
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const bets = ref([])
const loading = ref(true)

// Fonction pour récupérer le nom de l'équipe pariée
const getTeamName = (match, teamId) => {
  if (!match) return ''
  if (teamId === match.teamAId) return match.teamA.name
  if (teamId === match.teamBId) return match.teamB.name
  return ''
}

const fetchBets = async () => {
  loading.value = true
  try {
    const res = await axios.get('/api/bets/result')
    bets.value = res.data.results
  } catch (err) {
    alert(err.response?.data?.message || 'Erreur lors du chargement des paris')
  } finally {
    loading.value = false
  }
}

onMounted(fetchBets)
</script>
