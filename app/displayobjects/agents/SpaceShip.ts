import { Assets, DisplayObject, IDestroyOptions, Sprite, Spritesheet, Ticker } from 'pixi.js'
import battlestar from './battlestar/battlestar.json.data'
import { IMovement } from '../../engine/IMovement'
import '@pixi/math-extras';
import { Disposer } from '../../engine/Disposer';

export class SpaceShip extends Sprite {
   constructor(private movement: IMovement | IMovement & DisplayObject) {
      super()

      Assets.load(battlestar).then((battlestarSheet: Spritesheet) => {
         this.texture = battlestarSheet.textures['battlestar-90.png']
      })

      if (movement instanceof DisplayObject) {
         this.addChild(movement)
      }
      Ticker.shared.add(this.onUpdate, this)
      this.addChild(new Disposer(() => Ticker.shared.remove(this.onUpdate, this)))
   }

   onUpdate(dt: number) {
      const speed = 10 * dt
      const delta = this.movement.getVector().multiplyScalar(speed)
      this.position.add(delta, this.position)
   }
}