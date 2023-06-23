import { EmptyObject } from "./EmptyObject";

export class AutoTrigger extends EmptyObject {
   private timer?: NodeJS.Timer
   private burstTimer?: NodeJS.Timer
   constructor(action: () => void, config: { periodMs: number, burst?: { timeoutMs: {range?: number, base: number}, periodMs: {range?: number, base: number}}}) {
      super()

      const getDuration = (d: {range?: number, base: number}) => d.base + Math.random() * (d.range ?? 0)
      const startBurst = () => {
         this.timer = setInterval(action, config.periodMs)
         this.burstTimer = setTimeout(stopBurst, getDuration(config.burst!.periodMs))
      }
      const stopBurst = () => {
         if (this.timer) {
            clearInterval(this.timer)
         }
         this.burstTimer = setTimeout(startBurst, getDuration(config.burst!.timeoutMs))
      }

      if ('burst' in config) {
         startBurst()
      } else {
         this.timer = setInterval(action, config.periodMs)
      }
      this.destroy = () => {
         if (this.timer) {
            clearInterval(this.timer)
         }
         if (this.burstTimer) {
            clearInterval(this.burstTimer)
         }
         super.destroy()
      }
   }
}