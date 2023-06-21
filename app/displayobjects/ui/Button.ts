import { Sprite, Texture, Text } from "pixi.js";

export class Button extends Sprite {
   constructor(text: string, private onClick: () => void, private idle: Texture, private hover?: Texture, private click?: Texture) {
      super(idle)
      this.anchor.set(0.5);
   
      // make the button interactive...
      (this as any).interactive = true
      ;(this as any).cursor = 'pointer'
      
      ;(this as any)
         .on('click', onClick)
         // Mouse & touch events are normalized into
         // the pointer* events for handling different
         // button events.
         .on('pointerdown', this.onButtonDown)
         .on('pointerup', this.onButtonOver)
         .on('pointerupoutside', this.onButtonUp)
         .on('pointerover', this.onButtonOver)
         .on('pointerout', this.onButtonOut)


         .on('mousedown', this.onButtonDown)
         .on('touchstart', this.onButtonDown)

         // set the mouseup and touchend callback...
         .on('mouseup', this.onButtonOver)
         .on('touchend', this.onButtonUp)
         .on('mouseupoutside', this.onButtonUp)
         .on('touchendoutside', this.onButtonUp)

         // set the mouseover callback...
         .on('mouseover', this.onButtonOver)

         // set the mouseout callback...
         .on('mouseout', this.onButtonOut)
      
      const _text = new Text(text);
      _text.anchor.set(0.5)
      _text.scale.set(1.3, 1)
      _text.style.fill = '#b5dde8'

      this.addChild(_text);
   }

   onButtonDown() {
      this.texture = this.click ?? this.hover ?? this.idle
   }

   onButtonUp() {
      this.texture = this.idle
   }

   onButtonOver() {
      this.texture = this.hover ?? this.idle
   }

   onButtonOut() {
      this.texture = this.idle
   }
}