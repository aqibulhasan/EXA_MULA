<script setup>
import { computed } from 'vue'

const props = defineProps({ vibe: String })

const label = computed(
  () =>
    ({
      positive: '👍 Positive',
      negative: '👎 Negative',
      neutral: '😐 Neutral',
    }[props.vibe] ?? props.vibe),
)

const cls = computed(() => `badge badge-${props.vibe}`)
</script>

<template>
  <span :class="cls">{{ label }}</span>
</template>
