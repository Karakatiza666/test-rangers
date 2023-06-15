import { createStore } from 'zustand/vanilla'

export const defaultCanvas = {
  width: 1920,
  height: 1080
}

const getRect = (width: number, height: number) => ({
  width,
  height,
  center: {
    x: width / 2,
    y: height / 2
  }
})

const getWindowSize = () => ({
  ...getRect(window.innerWidth, window.innerHeight),
  resolution: window.devicePixelRatio,
})

const getViewport = ({canvas}: {canvas: {width: number, height: number}}) => ({
  viewport: {
    canvas: getRect(canvas.width, canvas.height),
    ...getWindowSize(),
  }
})

export const useViewportSize = createStore<{
  viewport: ReturnType<typeof getViewport>['viewport'],
  resize: () => void
}>()
(set => ({
  ...getViewport({canvas: defaultCanvas}),
  resize: () => set(state => getViewport(state.viewport))
}))