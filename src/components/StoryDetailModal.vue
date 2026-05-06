<script setup>
import { onMounted } from 'vue'
import VibeBadge from './VibeBadge.vue'
import CommentSection from './CommentSection.vue'
import { useStory } from '../composables/useStories.js'
import { formatDate } from '../services/firebase.js'
import Story from './Story.vue'
import UpBtn from './UpBtn.vue'
import DownBtn from './DownBtn.vue'
import StoryCount from './StoryCount.vue'

const props = defineProps({ storyId: String })
const emit = defineEmits(['close'])

const { story, loading, error, loadStory, vote } = useStory()

onMounted(() => loadStory(props.storyId))
</script>

<template>
  <div class="modal">
    <button class="modal-close" @click="$emit('close')" >✕</button>
    <div v-if="loading" class="modal-state">Loading…</div>
    <div v-else-if="error" class="modal-state error">⚠ {{ error }}</div>
    <template v-else-if="story">
        <Story :story="story" style="margin-top: 10px;"/>
        <div class="card-actions">
            <up-btn  :upVotes="story.upvotes" @click="vote(story.id, 'up')" />
            <down-btn :downVotes="story.downvotes" @click="vote(story.id, 'down')"></down-btn>
            <story-count :count="story.commentCount" />
        </div>
        <hr class="divider" />
      <CommentSection :story-id="story.id" />
    </template>
  </div>
</template>
