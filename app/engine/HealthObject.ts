import { AnimatedSprite, Assets, Bounds, Container, DRAW_MODES, DisplayObject, Graphics, IDestroyOptions, Point, Rectangle, Renderer, Spritesheet, Transform } from "pixi.js";
import { EmptyObject } from "./EmptyObject";
import explosion1 from '../displayobjects/events/explosion1.json.data'
import { sound } from "@pixi/sound";

export class HealthObject extends EmptyObject {
   constructor(private healthPoints: number, private healthyPoints = healthPoints) {
      super()
   }
   damage(deltaHP: number) {
      this.healthPoints += deltaHP
      if (this.healthPoints <= 0) {
         this.explode()
      }
   }
   private explode() {
      const explosion = new AnimatedSprite((Assets.get(explosion1) as Spritesheet).animations.explode)
      const baselineHealth = 100
      const scale = Math.sqrt(this.healthyPoints / baselineHealth)
      explosion.scale = new Point(scale, scale)
      explosion.animationSpeed = 0.25
      explosion.position = this.parent.position
      this.parent.parent.addChild(explosion)
      explosion.play()
      sound.play('bombExplosion', {start: 0.2, end: 3, volume: 1})
      setTimeout(() => explosion.destroy(), 466.8)
      this.parent.destroy({children: true})
   }
}