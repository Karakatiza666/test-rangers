import { sound } from "@pixi/sound";
import { AnimatedSprite, Container, DisplayObject, FrameObject, Point, Resource, Texture, Ticker, settings } from "pixi.js";
import { HealthObject } from "../../engine/HealthObject";

function vectorToRotation(vector: Point): number {
   // Calculate the angle using the Math.atan2 function
   const angleInRadians = Math.atan2(-vector.y, vector.x);
   
   // // Convert the angle from radians to degrees
   // const angleInDegrees = (angleInRadians * 180) / Math.PI;
   
   // // Adjust the angle to be between 0 and 360 degrees
   // const adjustedAngle = (angleInDegrees + 360) % 360;
   
   return angleInRadians;
}

export class Projectile extends AnimatedSprite {
   private ttl: number
   private age: number
   private rotateOffset: number
   constructor(
      private direction: Point, textures: Texture<Resource>[] | FrameObject[], private owner: DisplayObject,
      offset: {rotate: number, scale: number}, private damage: number,
      private initialSpeedPerSecond: number, lifetimeSeconds: number) {
      super(textures, true)
      this.age = Date.now()
      this.ttl = this.age + Math.floor(lifetimeSeconds * 1000)
      this.animationSpeed = 0.05
      this.rotateOffset = offset.rotate
      this.rotation = this.rotateOffset
      this.scale.set(offset.scale, offset.scale)
   }
   update(deltaFrame: number) {
      const dt = deltaFrame / Ticker.targetFPMS;
      this.age += dt
      if (this.age > this.ttl) {
         this.parent.removeChild(this)
         this.destroy()
         return
      }
      this.position.add(this.direction.multiplyScalar(this.initialSpeedPerSecond * dt), this.position)
      this.rotation = vectorToRotation(this.direction) + this.rotateOffset
      super.update(dt)
   }
   hit(o: Container) {
      if (o === this.owner) return
      console.log('Hit!')
      sound.play('spacelaser', {start: 0.1, end: 0.5, volume: 2})
      this.tryDealDamage(o)
      this.destroy()
   }
   private tryDealDamage(o: Container) {
      const h = o.children.find(p => p instanceof HealthObject) as HealthObject | undefined
      if (!h) return
      h.damage(-this.damage)
   }
}