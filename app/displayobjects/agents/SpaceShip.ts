import { Assets, DisplayObject, IDestroyOptions, Resource, Sprite, Spritesheet, Texture, Ticker } from 'pixi.js'
import { IMovementControl } from '../../engine/IMovementControl'
import '@pixi/math-extras';
import { Disposer } from '../../engine/Disposer';

export class SpaceShip extends Sprite {
   constructor(sprite: Spritesheet, private movement: IMovementControl | IMovementControl & DisplayObject, private log = true) {
      super()

      this.texture = sprite.animations['idle'][0]
      this.anchor.set(0.5, 0.5)

      if (movement instanceof DisplayObject) {
         this.addChild(movement)
      }
      Ticker.shared.add(this.onUpdate, this)
      this.addChild(new Disposer(() => Ticker.shared.remove(this.onUpdate, this)))
   }

   onUpdate(deltaFrame: number) {
      const dt = deltaFrame / Ticker.targetFPMS;
      const speed = 0.6 * dt
      const delta = this.movement.getVector().multiplyScalar(speed)
      this.position.add(delta, this.position)
   }

   // addGadget<G extends DisplayObject>(gadget: G, controller: (g: G) => DisplayObject) {
   //    this.addChild(gadget)
   //    this.addChild(controller(gadget))
   // }
}