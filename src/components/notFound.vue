<template>
  <div class="flex items-center gap-5 p-6 bg-gray-600 rounded-lg text-xl">
    <span class="material-icons" v-if="ico"> {{ ico }} </span>
    <span>{{ text }}</span>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  text: {
    type: String,
    required: true,
  },
  ico: {
    type: String,
    default: null,
  },
})
</script>
