<script setup>
import { useComments } from '../composables/useComments.js'
import { formatDate } from '../services/firebase.js'

const props = defineProps({ storyId: String })

const { comments, loading, posting, postError, author, text, handlePost } = useComments(props.storyId)
</script>

<template>
  <section class="comments">
    <h3 class="comments-title">
      Comments <span class="count">{{ comments.length }}</span>
    </h3>

    <div v-if="loading" class="c-state">Loading comments…</div>
    <div v-else-if="comments.length === 0" class="c-state">No comments yet. Be the first to respond.</div>
    <div v-else class="comment-list">
      <div v-for="c in comments" :key="c.id" class="comment">
        <div class="comment-header">
          <span class="comment-author">{{ c.author }}</span>
          <span class="comment-date">{{ formatDate(c.createdAt) }}</span>
        </div>
        <p class="comment-text">{{ c.text }}</p>
      </div>
    </div>

    <div class="comment-form">
      <h4 class="cf-title">Leave a comment</h4>
      <input v-model="author" type="text" class="c-input" placeholder="Your name (optional)" />
      <textarea v-model="text" class="c-textarea" placeholder="Share your thoughts…" rows="3"></textarea>
      <div v-if="postError" class="c-error">{{ postError }}</div>
      <button class="c-submit" :disabled="posting || !text.trim()" @click="handlePost">
        {{ posting ? 'Posting…' : 'Post Comment' }}
      </button>
    </div>
  </section>
</template>
