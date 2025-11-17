import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useUserStore = defineStore('user', () => {
  const user = ref(null)
  const token = ref(null)

  const load = () => {
    if (process.client) {  
      token.value = localStorage.getItem('token')
      const u = localStorage.getItem('user')
      user.value = u ? JSON.parse(u) : null

      if (token.value) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token.value
      }
    }
  }

  const save = (u, t) => {
    user.value = u
    token.value = t
    if (process.client) {
      localStorage.setItem('user', JSON.stringify(u))
      localStorage.setItem('token', t)
    }
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + t
  }

  const logout = () => {
    user.value = null
    token.value = null
    if (process.client) {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    }
    delete axios.defaults.headers.common['Authorization']
  }

  return { user, token, load, save, logout }
})
