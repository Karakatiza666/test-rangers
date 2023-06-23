import { sound } from "@pixi/sound";
import { AnimatedSprite, Container, DisplayObject, FrameObject, Point, Resource, Texture, Ticker, settings } from "pixi.js";
import { HealthObject } from "../../engine/HealthObject";

export class Projectile extends AnimatedSprite {
   constructor(
      textures: Texture<Resource>[] | FrameObject[],
      private owner: DisplayObject,
      private damage: number) {
      super(textures, true)
   }
   hit(o: Container) {
      if (o === this.owner) return
      console.log('Hit!')
      sound.play('spacelaser', {start: 0.1, end: 0.5, volume: 2})
      this.tryDealDamage(o)
      this.destroy({children: true})
   }
   private tryDealDamage(o: Container) {
      const h = o.children.find(p => p instanceof HealthObject) as HealthObject | undefined
      if (!h) return
      h.damage(-this.damage)
   }
}