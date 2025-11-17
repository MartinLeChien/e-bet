import { useUserStore } from '../stores/user'

export default defineNuxtPlugin(() => {
  const store = useUserStore()
  store.load()
})