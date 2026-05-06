<script setup>
import { ref } from 'vue'
import { useSubmit } from '../composables/useStories.js'

const { form, errors, submitting, submitError, submitted, handleSubmit } = useSubmit()

</script>

<template>
  <div>
    <div class="guidelines">
      <h2>Guidelines</h2>
      <p>To maintain professionalism and respect privacy, we kindly request that you refrain from mentioning individual names in your reviews. Please refer to individuals by their roles or designations instead.</p>
      <p>Thank you for being part of the Exa Mula community.</p>
    </div>

    <div v-if="submitted" class="success-card">
      <div class="success-icon">✓</div>
      <h3>Story submitted!</h3>
      <p>Your story has been published. Thank you for sharing.</p>
      <a href="#/" class="btn-back">← Back to Stories</a>
    </div>

    <div v-else class="form-card">
      <div class="form-row">
        <div class="form-label">Vibe</div>
        <div class="form-field col">
          <select v-model="form.vibe" :class="{ 'is-error': errors.vibe }">
            <option value="">Select Vibe</option>
            <option value="positive">👍 Positive</option>
            <option value="negative">👎 Negative</option>
            <option value="neutral">😐 Neutral</option>
          </select>
          <span v-if="errors.vibe" class="field-error">{{ errors.vibe }}</span>
        </div>
      </div>

      <div class="form-row">
        <div class="form-label">Story Title</div>
        <div class="form-field col">
          <input v-model="form.title" type="text" placeholder="One line title of your story" :class="{ 'is-error': errors.title }" />
          <span v-if="errors.title" class="field-error">{{ errors.title }}</span>
        </div>
      </div>

      <div class="form-row align-top">
        <div class="form-label" style="padding-top: 15px;min-height: 180px;">Story</div>
        <div class="form-field col" style="padding: 12px 14px">
          <div class="editor-wrap" :class="{ 'is-error': errors.body }">
            <textarea name="story" style="min-height: 150px;" v-model="form.body" placeholder="Write your story here…"></textarea>
          </div>
          <span v-if="errors.body" class="field-error">{{ errors.body }}</span>
        </div>
      </div>

      <div v-if="submitError" class="submit-error">⚠ {{ submitError }}</div>

      <div class="form-actions">
        <a href="#/" class="btn-cancel">Cancel</a>
        <button class="btn-submit" :disabled="submitting" @click="handleSubmit">
          {{ submitting ? 'Submitting…' : 'Submit Story' }}
        </button>
      </div>
    </div>
  </div>
</template>
