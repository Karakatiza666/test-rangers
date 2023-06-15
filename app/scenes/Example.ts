import { Container, Point } from 'pixi.js';

import Logo from '../displayobjects/misc/Logo';
import Background from '../displayobjects/environment/Background';
import Thingie from '../displayobjects/Thingie/Thingie';
// import RedLine from '../displayobjects/RedLine/RedLine';
import { defaultCanvas } from '../compositions/viewportSize';
import { useGameTick } from '../compositions/gameTick';

const isNear = (p1: Point, p2: Point) => {
  const a = p1.x - p2.x;
  const b = p1.y - p2.y;
  const c = Math.sqrt(a * a + b * b);
  return c < 100;
};

/**
 * Main Display Object
 *
 * @exports Example
 * @extends Container
 */
export default class Example extends Container {
  private mousepos = new Point(500, 500)
  private thingies: Thingie[] = []
  private interactive = false

  constructor() {
    var bg = new Background();

    super();

    const logo = new Logo();
    this.addChild(bg);
    this.addLines();
    this.addThingies();
    this.addChild(logo);
  }

  addThingies() {
    for (let index = 0; index < 200; index++) {
      const t = new Thingie();
      t.setInitialPoint(
        defaultCanvas.width * Math.random(),
        (defaultCanvas.height + 300) * Math.random() - 300
      );
      const near = this.thingies.some((t2) => isNear(t.position, t2.position));
      if (!near) {
        this.thingies.push(t);
        this.addChild(t);
      }
    }

    useGameTick.subscribe(() => {
      this.thingies.forEach((t) => t.update(this.mousepos));
    });

    this.interactive = true;
  }

  addLines() {
    const count = 100;
    for (let index = 0; index < count; index++) {
      const y = Math.sin(index * 2) * defaultCanvas.height - 500;
      const step = (defaultCanvas.width / count) * index;
      // const l = new RedLine(step, y);
      // this.addChild(l);
    }
  }

  mousemove(e: any) {
    const { x, y } = e.data.global;
    if (this.mousepos.x !== x && this.mousepos.y !== y) {
      this.mousepos.set(x, y);
    }
  }
}
