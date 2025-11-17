<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h1 class="text-2xl font-bold text-gray-800 mb-6">Modifier le match</h1>

      <form @submit.prevent="submit" class="space-y-4">
        <div>
          <label class="block text-gray-700 mb-1">Équipe A</label>
          <select v-model="teamAId" class="w-full border rounded p-2">
            <option v-for="team in teams" :key="team.id" :value="team.id">{{ team.name }}</option>
          </select>
        </div>

        <div>
          <label class="block text-gray-700 mb-1">Équipe B</label>
          <select v-model="teamBId" class="w-full border rounded p-2">
            <option v-for="team in teams" :key="team.id" :value="team.id">{{ team.name }}</option>
          </select>
        </div>

        <div>
          <label class="block text-gray-700 mb-1">Date & Heure</label>
          <input type="datetime-local" v-model="startTime" class="w-full border rounded p-2" />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-gray-700 mb-1">Cote Équipe A</label>
            <input type="number" v-model.number="oddsTeamA" min="1" class="w-full border rounded p-2" />
          </div>
          <div>
            <label class="block text-gray-700 mb-1">Cote Équipe B</label>
            <input type="number" v-model.number="oddsTeamB" min="1" class="w-full border rounded p-2" />
          </div>
        </div>

        <div>
          <label class="block text-gray-700 mb-1">Statut</label>
          <select v-model="status" class="w-full border rounded p-2">
            <option value="OPEN">Ouvert</option>
            <option value="CLOSED">Fermé</option>
            <option value="FINISHED">Terminé</option>
          </select>
        </div>

        <button
          type="submit"
          class="w-full bg-gray-900 hover:bg-gray-700 text-white font-medium px-4 py-2 rounded-lg transition"
        >
          Enregistrer
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const id = route.params.id

const teams = ref([])
const teamAId = ref(null)
const teamBId = ref(null)
const startTime = ref('')
const oddsTeamA = ref(1)
const oddsTeamB = ref(1)
const status = ref('OPEN')

const fetchTeams = async () => {
  try {
    const res = await axios.get('/api/admin/teams')
    teams.value = res.data
  } catch (err) {
    alert('Erreur lors du chargement des équipes')
  }
}

const fetchMatch = async () => {
  try {
    const res = await axios.get(`/api/admin/matchs/${id}`)
    const m = res.data
    teamAId.value = m.teamAId
    teamBId.value = m.teamBId
    startTime.value = new Date(m.startTime).toISOString().slice(0,16)
    oddsTeamA.value = m.oddsTeamA
    oddsTeamB.value = m.oddsTeamB
    status.value = m.status
  } catch (err) {
    alert('Erreur lors du chargement du match')
  }
}

const submit = async () => {
  try {
    await axios.put(`/api/admin/matchs/${id}`, {
      teamAId: teamAId.value,
      teamBId: teamBId.value,
      startTime: startTime.value,
      oddsTeamA: oddsTeamA.value,
      oddsTeamB: oddsTeamB.value,
      status: status.value
    })
    alert('Match mis à jour')
    router.push('/admin')
  } catch (err) {
    alert(err.response?.data?.statusMessage || 'Erreur lors de la mise à jour')
  }
}

onMounted(() => {
  fetchTeams()
  fetchMatch()
})
</script>
