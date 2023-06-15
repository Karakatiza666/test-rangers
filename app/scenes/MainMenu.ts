import { Container, Spritesheet, Texture, Loader } from "pixi.js";
import StaticBackground from "../displayobjects/environment/StaticBackground";
import musicSpace4 from '../displayobjects/environment/backgroundMusic/Space-Rangers-Music-Space-4-min.mp3'
import { sound } from '@pixi/sound';
import atlas1 from '../displayobjects/misc/atlas1/atlas1.webp'
import atlas1json from '../displayobjects/misc/atlas1/atlas1.json?path'
import { Button } from "../displayobjects/ui/Button";

export default class MainMenu extends Container {

   constructor() {
      super()
      const bg = new StaticBackground(import('../displayobjects/environment/background/bg-main-menu-ai-min.webp'))
      bg.setTransform(180, 0, 0.5, 0.5)
      this.addChild(bg)

      sound.add('space-4', musicSpace4)
      sound.play('space-4')

      Loader.shared.add(atlas1).load(() => {
         const atlas1sheet = new Spritesheet(
           Loader.shared.resources[atlas1]!.texture!.baseTexture,
           atlas1json
         );
         atlas1sheet.parse()
         {
            const x = 180 + 640

            const mkBtn = () => new Button(
               atlas1sheet.textures['btn_menu_idle.webp'], 
               atlas1sheet.textures['btn_menu_hover.webp'], 
               atlas1sheet.textures['btn_menu_click.webp']
            )
            const btns = [ ...Array(3).keys() ].map((_, i) => 300 + i * 80)
            for (const y of btns) {
               const btn = mkBtn()
               btn.x = x
               btn.y = y
               this.addChild(btn)
            }
         }
         
       });
   }
}