import { AnimatedSprite, Container, DisplayObject, FrameObject, ParticleContainer, Point, Resource, Sprite, Texture } from "pixi.js";
import { Projectile } from "./projectile";

export class Weapon1 extends AnimatedSprite {
   direction!: Point
   constructor(private ether: Container<Sprite>, texture: Texture<Resource>[] | FrameObject[], private bulletClass: (direction: Point) => Projectile) {
      super(texture, true)
      this.direction = new Point(1, 0)
      this.visible = false
   }
   shoot() {
      if (!this.direction) {
         throw new Error('Weapon1 direction not set!')
      }
      this.visible = true
      this.play()
      setTimeout(() => { this.stop(); this.visible = false }, 35)
      const p = this.ether.addChild(this.bulletClass(this.direction))
      p.position = this.parent.position
      p.play()
   }
}