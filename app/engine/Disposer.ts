import { EmptyObject } from "./EmptyObject";

export class Disposer extends EmptyObject {
   constructor(protected dispose: () => void) {
      super()
   }
}