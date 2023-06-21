import { Graphics, Assets, Ticker } from 'pixi.js';
import { useGameTick } from '../compositions/gameTick';
import { useViewportSize } from '../compositions/viewportSize';
import ScaledContainer from '../displayobjects/system/ScaledContainer';

/**
 * Loading Screen
 *
 * @exports LoaderScreen
 * @extends ScaledContainer
 */

export default class LoaderScreen extends ScaledContainer {
  private done = () => {};
  private bar: Graphics
  private progress = 0
  private ease = 0;
  private unsubscribe: () => void;

  constructor() {
    // const { canvasWidth, canvasHeight } = Store.getState().Renderer;
    const {canvas} = useViewportSize.getState().viewport

    super();

    // set up a bar
    this.bar = new Graphics().beginFill(0xff0000).drawRect(0, -2.5, 200, 5);
    this.bar.x = canvas.width / 2 - 100;
    this.bar.y = canvas.height / 2;
    this.bar.scale.x = 0;

    // animate it
    // this.unsubscribe = useGameTick.subscribe(s => {
    //   this.ease += (this.progress - this.ease) * 0.03;
    //   this.bar.scale.x = this.ease;
    // })
    const ontick = this.tick.bind(this)
    Ticker.shared.add(ontick)
    this.unsubscribe = () => Ticker.shared.remove(ontick)
    this.addChild(this.bar);
  }

  tick() {
    console.log('loader update')
    this.ease += (this.progress - this.ease) * 0.03;
    this.bar.scale.x = this.ease;
  }

  start(assets = []) {
    Assets.load(assets, this.onUpdate.bind(this))
      .then(this.onComplete.bind(this))
  }

  onUpdate(progress: number) {
    console.log('onUpdate', progress)
    this.progress = progress;
  }

  onComplete() {
    this.done();
    this.unsubscribe();
  }

  onLoaded(callback = () => {}) {
    this.done = callback;
  }
}
