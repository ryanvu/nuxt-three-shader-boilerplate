<template>
  <TresCanvas window-size>
    <TresPerspectiveCamera :position="[0, 0, 1]" :fov="50" />
    <TresMesh>
      <TresPlaneGeometry :args="[2, 2]" />
      <TresShaderMaterial 
        :uniforms="uniforms"
        :vertex-shader="vertexShader"
        :fragment-shader="fragmentShader"
      />
    </TresMesh>
  </TresCanvas>
</template>

<script setup lang="ts">
import { useSceneState } from '@/composables/useSceneState';
import { useSceneHandlers } from '@/composables/useSceneHandlers';
import { vertexShader, fragmentShader } from '@/components/shaders/basic';

const state = useSceneState()
const { uniforms } = state

useSceneHandlers(state)
</script>