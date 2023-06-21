import { DisplayObject, IDestroyOptions, Renderer } from "pixi.js";

export class EmptyObject extends DisplayObject {
   protected dispose?: () => void
   sortDirty = false
   calculateBounds(): void {
   }
   removeChild(child: DisplayObject): void {
   }
   render(renderer: Renderer): void {
   }
   destroy(options?: boolean | IDestroyOptions | undefined): void {
      if (this.dispose) {
         this.dispose()
      }
      super.destroy(options)
   }
}