import { EmptyObject } from "./EmptyObject";

export class KeyboardControl extends EmptyObject {
   private keys: Record<string, boolean> = {}
   constructor(private actions: Record<string, () => void>) {
      super()
      const onDown = this.onKeyDown.bind(this)
      const onUp = this.onKeyUp.bind(this)
      window.addEventListener('keydown', onDown)
      window.addEventListener('keyup', onUp)
      this.dispose = () => {
         window.removeEventListener('keydown', onDown)
         window.removeEventListener('keyup', onUp)
         for (const key of Object.keys(actions)) {
            delete this.actions[key]
         }
      }
   }
   private onKeyDown(e: KeyboardEvent) {
      if (this.actions[e.code] && !this.keys[e.code]) {
         this.keys[e.code] = true
         this.actions[e.code]()
      }
   }

   private onKeyUp(e: KeyboardEvent) {
      this.keys[e.code] = false
   }
}