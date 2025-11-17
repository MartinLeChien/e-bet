<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="text-center px-6 py-12 bg-white shadow-md rounded-lg max-w-md">
      <h1 class="text-4xl font-bold text-gray-800 mb-4">e-Bet</h1>
      <p class="text-gray-600 mb-8">Pariez sur vos équipes e-sportives préférées et suivez vos gains en temps réel.</p>
      <button
        @click="goLogin"
        class="bg-gray-800 text-white font-semibold px-6 py-3 rounded-lg hover:bg-gray-700 transition"
      >
        Se connecter
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const goLogin = () => {
  router.push('/login') // redirection vers la page de connexion
}
</script>
