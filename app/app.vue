<template>
  <Navbar />

  <NuxtPage />

  <Footer />
</template>

<script setup>
import Navbar from '../components/UserNavbar.vue'
import Footer from '../components/UserFooter.vue'

import { useUserStore } from '../stores/user'
const store = useUserStore()
store.load() 
</script>
