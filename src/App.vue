<script setup>
import { ref, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import AppNavbar from '@/components/AppNavbar.vue'
import AppFooter from '@/components/AppFooter.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

const loading = ref(true)

onMounted(async () => {
  // 預載入資源
  await preloadResources()
  loading.value = false
})

// 預載入資源的方法
const preloadResources = async () => {
  const images = [
    '/assets/imgs/header/profile.jpg',
    '/assets/resume/Homer_Shie_Resume.pdf',
    // 添加其他需要預載入的資源
  ]

  const promises = images.map((src) => {
    return new Promise((resolve) => {
      const img = new Image()
      img.src = src
      img.onload = resolve
      img.onerror = resolve
    })
  })

  await Promise.all(promises)
}
</script>

<template>
  <div id="app">
    <!-- 全局 Loading -->
    <LoadingSpinner v-if="loading" />

    <template v-else>
      <!-- Navigation -->
      <AppNavbar />

      <!-- Main Content -->
      <main>
        <RouterView />
      </main>

      <!-- Footer -->
      <AppFooter />
    </template>
  </div>
</template>

<style>
/* Global styles will be imported from main.js */
#app {
  height: 100vh;
  width: 100%;
}
</style>
