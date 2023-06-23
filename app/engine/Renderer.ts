import { IRendererOptions, Renderer } from 'pixi.js'
import { useViewportSize } from '../compositions/viewportSize'

/**
 * GL Renderer with hooks into a Store
 *
 * Manages main animation loop
 *
 * @exports AnimatedRenderer
 * @extends Renderer
 */
export class AnimatedRenderer extends Renderer {
  private active = false

  constructor(options: Partial<IRendererOptions>) {
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
  }

  /**
   * Stop the animation loop
   * @return {null}
   */
  stop() {
    this.active = false;
  }

}
