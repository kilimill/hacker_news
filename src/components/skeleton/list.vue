<template>
  <div role="status" class="animate-pulse w-full duration-300 flex gap-[38px]">
    <div class="w-full">
      <div class="space-y-4">
        <div class="rounded-xl w-full h-[115px] bg-gray-800 rounded-lg" v-for="elem in elems" :key="elem"></div>
      </div>
    </div>
    <span class="sr-only">Loading...</span>
  </div>
</template>

<script setup>
const elems = [0, 1, 2, 3, 4, 5, 6, 7]
</script>
