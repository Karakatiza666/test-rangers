import { utils, Container, DisplayObject, autoDetectRenderer, Application, Ticker, settings, IRenderer, Renderer } from 'pixi.js';
import '../index.html';
import { AnimatedRenderer } from '../engine/Renderer';
import Example from '../scenes/Example';
import Loader from '../scenes/Loader';
import BG from './displayobjects/environment/background/soft.jpg';
import LOGO from './displayobjects/misc/Logo/logo@2x.png';
import { useGameTick } from '../compositions/gameTick';
import {MainMenu} from '../scenes/MainMenu';
import bg1 from './displayobjects/environment/background/bg-main-menu-ai-min.webp'
import bg2 from './displayobjects/environment/background/bg-space-1-ai-min.jpg'
import musicSpace4 from './displayobjects/environment/backgroundMusic/Space-Rangers-Music-Space-4-min.mp3'
import atlas1 from './displayobjects/misc/atlas1/atlas1.webp'
import atlas1json from './displayobjects/misc/atlas1/atlas1.json?path'
import { Viewport } from 'pixi-viewport';
import { EventSystem } from '@pixi/events';
import { KeyboardGlobalListener } from './KeyboardGlobalListener';

settings.RETINA_PREFIX = /@([0-9\.]+)x/

type SceneConstructor = (renderer: IRenderer<HTMLCanvasElement>) => Container

class SceneManager {
   // static instance: SceneManager
   // public static init(scene: () => Container, assets?: never[]) {
   //    return this.instance ??= new SceneManager(scene, assets)
   // }
   // private renderer = new AnimatedRenderer({ resolution: window.devicePixelRatio }); // an extension of WebGLRenderer which dispatches to RendererStore
   private app = new Application<HTMLCanvasElement>({
      resolution: window.devicePixelRatio,
      resizeTo: document.body,
   });
   private currentScene?: Container
   constructor() {
      // append renderer to DOM
      // this.app.renderer = this.renderer as unknown as IRenderer<HTMLCanvasElement>
      document.body.appendChild(this.app.view)
      // this.app.renderer.addSystem(EventSystem as any, 'events');
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
      // Add loader to App Display Object and start loading assets
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