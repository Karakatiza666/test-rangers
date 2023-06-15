import { IRendererOptions, Renderer } from 'pixi.js'
// import Store, { AnimationStore } from '../stores/Store';
// import { tick } from '../stores/AnimationStore';
// import { resize } from '../stores/RendererStore';
import { useViewportSize } from '../compositions/viewportSize'
import { useGameTick } from '../compositions/gameTick';

/**
 * GL Renderer with hooks into a Store
 *
 * Manages main animation loop
 *
 * @exports AnimatedRenderer
 * @extends Renderer
 */
export default class AnimatedRenderer extends Renderer {
  private active = false

  constructor(options: IRendererOptions) {
    super(options);

    window.addEventListener('resize', this.resizeHandler.bind(this));

    this.resizeHandler();
  }

  /**
   * Dispatch resize
   * @return {null}
   */
  resizeHandler() {
    useViewportSize.getState().resize()
    const viewport = useViewportSize.getState().viewport
    this.resize(window.innerWidth, window.innerHeight);
    // this.resize(viewport.width, viewport.height)
  }

  /**
   * Start the animation loop
   * @return {null}
   */
  start() {
    this.active = true;
    window.requestAnimationFrame(this.animate.bind(this));
  }

  /**
   * Stop the animation loop
   * @return {null}
   */
  stop() {
    this.active = false;
  }

  /**
   * Main animation loop, updates animation store
   * @return {null}
   */
  animate() {
    if (this.active) {
      window.requestAnimationFrame(this.animate.bind(this));
      // AnimationStore.dispatch(tick());
      useGameTick.getState().next()
    }
  }
}