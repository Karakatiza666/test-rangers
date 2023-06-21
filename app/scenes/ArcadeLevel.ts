import { Container, IRenderer, Point, Texture } from "pixi.js";
import { Viewport } from "pixi-viewport"
import { SpaceShip } from "../displayobjects/agents/SpaceShip";
import battlestar from '../displayobjects/agents/battlestar/battlestar-120X75.png'
import { tuple } from 'ts-practical-fp'
import { PerspectiveBackground } from "../displayobjects/environment/PerspectiveBackground";
import imageBg1 from '../displayobjects/environment/background/bg-space-1-ai-min.jpg'
import musicBgHymn from '../displayobjects/environment/backgroundMusic/Space-Rangers-Music-Hymn-min.mp3'
import { sound } from "@pixi/sound";
import { KeyboardMovement } from "../engine/KeyboardMovement"
import { KeyboardGlobalListener } from "../engine/KeyboardGlobalListener";
import { SceneManager } from "../engine/SceneManager";
import { MainMenu } from "./MainMenu";

sound.add('hymn', musicBgHymn)

export class ArcadeLevel extends Container {
   static init = tuple((r: IRenderer<HTMLCanvasElement>) => new ArcadeLevel(r), [imageBg1, battlestar, musicBgHymn])
   private viewport: Viewport
   constructor(renderer: IRenderer<HTMLCanvasElement>) {
      super()

      sound.stopAll()
      sound.play('hymn')

      this.viewport = new Viewport({
         screenWidth: window.innerWidth,
         screenHeight: window.innerHeight,
         worldWidth: 10000,
         worldHeight: 1000,
         events: renderer.events
      });
      this.addChild(this.viewport)

      const bg1 = new PerspectiveBackground(Texture.from(imageBg1), this.viewport, 0.1, new Point(0, -500))
      this.viewport.addChild(bg1)
      const player = new SpaceShip(new KeyboardMovement())
      player.y = 500
      this.viewport.addChild(player)
      this.viewport.follow(player, {radius: 100})

      const enemy = new SpaceShip({getVector: () => new Point(0, 0)})
      enemy.y = 500
      enemy.x = 400
      this.viewport.addChild(enemy)

      const kb = new KeyboardGlobalListener()
      kb.onEscape = (() => { SceneManager.goto(MainMenu.init[0]) }).bind(this)
      this.addChild(kb)
   }
}