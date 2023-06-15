/**
 * App.js
 *
 * The main entry point from WebPack
 * - Appends render canvas to DOM
 * - Calls renderer.render
 * - Add Loading Screen and loads assets
 * - Adds Example Screen once loading is complete
 * - Subscribes and Dispatches to AppStore & DOM
 */
import { utils, Container } from 'pixi.js';
import './index.html';
import Renderer from './engine/Renderer';
import Example from './scenes/Example';
import Loader from './scenes/Loader';
import BG from './displayobjects/environment/Background/soft.jpg';
import LOGO from './displayobjects/misc/Logo/logo@2x.png';
import { useGameTick } from './compositions/gameTick';

const renderer = new Renderer({ resolution: window.devicePixelRatio }); // an extension of WebGLRenderer which dispatches to RendererStore
const app = new Container(); // Auto scale to screen size, subscribed to RendererStore
const loader = new Loader(); // Basic Loading screen

// append renderer to DOM
document.body.appendChild(renderer.view);

// animate loop for render
useGameTick.subscribe(() => {
  renderer.render(app);
});

// Add loader to App Display Object and start loading assets
app.addChild(loader);
loader.start([BG, LOGO]);

// remove loader then show example once asset loading is complete
loader.onLoaded(() => {
  const example = new Example();
  app.removeChild(loader);
  app.addChild(example);
});

// start the render loop
renderer.start();
