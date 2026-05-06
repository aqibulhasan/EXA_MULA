import { ref, onUnmounted } from 'vue'
import { commentAPI } from '../services/firebase.js'

export function useComments(storyId) {
  const comments = ref([])
  const loading = ref(true)
  const posting = ref(false)
  const postError = ref(null)
  const author = ref('')
  const text = ref('')

  const unsubscribe = commentAPI.subscribe(storyId, (incoming) => {
    comments.value = incoming
    loading.value = false
  })

  onUnmounted(() => unsubscribe())

  const handlePost = async () => {
    if (!text.value.trim()) return
    posting.value = true
    postError.value = null
    try {
      await commentAPI.add(storyId, { author: author.value, text: text.value })
      text.value = ''
    } catch (e) {
      postError.value = e.message
    } finally {
      posting.value = false
    }
  }

  return { comments, loading, posting, postError, author, text, handlePost }
}
