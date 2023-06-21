
import { EmptyObject } from "./EmptyObject"

export class KeyboardGlobalListener extends EmptyObject {
   constructor() {
      super()
      const onDown = this.onKeyDown.bind(this)
      window.addEventListener('keydown', onDown)
      this.dispose = () => {
         console.log('dispose KeyboardGlobalListener')
         window.removeEventListener('keydown', onDown)
      }
   }

   private onKeyDown(e: KeyboardEvent) {
      switch (e.code) {
         case 'Escape': if (this.onEscape) this.onEscape(); break
      }
   }

   onEscape?: () => void
}