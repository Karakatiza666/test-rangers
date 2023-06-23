import { Ticker } from "pixi.js"
import { EmptyObject } from "./EmptyObject"

export class TtlComponent extends EmptyObject {
   private ttl: number
   private age: number
   constructor(lifetimeSeconds: number) {
      super()
      this.age = Date.now()
      this.ttl = this.age + Math.floor(lifetimeSeconds * 1000)
      Ticker.shared.add(this.update, this)
      this.dispose = () => {
         Ticker.shared.remove(this.update, this)
      }
   }
   update(deltaFrame: number) {
      const dt = deltaFrame / Ticker.targetFPMS;
      this.age += dt
      if (this.age > this.ttl) {
         this.parent.destroy({children: true})
         this.destroy()
      }
   }
}