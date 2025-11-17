<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-3xl mx-auto bg-white p-6 rounded shadow">

      <h1 class="text-2xl font-bold text-gray-800 mb-6">Ajouter un nouveau match</h1>

      <form @submit.prevent="submit">
        <!-- Sélection équipe A -->
        <label class="block mb-2 font-medium text-gray-700">Équipe A</label>
        <select v-model="teamAId" class="w-full p-2 border rounded mb-4">
          <option value="" disabled>Choisir une équipe</option>
          <option v-for="team in teams" :key="team.id" :value="team.id">{{ team.name }}</option>
        </select>

        <!-- Sélection équipe B -->
        <label class="block mb-2 font-medium text-gray-700">Équipe B</label>
        <select v-model="teamBId" class="w-full p-2 border rounded mb-4">
          <option value="" disabled>Choisir une équipe</option>
          <option v-for="team in teams" :key="team.id" :value="team.id">{{ team.name }}</option>
        </select>

        <!-- Date et heure du match -->
        <label class="block mb-2 font-medium text-gray-700">Date & Heure</label>
        <input type="datetime-local" v-model="startTime" class="w-full p-2 border rounded mb-4" />

        <!-- Cotes -->
        <label class="block mb-2 font-medium text-gray-700">Cote équipe A</label>
        <input type="number" step="0.01" v-model.number="oddsTeamA" class="w-full p-2 border rounded mb-4" />

        <label class="block mb-2 font-medium text-gray-700">Cote équipe B</label>
        <input type="number" step="0.01" v-model.number="oddsTeamB" class="w-full p-2 border rounded mb-4" />

        <!-- Status -->
        <label class="block mb-2 font-medium text-gray-700">Status</label>
        <select v-model="status" class="w-full p-2 border rounded mb-4">
          <option value="SCHEDULED">Prévu</option>
          <option value="LIVE">En cours</option>
          <option value="FINISHED">Terminé</option>
        </select>

        <button type="submit" class="w-full bg-gray-900 hover:bg-gray-700 text-white p-2 rounded transition">
          Ajouter le match
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const teams = ref([])

const teamAId = ref('')
const teamBId = ref('')
const startTime = ref('')
const oddsTeamA = ref(1.0)
const oddsTeamB = ref(1.0)
const status = ref('SCHEDULED')

const fetchTeams = async () => {
  try {
    const res = await axios.get('/api/admin/teams')
    teams.value = res.data
  } catch (err) {
    alert('Erreur lors du chargement des équipes')
  }
}

const submit = async () => {
  if (!teamAId.value || !teamBId.value) {
    alert('Veuillez sélectionner les deux équipes')
    return
  }
  if (teamAId.value === teamBId.value) {
    alert('Les équipes doivent être différentes')
    return
  }

  try {
    await axios.post('/api/admin/matchs', {
      teamAId: teamAId.value,
      teamBId: teamBId.value,
      startTime: startTime.value,
      oddsTeamA: oddsTeamA.value,
      oddsTeamB: oddsTeamB.value,
      status: status.value
    })
    alert('Match ajouté !')
    router.push('/admin')
  } catch (err) {
    alert(err.response?.data?.statusMessage || 'Erreur lors de l’ajout')
  }
}

onMounted(fetchTeams)
</script>
