<template>
  <li class="mb-4 border border-gray-300 p-4 rounded-lg">
    <div class="mb-4">
      <p v-html="comment.text" class="m-0"></p>
      <small class="block mt-2 text-sm text-gray-400">Автор: {{ comment.by }}</small>
      <small class="block text-sm text-gray-400">Опубликовано: {{ toDate(comment.time) }}</small>
      <button
        class="flex items-center gap-2 mt-5 text-blue-400 hover:text-blue-600 font-semibold"
        @click="onLoadReplies"
        v-if="comment?.kids?.length && !replies.length && !isLoaded"
        :disabled="isLoadingMore"
      >
        <span class="material-icons"> subdirectory_arrow_right </span>
        {{ isLoadingMore ? 'Загрузка ответов...' : 'Показать ответы' }}
      </button>
    </div>

    <ul v-if="replies.length" class="list-none p-0">
      <commentTree v-for="reply in replies" :key="reply.id" :comment="reply" />
    </ul>
  </li>
</template>

<script setup>
import { defineProps, ref, inject } from 'vue'
import commentTree from '@/components/shared/comments/tree.vue'
import { toDate } from '@/helpers/main'

const props = defineProps({
  comment: {
    type: Object,
    required: true,
  },
})

const replies = ref(props.comment.replies || [])
const { loadChildComments } = inject('comments')
const isLoadingMore = ref(false)
const isLoaded = ref(false)

const onLoadReplies = async () => {
  isLoadingMore.value = true
  try {
    const tree = await loadChildComments(props.comment.id)
    replies.value = tree?.replies || []
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error)
  } finally {
    isLoadingMore.value = false
    isLoaded.value = true
  }
}
</script>
