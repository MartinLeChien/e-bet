<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">

    <main class="flex-1 p-6">
      <div class="max-w-5xl mx-auto">
        <h1 class="text-3xl font-bold text-gray-800 mb-8">Matchs disponibles</h1>

        <div v-if="loading" class="text-gray-500 text-center mt-10">
          Chargement des matchs...
        </div>

        <div v-else>
          <div v-if="matches.length === 0" class="text-gray-500 text-center mt-10">
            Aucun match disponible pour le moment.
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              v-for="match in matches"
              :key="match.id"
              class="bg-white border border-gray-200 rounded-xl shadow-sm p-5 flex flex-col justify-between hover:shadow-md transition"
            >

              <!-- Teams -->
              <div>
                <div class="flex justify-between items-center mb-4">
                  <div class="flex items-center space-x-2">
                    <span class="text-gray-700 font-semibold">{{ match.teamA.name }}</span>
                  </div>

                  <span class="text-gray-400">vs</span>

                  <div class="flex items-center space-x-2">
                    <span class="text-gray-700 font-semibold">{{ match.teamB.name }}</span>
                  </div>
                </div>

                <!-- Date -->
                <div class="text-sm text-gray-500 mb-4">
                  {{ new Date(match.startTime).toLocaleString() }}
                </div>

                <!-- Odds -->
                <div class="flex justify-between text-gray-700 mb-4">
                  <div class="font-medium">Cote {{ match.teamA.name }} :</div>
                  <div>{{ match.oddsTeamA }}</div>
                </div>

                <div class="flex justify-between text-gray-700 mb-4">
                  <div class="font-medium">Cote {{ match.teamB.name }} :</div>
                  <div>{{ match.oddsTeamB }}</div>
                </div>
              </div>

              <!-- Bet Selection -->
              <div class="flex items-center space-x-3 mt-4">
                <input
                  type="number"
                  min="1"
                  v-model.number="betAmounts[match.id]"
                  placeholder="Montant €"
                  class="border border-gray-300 rounded-lg p-2 w-28 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                />

                <!-- Choix de l'équipe -->
                <select
                  v-model="selectedTeams[match.id]"
                  class="border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  <option disabled value="">Sélectionnez une équipe</option>
                  <option :value="match.teamA.id">{{ match.teamA.name }}</option>
                  <option :value="match.teamB.id">{{ match.teamB.name }}</option>
                </select>

                <button
                  @click="placeBet(match.id)"
                  class="flex-1 bg-gray-900 hover:bg-gray-700 text-white font-medium px-4 py-2 rounded-lg transition"
                >
                  Parier
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>

    <UserFooter />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import UserNavbar from '../components/UserNavbar.vue'
import UserFooter from '../components/UserFooter.vue'

const matches = ref([])
const loading = ref(true)
const betAmounts = ref({})
const selectedTeams = ref({})

const fetchMatches = async () => {
  try {
    const res = await axios.get('/api/matchs')
    matches.value = res.data
    matches.value.forEach(m => {
      betAmounts.value[m.id] = 0
      selectedTeams.value[m.id] = ''
    })
  } catch (err) {
    alert('Erreur lors du chargement des matchs')
  } finally {
    loading.value = false
  }
}

const placeBet = async (matchId) => {
  const amount = betAmounts.value[matchId]
  const teamId = selectedTeams.value[matchId]

  if (!amount || amount <= 0) return alert("Montant invalide")
  if (!teamId) return alert("Veuillez sélectionner une équipe")

  try {
    await axios.post('/api/bets', { matchId, teamId, amount })
    alert('Pari enregistré !')
    betAmounts.value[matchId] = 0
    selectedTeams.value[matchId] = ''
  } catch (err) {
    alert(err.response?.data?.message || "Erreur serveur")
  }
}

onMounted(fetchMatches)
</script>
