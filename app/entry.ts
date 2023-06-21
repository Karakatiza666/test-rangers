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
import './index.html'
import { MainMenu } from './scenes/MainMenu'
import { SceneManager } from './engine/SceneManager'

SceneManager.goto(...MainMenu.init)
