export interface I2DVector {
  X: number;
  Y: number;
}

export enum Location {
  Grid,
  Corner,
  Edge,
}

export enum Direction {
  Right,
  Left,
  Backwards,
}
