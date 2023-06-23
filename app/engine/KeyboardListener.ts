
import { EmptyObject } from "./EmptyObject"

export class KeyboardListener extends EmptyObject {
   constructor() {
      super()
      const onDown = this.onKeyDown.bind(this)
      window.addEventListener('keydown', onDown)
      this.dispose = () => {
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