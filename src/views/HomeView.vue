<script setup>
import { ref, onMounted } from 'vue'
import VibeBadge from '../components/VibeBadge.vue'
import StoryDetailModal from '../components/StoryDetailModal.vue'
import { useStories } from '../composables/useStories.js'
import { formatDate } from '../services/firebase.js'
import Story from '../components/Story.vue'
import UpBtn from '../components/UpBtn.vue'
import DownBtn from '../components/DownBtn.vue'
import StoryCount from '../components/StoryCount.vue'
const { stories, loading, loadError, filters, loadStories, vote } = useStories()
const activeStoryId = ref(null)

const openStory = (id) => (activeStoryId.value = id)
const closeStory = () => (activeStoryId.value = null)
const truncate = (text, maxLength = 100) =>
  text.length > maxLength ? text.slice(0, maxLength) + '…' : text

  const modifiedStory = (story) => ({
    ...story,
    body: truncate(story.body, 100),
  })

onMounted(loadStories)
</script>

<template>
  <div>
    <div class="filters">
      <div class="filter-group">
        <span class="filter-label">Vibe</span>
        <select v-model="filters.vibe">
          <option value="">Select Vibe</option>
          <option value="positive">👍 Positive</option>
          <option value="negative">👎 Negative</option>
          <option value="neutral">😐 Neutral</option>
        </select>
      </div>
      <button class="btn-search" @click="loadStories">Search</button>
    </div>

    <div v-if="loading" class="state-msg">Loading stories…</div>
    <div v-else-if="loadError" class="state-msg err">
      ⚠ {{ loadError }}<br />
      <small>Check your Firebase config in src/services/firebase.js (search for FIREBASE_CONFIG)</small>
    </div>
    <div v-else-if="stories.length === 0" class="empty-state">
      <h3>No stories found</h3>
      <p>Try a different search or <a href="#/submit" style="color: var(--accent)">be the first to share</a>.</p>
    </div>
    <div v-else class="story-list">
        <div v-for="story in stories" :key="story.id"             class="story-card">
        <Story
            :story="modifiedStory(story)"

            @click="openStory(story.id)"
            ></Story>
        <div class="card-actions">
          <span class="read-more" @click.stop="openStory(story.id)">Read More</span>
            <up-btn  :upVotes="story.upvotes" @click.stop="vote(story.id, 'up')" />
            <down-btn :downVotes="story.downvotes" @click.stop="vote(story.id, 'down')"></down-btn>
            <story-count :comment-count="story.commentCount" />
        </div>
    </div>

    </div>

    <Teleport to="body">
      <div v-if="activeStoryId" class="modal-overlay" @click.self="closeStory">
        <StoryDetailModal :story-id="activeStoryId" @close="closeStory" />
      </div>
    </Teleport>
  </div>
</template>
