import { Container, Point, Ticker } from "pixi.js";
import { EmptyObject } from "./EmptyObject";

function vectorToRotation(vector: Point): number {
   // Calculate the angle using the Math.atan2 function
   const angleInRadians = Math.atan2(-vector.y, vector.x);
   
   // // Convert the angle from radians to degrees
   // const angleInDegrees = (angleInRadians * 180) / Math.PI;
   
   // // Adjust the angle to be between 0 and 360 degrees
   // const adjustedAngle = (angleInDegrees + 360) % 360;
   
   return angleInRadians;
}

export class SpeedComponent extends Container {
   /**
    * 
    * @param direction 
    * @param speed pixels per second
    */
   constructor(private direction: Point, private speed: number) {
      super()
      Ticker.shared.add(this.update, this)
      this.destroy = () => {
         Ticker.shared.remove(this.update, this)
         super.destroy({children: true})
      }
   }
   update(deltaFrame: number) {
      const dt = deltaFrame / Ticker.targetFPMS;
      this.parent.position.add(this.direction.multiplyScalar(this.speed * dt / 1000), this.parent.position)
      this.parent.rotation = vectorToRotation(this.direction)
   }
}