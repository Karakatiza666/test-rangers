import { Viewport } from "pixi-viewport";
import { DisplayObject, IDestroyOptions, Point, Sprite, Texture, Ticker } from "pixi.js";
import '@pixi/math-extras';
import { Disposer } from "../../engine/Disposer";

export class PerspectiveBackground extends Sprite {
   constructor(img: Texture, private viewport: Viewport, private perspective: number, private offset?: Point) {
      super(img);
      
      this.onUpdate()
      Ticker.shared.add(this.onUpdate, this)
      this.addChild(new Disposer(() => Ticker.shared.remove(this.onUpdate, this)))
   }

   onUpdate() {
      this.position.copyFrom(
         this.viewport.toLocal(this.viewport.position.multiplyScalar(this.perspective)).add(this.offset)
      )
   }
}