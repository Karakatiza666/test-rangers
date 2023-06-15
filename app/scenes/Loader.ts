import { Graphics, Loader } from 'pixi.js';
// import { AnimationStore } from '../stores/Store';
// import Store from '../stores/Store';
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
  private loader = new Loader();
  private done = () => {};
  private bar: Graphics
  private progress = 0
  private ease = 0;
  private unsubscribe = () => {};

  constructor() {
    // const { canvasWidth, canvasHeight } = Store.getState().Renderer;
    const {canvas} = useViewportSize.getState().viewport

    super();

    // this.loader = new Loader();
    // this.done = () => {};

    // set up a bar
    this.bar = new Graphics().beginFill(0xff0000).drawRect(0, -2.5, 200, 5);
    this.bar.x = canvas.width / 2 - 100;
    this.bar.y = canvas.height / 2;
    this.bar.scale.x = 0;

    // animate it
    // this.unsubscribe = AnimationStore.subscribe(() => {
    //   this.ease += (this.progress - this.ease) * 0.03;
    //   this.bar.scale.x = this.ease;
    // });
    this.unsubscribe = useGameTick.subscribe(s => {
      this.ease += (this.progress - this.ease) * 0.03;
      this.bar.scale.x = this.ease;
    })

    this.addChild(this.bar);
  }

  start(assets = []) {
    this.loader.add(assets);
    this.loader.load();
    this.loader.onProgress.add(this.onUpdate.bind(this));
    this.loader.onComplete.add(this.onComplete.bind(this));
  }

  onUpdate(loader: Loader) {
    this.progress = loader.progress / 100;
  }

  onComplete() {
    this.done();
    this.unsubscribe();
  }

  onLoaded(callback = () => {}) {
    this.done = callback;
  }
}
