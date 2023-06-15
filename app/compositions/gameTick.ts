import { createStore } from 'zustand/vanilla'

const defaultState = {
   tick: 1,
   previousTick: 0,
   startTime: window.performance.now(),
   currentTime: window.performance.now(),
}

export const useGameTick = createStore<{
   current: typeof defaultState,
   next: () => void
}>()((set) => ({
   current: defaultState,
   next: () => set(state => ({
      current: {
         tick: state.current.tick + 1,
         previousTick: state.current.tick,
         startTime: state.current.startTime,
         currentTime: window.performance.now(),
      }
   })),
}))