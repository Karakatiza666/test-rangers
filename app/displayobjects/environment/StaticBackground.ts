import { Sprite } from 'pixi.js';
import ScaledContainer from "../system/ScaledContainer";

export default class StaticBackground extends ScaledContainer {
   constructor(img: Promise<typeof import("*.jpg")>) {
      super();

      img.then(m => {
         const sprite = Sprite.from(m.default)
         this.addChild(sprite)
      })
   }
}