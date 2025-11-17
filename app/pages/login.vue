<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded shadow w-96">
      <h1 class="text-2xl font-bold mb-4">Connexion</h1>
      <form @submit.prevent="submit">
        <input v-model="email" type="email" placeholder="Email" class="w-full p-2 border rounded mb-2" />
        <input v-model="password" type="password" placeholder="Mot de passe" class="w-full p-2 border rounded mb-4" />
        <button class="w-full bg-blue-600 text-white p-2 rounded">Se connecter</button>
      </form>
      <p class="mt-4 text-sm text-gray-600">
        Pas encore de compte ? <NuxtLink to="/register" class="text-blue-600">Inscription</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useUserStore } from '../stores/user'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()
const store = useUserStore()

const submit = async () => {
  try {
    const res = await axios.post('/api/auth/login', { email: email.value, password: password.value })
    store.save(res.data.user, res.data.token)
    if (res.data.user.role === 'ADMIN') router.push('/admin')
    else router.push('/dashboard')
  } catch (err) {
    alert(err.response?.data?.statusMessage || 'Erreur login')
  }
}
</script>
