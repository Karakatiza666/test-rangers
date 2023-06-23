import { Point } from "pixi.js"
import { IDirectionControl } from "./IDirectionControl"
import { EmptyObject } from "./EmptyObject"

export class KeyboardMovementControl extends EmptyObject implements IDirectionControl {
   private keys: Record<string, boolean> = {}
   private keyScalar: Record<string, number> = {
      'KeyW': -1, 'KeyS': 1, 'KeyA': -1, 'KeyD': 1
   }
   constructor() {
      super()
      const onDown = this.onKeyDown.bind(this)
      const onUp = this.onKeyUp.bind(this)
      window.addEventListener('keydown', onDown)
      window.addEventListener('keyup', onUp)
      this.dispose = () => {
         window.removeEventListener('keydown', onDown)
         window.removeEventListener('keyup', onUp)
      }
   }

   private onKeyDown(e: KeyboardEvent) {
      if (this.keyScalar[e.code] !== 0) {
         this.keys[e.code] = true
      }
   }

   private onKeyUp(e: KeyboardEvent) {
      this.keys[e.code] = false
   }

   private getScalar(cs: string[]) {
      return cs.filter(c => this.keys[c]).map(c => this.keyScalar[c]).reduce((acc, cur) => acc + cur, 0)
   }
   getVector() {
      const x = this.getScalar(['KeyA', 'KeyD'])
      const y = this.getScalar(['KeyW', 'KeyS'])
      const magnitude = Math.sqrt(x ** 2 + y ** 2) || 1
      return new Point(x / magnitude, y / magnitude)
   }
}