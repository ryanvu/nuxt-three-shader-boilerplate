import { onMounted, onUnmounted } from 'vue'
import Lenis from 'lenis'
import type { UseSceneState } from './useSceneState'

export const useSceneHandlers = (state: UseSceneState) => {
  const { mouse, scroll, uniforms } = state

  const { onLoop } = useRenderLoop()

  onLoop(({ elapsed }) => {
    uniforms.uTime.value += 0.001;
  });

  onMounted(() => {
    // Mouse handler
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
      uniforms.uMouse.value.set(mouse.x, mouse.y)
    }

    // Smooth scroll setup
    const lenis = new Lenis()
    
    const onScroll = () => {
      scroll.value = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
      uniforms.uScrollProgress.value = scroll.value
    }

    lenis.on('scroll', onScroll)

    const raf = (time: number) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    window.addEventListener('mousemove', onMouseMove)
    requestAnimationFrame(raf)

    onUnmounted(() => {
      window.removeEventListener('mousemove', onMouseMove)
      lenis.destroy()
    })
  })
}
