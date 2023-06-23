import { AnimatedSprite, Container, DisplayObject, FrameObject, ParticleContainer, Point, Resource, Sprite, Texture } from "pixi.js";
import { Projectile } from "./projectile";
import { IDirectionControl } from "../../engine/IDirectionControl";

export class Weapon1 extends AnimatedSprite {
   constructor(
      private ether: Container<Sprite>,
      texture: Texture<Resource>[] | FrameObject[],
      private bulletClass: (direction: Point) => Projectile,
      private aim: IDirectionControl) {
      super(texture, true)
      this.visible = false
   }
   shoot() {
      this.visible = true
      this.play()
      setTimeout(() => { this.stop(); this.visible = false }, 35)
      const p = this.ether.addChild(this.bulletClass(this.aim.getVector()))
      p.position = this.parent.position
      p.play()
   }
}