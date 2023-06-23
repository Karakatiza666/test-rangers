import { Container, Application, settings, IRenderer } from 'pixi.js';
import '../index.html'
import Loader from '../scenes/Loader'

settings.RETINA_PREFIX = /@([0-9\.]+)x/

type SceneConstructor = (renderer: IRenderer<HTMLCanvasElement>) => Container

class SceneManager {
   private app = new Application<HTMLCanvasElement>({
      resolution: window.devicePixelRatio,
      resizeTo: document.body,
   });
   private currentScene?: Container
   constructor() {
      document.body.appendChild(this.app.view)
   }
   goto(scene: SceneConstructor, assets?: never[]) {
      if (this.currentScene) {
         this.app.stage.removeChild(this.currentScene);
         this.currentScene.destroy({children: true})
         this.currentScene = undefined
      }
      if (!assets) {
         this.switchToScene(scene)
         return
      }
      const loader = new Loader()
      this.app.stage.addChild(loader);
      loader.start(assets)
      loader.onLoaded(() => {
         this.app.stage.removeChild(loader);
         this.switchToScene(scene)
      });
   }
   private switchToScene(scene: SceneConstructor) {
      this.currentScene = this.app.stage.addChild(scene(this.app.renderer));
   }
}

const sceneManager = new SceneManager()

export { sceneManager as SceneManager }