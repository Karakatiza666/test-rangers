export const checkScreen = (w: number, h: number, cw: number, ch: number) => w !== cw || h !== ch;
export const randomRange = (m: number, x: number) => Math.random() * (x - m) + m;

const makeSpriteFrames = (frameW: number, frameH: number, countX: number, countY: number, makeName: (i: number) => string) => {
   const xs = Array(countX).fill(undefined).map((_,i) => i)
   const ys = Array(countY).fill(undefined).map((_,i) => i)
   const frames: Record<string, unknown> = {}
   let counter = 0;
   for (const i of xs) {
       for (const j of ys) {
           frames[makeName(counter)] = {
              "frame": {"x": j * frameW,"y": i * frameH ,"w": frameW,"h": frameH},
              "spriteSourceSize": {"x":0, "y":0, "w":frameW,"h": frameH}
           }
           ++counter
       }
   }
   return JSON.stringify(frames)
}