import { Bounds, Container, DRAW_MODES, DisplayObject, Graphics, IDestroyOptions, Rectangle, Renderer, Transform } from "pixi.js";
import { EmptyObject } from "./EmptyObject";

export class HealthObject extends EmptyObject {
   private graphics: Graphics
   constructor(parent: Container) {
      super()
      this._bounds.addFrame(new Transform(), -parent.width/2, -parent.height/2, parent.width/2, parent.height/2)
      this.graphics = new Graphics();

      const b = this.getBounds()
      this.graphics.lineStyle(4, 0x11DD11, 1);
      this.graphics.drawRect(b.x, b.y, b.width, b.height);
      this.graphics.position.set(0, 0)

      parent.addChild(this.graphics)
   }
}