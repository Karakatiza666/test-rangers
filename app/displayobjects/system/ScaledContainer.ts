import { Container, ObservablePoint, Point } from 'pixi.js';
// import { resize } from '../../stores/RendererStore';
import { checkScreen } from '../../utils';
import { useViewportSize } from '../../compositions/viewportSize';

/**
 * ScaledContainer
 *
 * A DisplayObjectContainer which attempts to scale and best-fit into the
 * window size dispatched from the RendererStore
 *
 * @extends Container
 * @exports ScaledContainer
 */
export default class ScaledContainer extends Container {

  private currentSize = {
    w: 0,
    h: 0,
  };
  // protected scale = new ObservablePoint(() => {}, undefined, 1, 1)
  /**
   * Set target size
   * @param  {Number} target_w width
   * @param  {number} target_h height
   * @return {null}
   */
  constructor() {
    super();

    // TODO : init resize should come from renderer
    this.resizeHandler(
      window.innerWidth,
      window.innerHeight,
      useViewportSize.getState().viewport.canvas.width,
      useViewportSize.getState().viewport.canvas.height
    )
    
    useViewportSize.subscribe(({viewport}) => {
      const { w, h } = this.currentSize
      const needsResize = checkScreen(viewport.width, viewport.height, w, h)

      if (needsResize) {
        this.resizeHandler(viewport.width, viewport.height, viewport.canvas.width, viewport.canvas.height);
      }

      this.currentSize = {
        w: viewport.width,
        h: viewport.height
      }
    })
  }

  /**
   * Scales and positions Container to best-fit to target dimensions
   * @return {null}
   */
  resizeHandler(rw: number, rh: number, tw = 1920, th = 1080) {
    const Xratio = rw / tw;
    const Yratio = rh / th;
    let scaleRatio = rw > rh ? Xratio : Yratio;
    let scale = new Point(scaleRatio, scaleRatio);
    let offsetX = rw / 2 - (tw * scaleRatio) / 2;
    let offsetY = rh / 2 - (th * scaleRatio) / 2;

    if (th * scaleRatio < rh) {
      scaleRatio = Yratio;
      scale = new Point(scaleRatio, scaleRatio);
      offsetX = rw / 2 - (tw * scaleRatio) / 2;
      offsetY = rh / 2 - (th * scaleRatio) / 2;
    }

    this.position.x = offsetX;
    this.position.y = offsetY;
    this.scale.copyFrom(scale);
  }
}
