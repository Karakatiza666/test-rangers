import { Assets, Container, DisplayObject, EventBoundary, IRenderer, ParticleContainer, Point, Rectangle, Resource, Sprite, Spritesheet, Texture, Ticker } from "pixi.js";
import { Viewport } from "pixi-viewport"
import { SpaceShip } from "../displayobjects/agents/SpaceShip";
// import battlestarImage from '../displayobjects/agents/battlestar/battlestar-120X75.png'
import battlestar from '../displayobjects/agents/battlestar/battlestar.json.data'
import battlestarImage from '../displayobjects/agents/battlestar/battlestar-120X75.png'
import projectileAtlas1 from '../displayobjects/gadgets/projectileAtlas1.json.data'
import projectileAtlas1Image from '../displayobjects/gadgets/projectileAtlas1.webp'
import explosion1 from '../displayobjects/events/explosion1.json.data'
import explosion1Image from '../displayobjects/events/explosion1.webp'
import bombExplosion from '../displayobjects/events/a-bomb-explosion.mp3'
import plasmablaster from '../displayobjects/events/plasmablaster.mp3'
import spacelaser from '../displayobjects/events/space-laser.mp3'
import zipLaser10xBurst from '../displayobjects/events/zip-laser-10x-burst.mp3'
import muzzleAtlas1 from '../displayobjects/events/muzzleAtlas1.json.data'
import muzzleAtlas1Image from '../displayobjects/events/muzzleAtlas1.webp'
import { tuple } from 'ts-practical-fp'
import { PerspectiveBackground } from "../displayobjects/environment/PerspectiveBackground";
import imageBg1 from '../displayobjects/environment/background/bg-space-1-ai-min.jpg'
import musicBgHymn from '../displayobjects/environment/backgroundMusic/Space-Rangers-Music-Hymn-min.mp3'
import { sound } from "@pixi/sound";
import { KeyboardMovementControl } from "../engine/KeyboardMovementControl"
import { KeyboardGlobalListener } from "../engine/KeyboardGlobalListener";
import { SceneManager } from "../engine/SceneManager";
import { MainMenu } from "./MainMenu";
import { Weapon1 } from "../displayobjects/gadgets/weapon1";
import { KeyboardControl } from "../engine/KeyboardControl";
import { Projectile } from "../displayobjects/gadgets/projectile";
import { HealthObject } from "../engine/HealthObject";
import { IndexedContainer } from "../engine/IndexedContainer";
import { ProjectileTarget } from "../engine/ProjectileTarget";
import { SpeedComponent } from "../engine/SpeedComponent";
import { EmptyObject } from "../engine/EmptyObject";
import { TtlComponent } from "../engine/TtlComponent";

sound.add('hymn', musicBgHymn)
sound.add('spacelaser', spacelaser)
sound.add('bombExplosion', bombExplosion)

// Ticker.shared.maxFPS = 2

export class ArcadeLevel extends Container {
   static init = tuple((r: IRenderer<HTMLCanvasElement>) => new ArcadeLevel(r), [
      imageBg1, musicBgHymn,
      battlestar, battlestarImage,
      projectileAtlas1, projectileAtlas1Image,
      muzzleAtlas1, muzzleAtlas1Image,
      explosion1, explosion1Image,
      plasmablaster, spacelaser, zipLaser10xBurst
   ])
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
      const ether = new (IndexedContainer(ParticleContainer))(new Rectangle(0, 0, this.viewport.worldWidth, this.viewport.worldHeight))
      this.viewport.addChild(ether)

      const forwardSpeed = 100
      const startOffset = new Point(0, 500)
      const shipStartX = 300

      {
         const cameraGuide = new Container()
         cameraGuide.addChild(new SpeedComponent(new Point(1, 0), forwardSpeed))
         cameraGuide.position.add(startOffset, cameraGuide.position)
         this.viewport.addChild(cameraGuide)
         this.viewport.follow(cameraGuide /*, {radius: 100}*/)
         this.viewport.update(0) // Needed to initialize viewport center and be able to introduce enemy right away
      }

      {
         const player = new SpaceShip(Assets.get(battlestar), new KeyboardMovementControl())
         // console.log('width', this.width, this.viewport.width, window.innerWidth)
         player.position.add(startOffset, player.position).add(new Point(-window.innerWidth / 2 + shipStartX, 0), player.position)
         const weapon = new Weapon1(
            ether,
            (Assets.get(muzzleAtlas1) as Spritesheet).animations.muzzle5,
            d => new Projectile(d, (Assets.get(projectileAtlas1) as Spritesheet).animations.projectile1, player,
            {
               rotate: 3.14159,
               scale: 0.5
            }, 10, 0.9, 2)
         )

         player.addChild(weapon)
         player.addChild(new KeyboardControl({'Space': () => {
            weapon.shoot()
         }}))
         player.addChild(new HealthObject(200))
         player.addChild(new ProjectileTarget(player, ether, new Point(0.6, 0.6)))
         player.addChild(new SpeedComponent(new Point(1, 0), forwardSpeed))
         this.viewport.addChild(player)
      }

      {
         setInterval(() => introduceEnemy(this.viewport, () => makeEnemy(ether, forwardSpeed)), 3000)
         
      }

      const kb = new KeyboardGlobalListener()
      kb.onEscape = (() => { SceneManager.goto(MainMenu.init[0]) }).bind(this)
      this.addChild(kb)
   }
}

function makeEnemy(ether: IndexedContainer, forwardSpeed: number) {
   const enemy = new SpaceShip(Assets.get(battlestar), {getVector: () => new Point(0, 0)}, false)
   enemy.scale.set(-1, 1)
   enemy.addChild(new HealthObject(100))
   enemy.addChild(new ProjectileTarget(enemy, ether, new Point(0.6, 0.6)))
   enemy.addChild(new SpeedComponent(new Point(1, 0), forwardSpeed))
   return enemy
}

function introduceEnemy(viewport: Viewport, generate: () => Container) {
   const x = screen.width / 2
   console.log('introduceEnemy', viewport.height, screen.height)
   const y = (Math.random() - 0.5) * screen.height * 0.8

   const enemy = generate()
   const intro1 = new SpeedComponent(new Point(-1, 0), 100)
   intro1.addChild(new TtlComponent(2))
   enemy.addChild(intro1)
   const intro2 = new SpeedComponent(new Point(-1, 0), 100)
   intro2.addChild(new TtlComponent(3))
   enemy.addChild(intro2)
   viewport.addChild(enemy)
   enemy.x = viewport.center.x + x
   enemy.y = viewport.center.y + y
}