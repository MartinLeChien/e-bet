<template>
  <nav class="bg-gray-900 text-white shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <!-- Logo / Brand -->
        <div class="flex-shrink-0 flex items-center">
          <span class="text-2xl font-bold text-yellow-500">E-Bet</span>
        </div>

        <!-- Navigation Links -->
        <div class="hidden md:flex md:space-x-8 md:items-center">
          <router-link 
            to="/dashboard" 
            class="hover:text-yellow-500 px-3 py-2 rounded-md text-sm font-medium"
            active-class="text-yellow-500"
          >
            Matchs
          </router-link>

          <router-link 
            to="/bets" 
            class="hover:text-yellow-500 px-3 py-2 rounded-md text-sm font-medium"
            active-class="text-yellow-500"
          >
            Mes Paris
          </router-link>

          <router-link 
            to="/profile" 
            class="hover:text-yellow-500 px-3 py-2 rounded-md text-sm font-medium"
            active-class="text-yellow-500"
          >
            Profile
          </router-link>
        </div>

        <!-- Mobile menu button -->
        <div class="flex items-center md:hidden">
          <button @click="mobileMenuOpen = !mobileMenuOpen" class="focus:outline-none">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16"/>
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-if="mobileMenuOpen" class="md:hidden bg-gray-800">
      <router-link 
        to="/dashboard" 
        class="block px-4 py-2 text-white hover:bg-gray-700"
      >
        Matchs
      </router-link>
      <router-link 
        to="/bet" 
        class="block px-4 py-2 text-white hover:bg-gray-700"
      >
        Mes Paris
      </router-link>
      <router-link 
        to="/profile" 
        class="block px-4 py-2 text-white hover:bg-gray-700"
      >
        Profile
      </router-link>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';

const mobileMenuOpen = ref(false);
</script>

