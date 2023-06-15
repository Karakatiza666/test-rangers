import { Sprite } from 'pixi.js';
import SOFT from './Background/soft.jpg';
import ScaledContainer from '../system/ScaledContainer';

/**
 * Loads the adds the diagnostic image
 *
 * @exports Background
 * @extends ScaledContainer
 */
export default class Background extends ScaledContainer {
  constructor() {
    super();

    const bg = Sprite.from(SOFT);

    this.addChild(bg);
  }
}
