<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded shadow w-96">
      <h1 class="text-2xl font-bold mb-4">Inscription</h1>

      <form @submit.prevent="submit">
        <input
          v-model="username"
          type="text"
          placeholder="Nom d'utilisateur"
          class="w-full p-2 border rounded mb-2"
          required
        />

        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="w-full p-2 border rounded mb-2"
          required
        />

        <input
          v-model="password"
          type="password"
          placeholder="Mot de passe"
          class="w-full p-2 border rounded mb-4"
          required
        />

        <button class="w-full bg-green-600 text-white p-2 rounded">
          Créer mon compte
        </button>
      </form>

      <p class="mt-4 text-sm text-gray-600">
        Déjà un compte ?
        <NuxtLink to="/login" class="text-blue-600">Connexion</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useUserStore } from '../stores/user'
import { useRouter } from 'vue-router'

const username = ref('')
const email = ref('')
const password = ref('')
const store = useUserStore()
const router = useRouter()

const submit = async () => {
  try {
    const res = await axios.post('/api/auth/register', {
      username: username.value,
      email: email.value,
      password: password.value
    })

    store.save(res.data.user, res.data.token)

    if (res.data.user.role === 'ADMIN') router.push('/admin')
    else router.push('/bets')

  } catch (err) {
    alert(err.response?.data?.statusMessage || "Erreur lors de l'inscription")
  }
}
</script>
