import { Graphics, Container, Transform, Ticker } from "pixi.js";
import { EmptyObject } from "./EmptyObject";
import { IndexedContainer } from "./IndexedContainer";
import { Projectile } from "../displayobjects/gadgets/projectile";

export class ProjectileTarget extends EmptyObject {
   private graphics: Graphics
   constructor(parent: Container, private ether: IndexedContainer) {
      super()
      this._bounds.addFrame(new Transform(), -parent.width/2 + 2, -parent.height/2 + 2, parent.width/2 - 2, parent.height/2 - 2)
      this.graphics = new Graphics();

      const b = this.getBounds()
      this.graphics.lineStyle(4, 0xDD1111, 1);
      this.graphics.drawRect(b.x, b.y, b.width, b.height);
      this.graphics.position.set(0, 0)

      parent.addChild(this.graphics)

      Ticker.shared.add(this.update, this)
      this.dispose = () => {
         Ticker.shared.remove(this.update, this)
      }
   }

   update(deltaFrame: number) {
      const projectiles = this.ether.queryBounds(this.parent)
      projectiles.forEach(p => {
         if (!(p instanceof Projectile)) return
         p.hit(this.parent)
      })
   }
}