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
  Backward,
  Forward,
  Up,
  Down,
}

export enum Sides {
  Bottom,
  Right,
  Left,
  Top,
  BottomLeft,
  BottomRight,
  TopRight,
  TopLeft,
}

export interface IRobotPlacement {
  switch?: boolean;
  side: Sides;
}

export interface IMoveRobot {
  position: I2DVector;
  rotationAxis: number;
}
