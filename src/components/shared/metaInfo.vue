<template>
  <div class="flex items-center text-gray-400 text-sm">
    <div class="flex items-center gap-1 mr-4">
      <span class="material-icons text-base text-gray-400">schedule</span>
      <span>{{ toDate(meta.time) }}</span>
    </div>
    <div class="flex items-center gap-1 mr-4">
      <span class="material-icons text-base text-gray-400">thumb_up</span>
      <span>{{ meta.score }}</span>
    </div>
    <div class="flex items-center gap-1">
      <span class="material-icons text-base text-gray-400">person</span>
      <span>{{ meta.by }}</span>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { toDate } from '@/helpers/main'

defineProps({
  meta: {
    type: Object,
    required: true,
  },
})
</script>
