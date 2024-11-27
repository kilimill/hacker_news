<template>
  <router-link
    class="p-6 bg-gray-800 rounded-lg shadow-md overflow-hidden hover:bg-gray-700 transition duration-300 block"
    :to="`/${content.id}`"
  >
    <h3
      class="text-xl font-semibold text-white mb-4 text-ellipsis overflow-hidden whitespace-nowrap"
    >
      {{ content.title }}
    </h3>
    <sharedMetaInfo :meta="content" />
  </router-link>
</template>

<script setup>
import { defineProps } from 'vue'
import { toDate } from '@/helpers/main'
import sharedMetaInfo from '@/components/shared/metaInfo.vue'

defineProps({
  content: {
    type: Object,
    required: true,
  },
})
</script>
