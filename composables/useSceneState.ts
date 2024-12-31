import { ref, reactive } from 'vue'
import * as THREE from 'three'

export type UseSceneState = ReturnType<typeof useSceneState>

export const useSceneState = () => {
  const mouse = reactive({
    x: 0,
    y: 0,
  })

  const scroll = ref(0)

  const uniforms = reactive({
    uMouse: { value: new THREE.Vector2() },
    uScrollProgress: { value: 0 },
    uTime: { value: 0 },
  })

  return {
    mouse,
    scroll,
    uniforms
  }
}