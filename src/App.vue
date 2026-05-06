<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import AppNav from './components/AppNav.vue'
import HomeView from './views/HomeView.vue'
import SubmitView from './views/SubmitView.vue'

const hash = ref(window.location.hash || '#/')
const onHashChange = () => { hash.value = window.location.hash || '#/' }

onMounted(() => window.addEventListener('hashchange', onHashChange))
onUnmounted(() => window.removeEventListener('hashchange', onHashChange))

const currentView = computed(() =>
  hash.value.startsWith('#/submit') ? SubmitView : HomeView
)
</script>

<template>
  <AppNav />
  <main class="main-wrap">
    <component :is="currentView" />
  </main>
  <footer class="footer">© 2026 Exa Mula · Internal Use Only</footer>
</template>
