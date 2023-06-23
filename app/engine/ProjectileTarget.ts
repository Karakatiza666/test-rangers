import { Graphics, Container, Transform, Ticker, Point, Bounds } from "pixi.js";
import { EmptyObject } from "./EmptyObject";
import { IndexedContainer, getComponentBox } from "./IndexedContainer";
import { Projectile } from "../displayobjects/gadgets/projectile";

export class ProjectileTarget extends EmptyObject {
   private graphics: Graphics
   constructor(parent: Container, private ether: IndexedContainer, scale: Point) {
      super()
      this._bounds.addFrame(new Transform(),
         -parent.width/2*scale.x, -parent.height/2*scale.y, parent.width/2*scale.x, parent.height/2*scale.y
      )
      this.graphics = new Graphics();

      const b = this.getBounds()
      this.graphics.lineStyle(2, 0xDD1111, 1);
      this.graphics.drawRect(b.x, b.y, b.width, b.height);
      this.graphics.position.set(0, 0)

      parent.addChild(this.graphics)

      Ticker.shared.add(this.update, this)
      this.dispose = () => {
         Ticker.shared.remove(this.update, this)
      }
   }

   update(deltaFrame: number) {
      const projectiles = this.ether.queryBounds(getComponentBox(this))
      projectiles.forEach(p => {
         if (!(p instanceof Projectile)) return
         if (!this.parent) return // Parent is being destroyed
         p.hit(this.parent)
      })
   }
}