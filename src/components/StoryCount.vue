<template>
          <span class="vote-btn"><svg b-dbb52gm75x="" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#343232" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle-icon lucide-message-circle"><path b-dbb52gm75x="" d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path></svg> {{ commentCount }}</span>
</template>

<script setup>
defineProps({commentCount: Number})
</script>
