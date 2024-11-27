<template>
  <div class="">
    <div class="flex items-center justify-between mb-8">
      <h2 class="text-2xl font-bold">
        Комментарии
        <span :class="[total.isLoaded ? '' : 'animate-pulse', 'text-blue-400 ']">{{
          total.isLoaded ? total.count : 'Считаем...'
        }}</span>
      </h2>
      <button class="btn btn-ico" @click="$emit('refresh')" v-show="commentList.content?.length">
        <span class="material-icons"> refresh </span>
      </button>
    </div>
    <template class="" v-if="commentList.isLoaded">
      <ul class="space-y-4" v-if="commentList.content.length">
        <template v-for="el in commentList.content">
          <li class="">
            <commentTree :comment="el" />
          </li>
        </template>
      </ul>
      <notFound ico="edit_off" text="Никто еще не прокомментировал эту новость" v-else />
    </template>
    <loader v-else />
  </div>
</template>

<script setup>
import { inject } from 'vue'
import commentTree from '@/components/shared/comments/tree.vue'
import loader from '@/components/loader.vue'
import notFound from '@/components/notFound.vue'

defineProps({
  total: Object,
})

defineEmits(['refresh'])

const { commentList } = inject('comments')
</script>
