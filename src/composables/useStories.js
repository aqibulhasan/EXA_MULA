import { ref, reactive } from 'vue'
import { storyAPI } from '../services/firebase.js'

export function useStories() {
  const stories = ref([])
  const loading = ref(false)
  const loadError = ref(null)
  const filters = reactive({ vibe: '' })

  const loadStories = async () => {
    loading.value = true
    loadError.value = null
    try {
      stories.value = await storyAPI.fetchAll({ ...filters })
    } catch (e) {
      loadError.value = e.message
    } finally {
      loading.value = false
    }
  }

  const vote = async (id, dir) => {
    const s = stories.value.find((s) => s.id === id)
    if (s) dir === 'up' ? s.upvotes++ : s.downvotes++
    await storyAPI.vote(id, dir)
  }

  return { stories, loading, loadError, filters, loadStories, vote }
}

export function useStory() {
  const story = ref(null)
  const loading = ref(true)
  const error = ref(null)

  const loadStory = async (id) => {
    loading.value = true
    error.value = null
    try {
      story.value = await storyAPI.fetchOne(id)
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  const vote = async (dir) => {
    if (!story.value) return
    dir === 'up' ? story.value.upvotes++ : story.value.downvotes++
    await storyAPI.vote(story.value.id, dir)
  }

  return { story, loading, error, loadStory, vote }
}

const validateStory = (f) => {
  const e = {}
  if (!f.vibe) e.vibe = 'Please select a vibe'
  if (!f.title.trim()) e.title = 'Please enter a story title'
  if (!f.body.trim()) e.body = 'Please write your story'
  return e
}

export function useSubmit() {
  const form = reactive({ vibe: '', title: '', body: '' })
  const errors = reactive({})
  const submitting = ref(false)
  const submitError = ref(null)
  const submitted = ref(false)

  const handleSubmit = async () => {
    const e = validateStory(form)
    Object.keys(errors).forEach((k) => delete errors[k])
    Object.assign(errors, e)
    if (Object.keys(e).length > 0) return

    submitting.value = true
    submitError.value = null
    try {
      await storyAPI.create({ ...form })
      submitted.value = true
    } catch (e) {
      submitError.value = e.message
    } finally {
      submitting.value = false
    }
  }

  return { form, errors, submitting, submitError, submitted, handleSubmit }
}
