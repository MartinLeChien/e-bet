<template>
  <div class="min-h-screen bg-gray-50 p-6 flex justify-center items-start">
    <div class="bg-white p-8 rounded shadow w-full max-w-md mt-10">
      <h1 class="text-2xl font-bold text-gray-800 mb-6">Nouvelle équipe</h1>

      <form @submit.prevent="submit">
        <label class="block mb-2 text-gray-700">Nom de l'équipe</label>
        <input
          v-model="name"
          type="text"
          placeholder="Ex: Solary"
          class="w-full p-2 border rounded mb-4"
        />

        <label class="block mb-2 text-gray-700">URL du logo</label>
        <input
          v-model="logoUrl"
          type="text"
          placeholder="https://example.com/logo.png"
          class="w-full p-2 border rounded mb-4"
        />

        <button
          type="submit"
          class="w-full bg-gray-900 hover:bg-gray-700 text-white p-2 rounded transition"
        >
          Créer l'équipe
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const name = ref('')
const logoUrl = ref('')
const router = useRouter()

const submit = async () => {
  if (!name.value) {
    alert('Veuillez saisir un nom pour l’équipe.')
    return
  }

  try {
    await axios.post('/api/admin/teams', { name: name.value, logoUrl: logoUrl.value })
    alert('Équipe créée !')
    router.push('/admin')
  } catch (err) {
    alert(err.response?.data?.statusMessage || 'Erreur lors de la création')
  }
}
</script>
