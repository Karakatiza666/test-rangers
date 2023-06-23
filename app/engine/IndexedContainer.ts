import { Bounds, Container, DisplayObject, IDestroyOptions, Rectangle, Ticker } from "pixi.js";
import { Disposer } from "./Disposer";
import {QuadTree, Box, Point, Circle} from 'js-quadtree';

function objectToPoint(o: DisplayObject) {
   return new Point(o.x, o.y, o)
}

export function getComponentBox(o: DisplayObject) {
   const b = o.getBounds()
   return new Box(o.parent.x + b.x, o.parent.y + b.y, b.width, b.height)
}

export type IndexedContainer = ReturnType<typeof IndexedContainer>['prototype']

export function IndexedContainer<T extends DisplayObject>(container: typeof Container<T>) {
   return class extends container {

      protected dispose?: () => void
      private quadtree: QuadTree
      constructor(bounds: Rectangle) {
         super()
         this.quadtree = new QuadTree(new Box(bounds.x, bounds.y, bounds.width, bounds.height));
         Ticker.shared.add(this.update, this)
         this.dispose = () => {
            Ticker.shared.remove(this.update, this)
            this.quadtree.clear()
         }
      }
      addChild<U extends T[]>(...children: U): U[0] {
         const first = super.addChild(...children)
         return first
      }
   
      removeChild<U extends T[]>(...children: U): U[0] {
         const first = super.removeChild(...children)
         return first
      }
   
      update(deltaFrame: number) {
         this.quadtree.clear()
         this.quadtree.insert(this.children.map(objectToPoint))
      }
   
      queryBounds(o: Box) {
         return this.quadtree.query(o).map(p => p.data as DisplayObject)
      }
   
      destroy(options?: boolean | IDestroyOptions | undefined): void {
         if (this.dispose) {
            this.dispose()
         }
         super.destroy(options)
      }
   };
}