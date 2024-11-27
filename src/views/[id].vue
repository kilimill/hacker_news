<template>
  <div class="page">
    <template v-if="story.isLoaded">
      <div class="container" v-if="story.content">
        <div class="flex justify-between mb-8">
          <div class="flex items-center gap-5">
            <router-link class="btn btn-ico" to="/">
              <span class="material-icons"> arrow_left </span>
            </router-link>
            <sharedMetaInfo :meta="story.content" />
          </div>
          <a
            class="btn btn-primary"
            v-if="story.content?.url"
            :href="story.content.url"
            target="_blank"
          >
            Читать на ресурсе
          </a>
        </div>
        <h1 class="title">{{ story.content.title }}</h1>
        <div class="html-base mt-8" v-html="story.content.text" v-if="story.content?.text"></div>
        <sharedComments class="mt-[150px]" :total="totalComments" @refresh="story.refresh" />
      </div>
      <div class="container" v-else>
        <notFound ico="sentiment_very_dissatisfied" text="К сожалению, такой новости еще нет." />
      </div>
    </template>
    <div class="h-screen flex items-center justify-center" v-else>
      <loader />
    </div>
  </div>
</template>

<script setup>
import { provide } from 'vue'
import useComments from '@/composables/useComments'
import { useRoute } from 'vue-router'
import sharedMetaInfo from '@/components/shared/metaInfo.vue'
import sharedComments from '@/components/shared/comments/index.vue'
import notFound from '@/components/notFound.vue'
import loader from '@/components/loader.vue'

const route = useRoute()
const id = route.params.id

const { dataService, story, loadChildComments, totalComments } = useComments(id)

provide('comments', { loadChildComments, commentList: dataService })
</script>
