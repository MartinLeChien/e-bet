<template>
  <div class="max-w-4xl mx-auto p-6">
    <h1 class="text-3xl font-bold mb-8 text-center">Mon Profil</h1>

    <div v-if="loading" class="text-gray-500 text-center">Chargement...</div>
    <div v-else-if="error" class="text-red-500 text-center">{{ error }}</div>
    
    <div v-else class="bg-white shadow-lg rounded-xl p-8">
      <!-- Header profil -->
      <div class="flex items-center space-x-6 mb-8">
        <img
          :src="userStore.user?.avatar || 'https://via.placeholder.com/100'"
          alt="Avatar"
          class="w-24 h-24 rounded-full border-2 border-gray-300"
        />
        <div>
          <h2 class="text-2xl font-semibold">{{ userStore.user?.name }}</h2>
          <p class="text-gray-600">{{ userStore.user?.email }}</p>
          <p class="text-gray-500 text-sm">Rôle : {{ userStore.user?.role }}</p>
        </div>
      </div>

      <!-- Statistiques -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div class="bg-gray-50 rounded-lg p-4 text-center shadow">
          <p class="text-gray-500">Pari total</p>
          <p class="text-xl font-bold">{{ userStore.user?.totalBets ?? 0 }}</p>
        </div>
        <div class="bg-gray-50 rounded-lg p-4 text-center shadow">
          <p class="text-gray-500">Gains</p>
          <p class="text-xl font-bold">{{ userStore.user?.winnings ?? 0 }} €</p>
        </div>
        <div class="bg-gray-50 rounded-lg p-4 text-center shadow">
          <p class="text-gray-500">Date d'inscription</p>
          <p class="text-xl font-bold">{{ formatDate(userStore.user?.createdAt) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '../stores/user'
import axios from 'axios'

const userStore = useUserStore()
const loading = ref(true)
const error = ref(null)

const formatDate = (dateStr) => {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleDateString()
}

const fetchProfile = async () => {
  loading.value = true
  error.value = null
  try {
    userStore.load()
    if (!userStore.user) {
      const res = await axios.get('/api/user')
      userStore.save(res.data, userStore.token)
    }
  } catch (err) {
    error.value = err.response?.data?.message || err.message
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchProfile()
})
</script>
