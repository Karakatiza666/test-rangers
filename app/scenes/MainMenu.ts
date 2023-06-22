import { Container, Spritesheet, Assets } from "pixi.js";
import StaticBackground from "../displayobjects/environment/StaticBackground";
import musicSpace4 from '../displayobjects/environment/backgroundMusic/Space-Rangers-Music-Space-4-min.mp3'
import { sound } from '@pixi/sound';
import atlas1 from '../displayobjects/misc/atlas1/atlas1.webp'
import atlas1json from '../displayobjects/misc/atlas1/atlas1.json.data'
import { Button } from "../displayobjects/ui/Button";
import { SceneManager } from "../engine/SceneManager";
import { ArcadeLevel } from "./ArcadeLevel";
import { tuple } from "ts-practical-fp";
import bg1 from '../displayobjects/environment/background/bg-main-menu-ai-min.webp'
import BG from '../displayobjects/environment/background/soft.jpg';
import LOGO from '../displayobjects/misc/Logo/logo@2x.png';

sound.add('space-4', musicSpace4)

export class MainMenu extends Container {
   static init = tuple(
      () => new MainMenu(),
      [ BG, LOGO, bg1, atlas1, musicSpace4 ]
   )
   constructor() {
      super()
      const bg = new StaticBackground(import('../displayobjects/environment/background/bg-main-menu-ai-min.webp'))
      bg.setTransform(90, 0, 0.5, 0.5)
      this.addChild(bg)

      sound.volumeAll = 0.5
      sound.stopAll()
      sound.play('space-4')

      Assets.load(atlas1json).then((atlas1sheet: Spritesheet) => {
         {
            const x = 820

            const btns = [
               { text: 'New Game', onClick: () => { SceneManager.goto(...ArcadeLevel.init) } },
               { text: 'Resume Game', onClick: () => {  }},
               { text: 'Options', onClick: () => {  }},
            ].map((b, i) => ({ y: 300 + i * 80, ...b}) )

            const mkBtn = (text: string, onClick: () => void) => new Button(text, onClick,
               atlas1sheet.textures['btn_menu_idle.webp'], 
               atlas1sheet.textures['btn_menu_hover.webp'], 
               atlas1sheet.textures['btn_menu_click.webp']
            )
            // const btns = buttons.map((_, i) => 300 + i * 80)
            for (const {y, text, onClick} of btns) {
               const btn = mkBtn(text, onClick)
               btn.x = x
               btn.y = y
               this.addChild(btn)
            }
         }
         
      });
   }
}