<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h1 class="text-2xl font-bold text-gray-800 mb-6">Modifier une équipe</h1>

      <form @submit.prevent="submit" class="space-y-4">
        <div>
          <label class="block text-gray-700 mb-1">Nom de l'équipe</label>
          <input
            type="text"
            v-model="name"
            class="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label class="block text-gray-700 mb-1">Logo (URL)</label>
          <input
            type="text"
            v-model="logoUrl"
            class="w-full border rounded p-2"
          />
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
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const id = route.params.id

const name = ref('')
const logoUrl = ref('')

const fetchTeam = async () => {
  try {
    const res = await axios.get(`/api/admin/teams/${id}`)
    const t = res.data
    name.value = t.name
    logoUrl.value = t.logoUrl
  } catch (err) {
    alert('Erreur lors du chargement de l’équipe')
  }
}

const submit = async () => {
  try {
    await axios.put(`/api/admin/teams/${id}`, {
      name: name.value,
      logoUrl: logoUrl.value
    })
    alert('Équipe modifiée')
    router.push('/admin/teams')
  } catch (err) {
    alert(err.response?.data?.statusMessage || 'Erreur lors de la mise à jour')
  }
}

onMounted(fetchTeam)
</script>
