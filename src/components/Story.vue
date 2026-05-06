<template>
      <article>
        <div class="card-meta">
          <VibeBadge :vibe="story.vibe" />
          <span class="card-date">{{ formatDate(story.createdAt) }}</span>
        </div>
        <h2 class="card-title">{{ story.title }}</h2>
        <p class="card-excerpt">{{ story.body }}</p>
      </article>
</template>

<script setup>
import VibeBadge from './VibeBadge.vue'
import { formatDate } from '../services/firebase.js'
defineProps({ story: Object })
</script>

<style lang="scss" scoped>

</style>
