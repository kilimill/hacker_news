<template>
  <section class="page">
    <div class="container">
      <div class="flex items-center justify-between mb-8">
        <h1 class="title">Свежие новости</h1>
        <button class="btn btn-ico" @click="dataService.refresh" :disabled="!dataService.isLoaded">
          <span class="material-icons"> refresh </span>
        </button>
      </div>
      <template class="" v-if="dataService.isLoaded">
        <ul class="space-y-4" v-if="dataService.content.length">
          <template v-for="el in dataService.content">
            <li class="" v-if="el?.id">
              <CardNews :content="el" />
            </li>
          </template>
        </ul>
        <notFound
          ico="sentiment_very_dissatisfied"
          text="К сожалению, мы не нашли ни одной свежей новости."
          v-else
        />
      </template>
      <skeletonList v-else />
    </div>
  </section>
</template>

<script setup>
import notFound from '@/components/notFound.vue'
import CardNews from '@/components/card/news.vue'
import skeletonList from '@/components/skeleton/list.vue'
import useDataService from '@/composables/useDataService.js'
import newsApi from '@/composables/api/useNewsApi'

const { dataService } = useDataService({
  getIds: newsApi.getList,
  getById: newsApi.getById,
  autoUpdate: true,
})
</script>
