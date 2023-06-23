import { Point } from "pixi.js";

export interface IDirectionControl {
   getVector(): Point
}

export const constantDirection = (x: number, y: number): IDirectionControl => ({getVector: () => new Point(x, y)})