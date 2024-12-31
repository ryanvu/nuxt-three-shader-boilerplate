<template>
  <div>
    <Scene class="fixed inset-0 -z-10 pointer-events-none" />
    <div class="min-h-[400vh] flex flex-col items-center">
      <section class="flex h-screen text-white text-[25vw] z-50">
        <p class="self-center">人</p>
      </section>
      <section class="flex h-screen text-white text-[25vw] z-50">
        <p class="self-center">間</p>
      </section>      
    </div>
  </div>
</template>

<script setup>
import Scene from '~/components/Scene.vue'
</script>